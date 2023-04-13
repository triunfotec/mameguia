import React, {useState, useCallback, useEffect, useRef, useMemo} from 'react'
import {
  Image,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableNativeFeedback,
  Platform,
} from 'react-native'

import {useTheme} from 'styled-components'

import ButtonComponent from '@/components/Button'
import ButtonBackComponent from '@/components/ButtonBack'
import {useAuth} from '@/hooks/auth'
import {IVerifySMS} from '@/screens/SignUp/SignUpScreen'
import {
  Container,
  ScrollView,
  Header,
  Text,
  BoxInput,
  Input,
  ViewResend,
  TextAskResend,
  TextResend,
  Error,
} from '@/screens/Sms/SmsScreen.styles'
import {api} from '@/services/api'
import {apiSMS} from '@/services/api'
import {TStackNavigationProp} from '@/types/application/Navigation/NavigationApplication.types'
import {EProvider, IUser} from '@/types/entities/User/UserEntity.types'
import {maskPhone} from '@/utils/formatNumbers'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useNavigation} from '@react-navigation/native'

export interface ISmsScreenParams {
  code: string
}

interface ICheckSms {
  situacao: string
  checked: boolean
  descricao: string
}

const timeSecondsExpireCode = 180

const SmsScreen: React.FC = () => {
  const {handleLogin, handleSendEmailUserRegistered} = useAuth()

  const theme = useTheme()

  const navigation = useNavigation<TStackNavigationProp>()
  const [num, setNum] = useState(timeSecondsExpireCode)

  const intervalRef: React.MutableRefObject<any | null> = useRef<any>(null)

  const [loading, setLoading] = useState(false)

  const [digit1, onChangeDigit1] = useState('')
  const [digit2, onChangeDigit2] = useState('')
  const [digit3, onChangeDigit3] = useState('')
  const [digit4, onChangeDigit4] = useState('')
  const [digit5, onChangeDigit5] = useState('')
  const [digit6, onChangeDigit6] = useState('')

  const [user, setUser] = useState<IUser>({} as IUser)
  const [error, setError] = useState('')

  const input1Ref = useRef(null)
  const input2Ref = useRef<any>(null)
  const input3Ref = useRef<any>(null)
  const input4Ref = useRef<any>(null)
  const input5Ref = useRef<any>(null)
  const input6Ref = useRef<any>(null)

  const decreaseNum = useCallback(() => {
    if (num <= 0) return
    setNum(prev => prev - 1)
  }, [num])

  const initialDecreaseNum = useCallback(() => {
    intervalRef.current = setInterval(decreaseNum, 1000)

    if (num <= 0) {
      clearInterval(intervalRef.current)
      return
    }
  }, [decreaseNum, num])

  useEffect(() => {
    intervalRef.current = setInterval(decreaseNum, 1000)

    return () => clearInterval(intervalRef.current)
  }, [decreaseNum])

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const userStore = await AsyncStorage.getItem('@mameguia:pre_user')

        if (userStore !== null) {
          const user: IUser = JSON.parse(userStore)
          user.providerAccess = EProvider.Default
          user.confirmed = true
          setUser(user)
        }
      } catch {}
    }
    retrieveData()
  }, [])

  const numberExpires = useMemo(() => {
    if (num === 0) return 'Seu código expirou, clique em Reenviar'

    return `O código enviado expira em ${num}s`
  }, [num])

  const handleChangeText = useCallback((text: string, index: number) => {
    if (index === 1) {
      onChangeDigit1(text)

      if (text) input2Ref?.current?.focus()
      return
    }
    if (index === 2) {
      onChangeDigit2(text)
      if (text) input3Ref?.current?.focus()
      return
    }
    if (index === 3) {
      onChangeDigit3(text)
      if (text) input4Ref?.current?.focus()
      return
    }
    if (index === 4) {
      onChangeDigit4(text)
      if (text) input5Ref?.current?.focus()
      return
    }
    if (index === 5) {
      onChangeDigit5(text)
      if (text) input6Ref?.current?.focus()
      return
    }
    if (index === 6) {
      onChangeDigit6(text)
      Keyboard.dismiss()
      return
    }
  }, [])

  const sendSMS = useCallback(async () => {
    onChangeDigit1('')
    onChangeDigit2('')
    onChangeDigit3('')
    onChangeDigit4('')
    onChangeDigit5('')
    onChangeDigit6('')
    setError('')
    setLoading(true)
    try {
      const params = {
        key: 'W2OP4QJ64SPEOS16Q90S2AQDN5S4UJR13YYQHV9ZTPNYMCY3ZK6HUANK7GTZ9B77QO56OB5JYOQONOHMPZLOTFLBERQR7H7JDS4AN3NX8X6HY46XGFO3QTJ5FVXVSC3B',
        number: `55${user?.telephone}`,
        template:
          'Seu código de verificação do aplicativo Mameguia é: {999-999}',
        expire: timeSecondsExpireCode,
      }

      const response = await apiSMS.post('verify', params)
      const data: IVerifySMS = response.data
      setError(data?.descricao)
      setLoading(false)
      setNum(timeSecondsExpireCode)
      initialDecreaseNum()
      clearInterval(intervalRef.current)
    } catch {
      setError('Error ao reenviar o código')
      setLoading(false)
    }
  }, [initialDecreaseNum, user?.telephone])

  const checkSMS = useCallback(async () => {
    if (
      digit1 === '' ||
      digit2 === '' ||
      digit3 === '' ||
      digit4 === '' ||
      digit5 === '' ||
      digit6 === ''
    ) {
      setError('Insira o código')
      setLoading(false)
      return
    }
    setLoading(true)
    try {
      const enteredCode = `${digit1}${digit2}${digit3}${digit4}${digit5}${digit6}`

      const paramsApi = {
        key: 'W2OP4QJ64SPEOS16Q90S2AQDN5S4UJR13YYQHV9ZTPNYMCY3ZK6HUANK7GTZ9B77QO56OB5JYOQONOHMPZLOTFLBERQR7H7JDS4AN3NX8X6HY46XGFO3QTJ5FVXVSC3B',
        number: `55${user?.telephone}`,
        code: enteredCode,
      }

      const response = await apiSMS.post('check', paramsApi)

      const data: ICheckSms = response?.data

      if (!data?.checked) {
        setLoading(false)
        setError(data?.descricao)
      }

      return response?.data?.checked
    } catch (error) {
      setLoading(false)
      return false
    }
  }, [digit1, digit2, digit3, digit4, digit5, digit6, user, setLoading])

  const handleUserRegister = useCallback(async () => {
    try {
      const response = await api.post('api/auth/local/register', user)

      const {email, password} = user
      handleSendEmailUserRegistered(user)

      if (response.status === 200 || response.status === 201) {
        const responseLogin = await handleLogin({
          email,
          password,
        })

        const {jwt, user} = responseLogin

        await AsyncStorage.setItem('@mameguia:jwt', JSON.stringify(jwt))
        await AsyncStorage.setItem('@mameguia:user', JSON.stringify(user))

        navigation.reset({
          routes: [{name: 'ChooseCategory'}],
        })
        return
      }
      setLoading(false)
      setError('Houve um erro ao tentar se cadastrar. Tente novamente!')
    } catch (error) {
      setLoading(false)
      setError('Houve um erro em nosso servidores. Tente novamente mais tarde!')
    }
  }, [user, navigation, handleLogin, handleSendEmailUserRegistered])

  return (
    <Container>
      <View style={{width: '100%', flex: 1}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : 'height'}
          keyboardVerticalOffset={Platform.select({ios: 0, android: 64})}
          style={{flex: 1}}
          enabled>
          <ScrollView>
            <View
              style={{
                flexDirection: 'column',
                width: '100%',
                height: '100%',
                paddingBottom: 24,
              }}>
              <Header>
                <ButtonBackComponent />
              </Header>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  style={{
                    height: 200,
                    width: 200,
                    backgroundColor: 'transparent',
                    marginBottom: 24,
                  }}
                  source={require('@/assets/mame_01.png')}
                />
              </View>

              <Text>
                Insira abaixo o código que recebeu por SMS, enviado para o
                número:
              </Text>

              <Text>{maskPhone(user?.telephone || '')}</Text>

              <BoxInput>
                <Input
                  ref={input1Ref}
                  onChangeText={value => handleChangeText(value, 1)}
                  value={digit1}
                  keyboardType="numeric"
                  maxLength={1}
                  clearTextOnFocus={true}
                />
                <Input
                  ref={input2Ref}
                  onChangeText={value => handleChangeText(value, 2)}
                  value={digit2}
                  keyboardType="numeric"
                  maxLength={1}
                  clearTextOnFocus={true}
                />
                <Input
                  ref={input3Ref}
                  onChangeText={value => handleChangeText(value, 3)}
                  value={digit3}
                  keyboardType="numeric"
                  maxLength={1}
                  clearTextOnFocus={true}
                />
                <Input
                  ref={input4Ref}
                  onChangeText={value => handleChangeText(value, 4)}
                  value={digit4}
                  keyboardType="numeric"
                  maxLength={1}
                  clearTextOnFocus={true}
                />
                <Input
                  ref={input5Ref}
                  onChangeText={value => handleChangeText(value, 5)}
                  value={digit5}
                  keyboardType="numeric"
                  maxLength={1}
                  clearTextOnFocus={true}
                />
                <Input
                  ref={input6Ref}
                  onChangeText={value => handleChangeText(value, 6)}
                  value={digit6}
                  keyboardType="numeric"
                  maxLength={1}
                  clearTextOnFocus={true}
                  onSubmitEditing={Keyboard.dismiss}
                />
              </BoxInput>

              {!!error && <Error>{error}</Error>}

              <ViewResend>
                <Text>{numberExpires}</Text>
              </ViewResend>

              <ViewResend>
                <TextAskResend>Não recebeu o código?</TextAskResend>
                <TouchableNativeFeedback onPress={sendSMS}>
                  <TextResend>Reenviar</TextResend>
                </TouchableNativeFeedback>
              </ViewResend>

              <ButtonComponent
                title="Confirmar e seguir"
                backgroundColor={theme.colors.primary}
                color={theme.colors.text_light}
                onPress={async () => {
                  if (await checkSMS()) {
                    handleUserRegister()
                  }
                }}
                loading={loading}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Container>
  )
}

export default SmsScreen
