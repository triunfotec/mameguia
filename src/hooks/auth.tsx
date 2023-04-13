import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from 'react'
import {Alert} from 'react-native'

import * as AppleAuthentication from 'expo-apple-authentication'
import * as AuthSession from 'expo-auth-session'
import Constants from 'expo-constants'

import {IResponseLoginFacebook} from '@/lib/react-native-fbsdk-next/loginFacebook'
import {api} from '@/services/api'
import {EProvider, IUser} from '@/types/entities/User/UserEntity.types'
import {emailRegistered} from '@/utils/emailTemplate'
import AsyncStorage from '@react-native-async-storage/async-storage'

let _loginFacebook: () => Promise<IResponseLoginFacebook>
if (Constants.appOwnership !== 'expo') {
  const {loginFacebook} = require('@/lib/react-native-fbsdk-next/loginFacebook')
  _loginFacebook = loginFacebook
}

interface IAuthProviderProps {
  children: ReactNode
}
type TUserLoginResponse = {
  jwt: string
  user: IUser
}
interface IAuthContextData {
  user: IUser
  useSignInWithGoogle(): Promise<void>
  signInWithApple(): Promise<void>
  signInFacebook(): Promise<void>
  signOut(): Promise<void>
  userStorageIsLoading: boolean
  loadStoredUser(): Promise<void>
  loggedOut: boolean
  handleLogin(user: Omit<IUser, 'id'>): Promise<TUserLoginResponse>
  handleSaveUser(jwt: string, user: Omit<IUser, 'id'>): void
  handleSendEmailUserRegistered(user: Omit<IUser, 'id'>): void
  usersRegistered: Omit<IUser, 'id'>[]
}

interface IAuthorizationResponse {
  params: {
    access_token: string
  }
  type: string
}

const {CLIENT_ID} = process.env
const {REDIRECT_URI} = process.env

const AuthContext = createContext({} as IAuthContextData)

