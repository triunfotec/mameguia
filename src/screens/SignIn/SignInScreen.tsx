import React, {useCallback, useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {
  View,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Pressable,
} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'
import {useDispatch} from 'react-redux'

import {useTheme} from 'styled-components'
import * as Yup from 'yup'

import LogoSvg from '@/assets/logoMain.svg'
import ButtonComponent from '@/components/Button'
import ButtonBackComponent from '@/components/ButtonBack'
import {InputForm} from '@/components/Form/InputForm'
import {useAuth} from '@/hooks/auth'
import {useTogglePasswordVisibility} from '@/hooks/useTogglePasswordVisibility'
import {
  Container,
  ScrollView,
  Header,
  Description,
  ViewInputPassword,
  Error,
  ViewBoxOr,
  ViewOr,
  OrText,
  OrText2,
  ViewSignIn,
  SignLink,
  SignLinkText,
  SignLinkTextAccess,
  ViewUnderline,
} from '@/screens/SignIn/SignInScreen.styles'
import {api} from '@/services/api'
import {userUpdateStatus} from '@/store/User/UserCreators'
import {EActionTypeStatus} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {TStackNavigationProp} from '@/types/application/Navigation/NavigationApplication.types'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {yupResolver} from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useNavigation} from '@react-navigation/native'

export interface ISignInFormData {
  identifier: string
  password: string
}

const SignInScreen: React.FC = () => {
  const navigation = useNavigation<TStackNavigationProp>()
  const dispatch = useDispatch()

  const {useSignInWithGoogle, signInWithApple, signInFacebook, handleSaveUser} =
    useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility()

  const [isSignOut, setIsSignOut] = useState(false)

  const handleInitialRoute = useCallback(async () => {
    const isSignOuta = (await AsyncStorage.getItem('@mameguia:signOut')) || ''

    setIsSignOut(!!isSignOuta)
  }, [])

  const theme = useTheme()

  const schema = Yup.object().shape({
    identifier: Yup.string().required('E-mail ou celular obrigatório'),
    password: Yup.string()
      .required('Senha obrigatório')
      .min(1, 'Digite sua senha'),
  })

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ISignInFormData>({resolver: yupResolver(schema)})

  async function handleSignInWithFacebook() {
    try {
      return await signInFacebook()
    } catch (error) {
      Alert.alert('Não foi possível conectar à conta Facebook')
    }
  }

  async function useHandleSignInWithGoogle() {
    try {
      return await useSignInWithGoogle()
    } catch (error) {
      Alert.alert('Não foi possível conectar à conta Google')
    }
  }

  async function handleSignInWithApple() {
    try {
      return await signInWithApple()
    } catch (error) {
      Alert.alert('Não foi possível conectar à conta Apple')
    }
  }

  const handleLogin = useCallback(
    async (dataLogin: ISignInFormData) => {
      setLoading(true)
      try {
        Keyboard.dismiss()

        const response = await api.post('api/auth/local', dataLogin)

        const {jwt, user} = response?.data

        await AsyncStorage.setItem('@mameguia:jwt', JSON.stringify(jwt))
        await AsyncStorage.setItem('@mameguia:user', JSON.stringify(user))

        setLoading(false)
        handleSaveUser(jwt, user)
      } catch (error) {
        setError('Usuário ou senha inválido. Tente novamente.')

        setLoading(false)
      }
    },
    [handleSaveUser],
  )

  useEffect(() => {
    handleInitialRoute()
    dispatch(
      userUpdateStatus({
        status: EActionTypeStatus.Waiting,
        message: '',
      }),
    )
  }, [dispatch, handleInitialRoute])

  return (
    <Container>
      <ScrollView>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={-300}
          style={{flex: 1}}>
          <View style={{flexDirection: 'column', width: '100%'}}>
            <Header>
              {!isSignOut && <ButtonBackComponent />}

              <LogoSvg width={RFValue(200)} height={RFValue(68)} />
            </Header>

            <Description>
              Acesse o Mameguia com seu login ou celular e senha.
            </Description>

            <View>
              <InputForm
                name="identifier"
                control={control}
                keyboardType="email-address"
                autoCorrect={false}
                error={errors.identifier && errors.identifier.message}
                autoCapitalize="none"
                placeholder="E-mail ou DD + celular"
                returnKeyType="next"
              />
              <ViewInputPassword>
                <InputForm
                  name="password"
                  control={control}
                  secureTextEntry={passwordVisibility}
                  placeholder="Senha"
                  error={errors.password && errors.password.message}
                  returnKeyType="send"
                  onSubmitEditing={Keyboard.dismiss}
                />
                <Pressable
                  onPress={handlePasswordVisibility}
                  style={{
                    backgroundColor: '#F8F6F7',

                    borderRadius: 5,
                    marginLeft: -44,
                    paddingRight: 16,
                  }}>
                  <MaterialCommunityIcons
                    name={rightIcon}
                    size={24}
                    color="#AD9BE6"
                  />
                </Pressable>
              </ViewInputPassword>

              {!!error && <Error>{error}</Error>}

              <View style={{marginTop: 44}}>
                <ButtonComponent
                  title="Entrar"
                  backgroundColor={theme.colors.primary}
                  color={theme.colors.text_light}
                  onPress={handleSubmit(handleLogin)}
                  disabled={false}
                  loading={loading}
                />
              </View>
            </View>

            <SignLink onPress={() => navigation.navigate('ForgotMyPassword')}>
              <ViewUnderline>
                <SignLinkTextAccess>
                  Ops! Esqueci minha senha
                </SignLinkTextAccess>
              </ViewUnderline>
            </SignLink>

            <ViewBoxOr>
              <ViewOr />
              <OrText>Ou</OrText>
              <ViewOr />
            </ViewBoxOr>

            <ViewBoxOr>
              <OrText2>Ou continue no app usando uma dessas contas</OrText2>
            </ViewBoxOr>

            <ButtonComponent
              title="Continuar com Facebook"
              backgroundColor={theme.colors.text_light}
              borderColor={theme.colors.secondary}
              color={theme.colors.primary}
              onPress={handleSignInWithFacebook}
              disabled={false}
              nameIcon="facebook"
              isSocial={true}
              height={40}
            />

            <ButtonComponent
              title="Continuar com Google"
              backgroundColor={theme.colors.text_light}
              borderColor={theme.colors.secondary}
              color={theme.colors.primary}
              onPress={useHandleSignInWithGoogle}
              disabled={false}
              nameIcon="google"
              isSocial={true}
              height={40}
            />
            {Platform.OS === 'ios' && (
              <ButtonComponent
                title="Continuar com Apple"
                backgroundColor={theme.colors.text_light}
                borderColor={theme.colors.secondary}
                color={theme.colors.primary}
                onPress={handleSignInWithApple}
                disabled={false}
                nameIcon="apple"
                isSocial={true}
                height={40}
              />
            )}

            <ViewSignIn>
              <SignLinkText>Esse é o seu primeiro acesso?</SignLinkText>

              <SignLink onPress={() => navigation.navigate('SignUp')}>
                <ViewUnderline>
                  <SignLinkTextAccess>Cadastrar</SignLinkTextAccess>
                </ViewUnderline>
              </SignLink>
            </ViewSignIn>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </Container>
  )
}

export default SignInScreen
