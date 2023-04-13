import React, {useCallback, useState} from 'react'
import {useForm} from 'react-hook-form'
import {
  KeyboardAvoidingView,
  View,
  Dimensions,
  Platform,
  Alert,
} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'

import {useTheme} from 'styled-components'
import * as Yup from 'yup'

import LogoSvg from '@/assets/logo3.svg'
import ButtonComponent from '@/components/Button'
import ButtonBackComponent from '@/components/ButtonBack'
import {InputForm} from '@/components/Form/InputForm'
import {useAuth} from '@/hooks/auth'
import {
  Container,
  ScrollView,
  ViewContent,
  Header,
  Description,
  ViewSignIn,
  SignLink,
  SignLinkText,
  ViewUnderline,
  SignLinkTextAccess,
  ViewButtons,
  Success,
  Error,
} from '@/screens/ForgotMyPassword/ForgotMyPasswordScreen.styles'
import {api} from '@/services/api'
import {TStackNavigationProp} from '@/types/application/Navigation/NavigationApplication.types'
import {yupResolver} from '@hookform/resolvers/yup'
import {useNavigation} from '@react-navigation/native'

interface IForgotMyPasswordFormData {
  identifier: string
}

const ForgotMyPasswordScreen: React.FC = () => {
  const theme = useTheme()

  const {usersRegistered} = useAuth()

  const navigation = useNavigation<TStackNavigationProp>()

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const schema = Yup.object().shape({
    identifier: Yup.string()
      .required('E-mail obrigatório')
      .email('Digite um e-mail válido'),
  })

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IForgotMyPasswordFormData>({resolver: yupResolver(schema)})

  const findUser = async (email: string) => {
    try {
      const response = await api.get(`api/users?filters[email][$eq]=${email}`)

      return response.data
    } catch {
      return false
    }
  }

  const handleEmailIsRegistered = useCallback(async (email: string) => {
    const _userRegistered = await findUser(email)

    if (_userRegistered?.length === 0) {
      return {
        valid: false,
        message: 'E-mail não registrado!',
      }
    }
    const userRegistered = _userRegistered[0]

    if (userRegistered.providerAccess !== 'padrão') {
      return {
        valid: false,
        message: `O seu email ${userRegistered.email} foi registrado pela conta ${userRegistered.providerAccess}`,
      }
    }

    return {
      valid: true,
      message: '',
    }
  }, [])

  const handleSendNewPassword = useCallback(
    async (email: IForgotMyPasswordFormData) => {
      setLoading(true)
      try {
        const isRegistered = await handleEmailIsRegistered(email?.identifier)
        if (!isRegistered.valid) {
          Alert.alert(isRegistered.message)
          setLoading(false)
          return
        }

        const response = await api.post('api/auth/forgot-password', {
          email: email?.identifier,
        })

        if (response) {
          setSuccess(true)
        }
      } catch (error: any) {
        setError(true)
      } finally {
        setLoading(false)
      }
    },
    [handleEmailIsRegistered],
  )
  let screenHeight = Dimensions.get('window').height
  return (
    <Container>
      <View
        style={{
          width: '100%',
          flex: 1,
        }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : 'height'}
          keyboardVerticalOffset={-44}
          style={{flex: 1}}
          enabled>
          <ScrollView>
            <ViewContent>
              <View style={{flex: 1, height: screenHeight - 144}}>
                <Header>
                  <ButtonBackComponent />
                  <LogoSvg width={RFValue(200)} height={RFValue(68)} />
                </Header>

                <Description>
                  Esqueceu sua senha? Insira o endereço de e-mail que você
                  utiliza para fazer login que iremos te mandar um e-mail de
                  recuperação.
                </Description>

                <InputForm
                  name="identifier"
                  control={control}
                  placeholder="E-mail"
                  autoCapitalize="none"
                  autoCorrect={false}
                  error={errors?.identifier && errors?.identifier.message}
                  returnKeyType="next"
                  keyboardType="email-address"
                />
              </View>
              {success && (
                <Success>
                  Entre na sua caixa de e-mail e altere sua senha
                </Success>
              )}

              {error && (
                <Error>
                  Erro ao enviar e-mail, tente novamente mais tarde.
                </Error>
              )}
              <ViewButtons>
                <ButtonComponent
                  title="Enviar e-mail"
                  backgroundColor={theme.colors.primary}
                  color={theme.colors.text_light}
                  onPress={handleSubmit(handleSendNewPassword)}
                  loading={loading}
                />

                <ViewSignIn>
                  <SignLinkText>Já tem uma conta?</SignLinkText>

                  <SignLink onPress={() => navigation.navigate('SignIn')}>
                    <ViewUnderline>
                      <SignLinkTextAccess>Acesse agora</SignLinkTextAccess>
                    </ViewUnderline>
                  </SignLink>
                </ViewSignIn>
              </ViewButtons>
            </ViewContent>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Container>
  )
}

export default ForgotMyPasswordScreen