function AuthProvider({children}: IAuthProviderProps) {
  const [user, setUser] = useState<IUser>({} as IUser)
  const [usersRegistered, setUsersRegistered] = useState<IUser[]>([] as IUser[])
  const [userStorageIsLoading, setUserStorageIsLoading] = useState(true)
  const [loggedOut, setLoggedOut] = useState(false)

  const userStorageKey = '@mameguia:user'

  useEffect(() => {
    const fetchUsersRegistered = async () => {
      try {
        const response = await api.get('api/users')

        setUsersRegistered(response.data)
      } catch (error) {}
    }
    fetchUsersRegistered()
  }, [])

  const handleSaveUser = useCallback(async (jwt: string, user: IUser) => {
    await AsyncStorage.setItem('@mameguia:jwt', JSON.stringify(jwt))
    await AsyncStorage.setItem('@mameguia:user', JSON.stringify(user))
    setUser(user)
    setLoggedOut(false)
  }, [])

  const handleLogin = useCallback(async (dataLogin: Omit<IUser, 'id'>) => {
    const credentials = {
      identifier: dataLogin.email,
      password: dataLogin.password,
    }

    const response = await api.post('api/auth/local', credentials)

    return response?.data as TUserLoginResponse
  }, [])

  const handleSendEmailUserRegistered = useCallback(
    (user: Omit<IUser, 'id'>) => {
      const dataSendEmail = {
        to: user.email,
        subject: 'Cadastro no app Mameguia',
        html: emailRegistered,
      }

      try {
        api.post('api/email', dataSendEmail)
      } catch (error: any) {}
    },
    [],
  )

  const handleUserRegister = useCallback(
    async (user: Omit<IUser, 'id'>) => {
      try {
        const response = await api.post('api/auth/local/register', user)

        if (response.status === 200 || response.status === 201) {
          handleSendEmailUserRegistered(user)
          return response?.data
        }
      } catch (error: any) {
        throw new Error(error)
      }
    },
    [handleSendEmailUserRegistered],
  )

  const verifyEmailIsRegistered = useCallback(
    (email: string): IUser => {
      return (
        usersRegistered?.find(user => user?.email === email) || ({} as IUser)
      )
    },
    [usersRegistered],
  )

  const verifyCredential = useCallback(
    (credential: string): IUser => {
      return (
        usersRegistered?.find(user => user?.credential === credential) ||
        ({} as IUser)
      )
    },
    [usersRegistered],
  )

  async function useSignInWithGoogle() {
    try {
      const RESPONSE_TYPE = 'token'
      const SCOPE = encodeURI('profile email')

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

      const {type, params} = (await AuthSession.startAsync({
        authUrl,
      })) as IAuthorizationResponse

      if (type === 'success') {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`,
        )

        const userInfo = await response.json()

        const userRegistered = verifyEmailIsRegistered(userInfo?.email)

        if (userRegistered?.email) {
          if (userRegistered.providerAccess !== EProvider.Google) {
            let provedor = 'Login e senha'

            if (userRegistered.providerAccess === EProvider.Facebook) {
              provedor = 'Facebook'
            }

            if (userRegistered.providerAccess === EProvider.Apple) {
              provedor = 'Apple'
            }

            Alert.alert(
              `O seu email ${userRegistered.email} foi registrado pela conta ${provedor}`,
            )
            return
          }

          const {jwt, user} = await handleLogin({
            email: userInfo?.email!,
            password: `${EProvider.Google}@mameguia`,
          })

          return handleSaveUser(jwt, user)
        }

        const responseRegister = await handleUserRegister({
          email: userInfo.email!,
          username: userInfo.name,
          password: `${EProvider.Google}@mameguia`,
          providerAccess: EProvider.Google,
          credential: 'token google',
          confirmed: true,
        })

        if (responseRegister) {
          if (responseRegister?.jwt) {
            return handleSaveUser(responseRegister.jwt, responseRegister.user)
          }

          const responseLogin = await handleLogin({
            email: userInfo.email,
            password: `${EProvider.Google}@mameguia`,
          })

          const {jwt, user} = responseLogin
          return handleSaveUser(jwt, user)
        }

        Alert.alert(
          'Houve um erro em nosso servidores! tente novamente mais tarde!',
        )
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      })

      if (credential) {
        const name = credential.fullName?.givenName || 'Apple'

        if (!credential?.email) {
          const userRegistered = verifyCredential(credential.user)

          if (!userRegistered?.email)
            throw new Error('Existe um problema com a credencial da Apple')

          const {jwt, user} = await handleLogin({
            email: userRegistered.email,
            password: `${EProvider.Apple}@mameguia`,
          })

          return handleSaveUser(jwt, user)
        }

        const userRegistered = verifyEmailIsRegistered(credential?.email)

        if (userRegistered?.email) {
          if (userRegistered.providerAccess !== EProvider.Apple) {
            let provedor = 'Login e senha'

            if (userRegistered.providerAccess === EProvider.Facebook) {
              provedor = 'Facebook'
            }

            if (userRegistered.providerAccess === EProvider.Google) {
              provedor = 'Google'
            }

            Alert.alert(
              `O seu email ${userRegistered.email} foi registrado pela conta ${provedor}`,
            )
            return
          }

          const {jwt, user} = await handleLogin({
            email: credential?.email,
            password: `${EProvider.Apple}@mameguia`,
          })

          return handleSaveUser(jwt, user)
        }

        const responseRegister = await handleUserRegister({
          email: credential.email!,
          username: name,
          password: `${EProvider.Apple}@mameguia`,
          providerAccess: EProvider.Apple,
          credential: credential.user,
          confirmed: true,
        })

        if (responseRegister) {
          if (responseRegister?.jwt) {
            return handleSaveUser(responseRegister.jwt, responseRegister.user)
          }

          const responseLogin = await handleLogin({
            email: credential.email,
            password: `${EProvider.Apple}@mameguia`,
          })

          const {jwt, user} = responseLogin
          return handleSaveUser(jwt, user)
        }

        Alert.alert(
          'Houve um erro em nosso servidores! tente novamente mais tarde!',
        )
      }

      throw new Error('Usuário não cadastrado')
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async function signInFacebook() {
    try {
      if (Constants.appOwnership === 'expo') {
        return
      }

      const {
        success,
        text = 'Erro ao logar no facebook',
        userFacebook,
      } = await _loginFacebook()

      if (!success || !userFacebook.email) {
        Alert.alert(text)
        return
      }

      const userRegistered = verifyEmailIsRegistered(userFacebook.email)

      if (userRegistered?.email) {
        if (userRegistered.providerAccess !== EProvider.Facebook) {
          let provedor = 'Login e senha'
          if (userRegistered.providerAccess === EProvider.Google) {
            provedor = 'Google'
          }
          if (userRegistered.providerAccess === EProvider.Apple) {
            provedor = 'Apple'
          }
          Alert.alert(
            `O seu email ${userRegistered.email} foi registrado pela conta ${provedor}`,
          )
          return
        }
        const {jwt, user} = await handleLogin({
          email: userFacebook.email,
          password: `${EProvider.Facebook}@mameguia`,
        })
        return handleSaveUser(jwt, user)
      }

      await handleUserRegister({
        email: userFacebook.email,
        username: userFacebook.username,
        password: `${EProvider.Facebook}@mameguia`,
        providerAccess: EProvider.Facebook,
        credential: 'token facebook',
        confirmed: true,
      })

      const responseLogin = await handleLogin({
        email: userFacebook.email,
        password: `${EProvider.Facebook}@mameguia`,
      })

      const {jwt, user} = responseLogin
      return handleSaveUser(jwt, user)
    } catch (error: any) {
      Alert.alert(`Facebook Login Erro: ${error?.message}`)
    }
  }

  async function signOut() {
    setUser({} as IUser)
    await AsyncStorage.removeItem(userStorageKey)
    await AsyncStorage.setItem('@mameguia:signOut', JSON.stringify(true))
    setLoggedOut(true)
  }

  async function loadStoredUser() {
    const storedUser = await AsyncStorage.getItem(userStorageKey)

    if (storedUser) {
      const userLogged = JSON.parse(storedUser) as IUser

      if (userLogged) {
        setUser(userLogged)
      }
    }

    setUserStorageIsLoading(false)
  }

  useEffect(() => {
    loadStoredUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        useSignInWithGoogle,
        signInWithApple,
        signInFacebook,
        signOut,
        userStorageIsLoading,
        loadStoredUser,
        loggedOut,
        handleLogin,
        handleSaveUser,
        handleSendEmailUserRegistered,
        usersRegistered,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export {AuthProvider, useAuth}
