import React, {useCallback, useRef, useState} from 'react'
import {useForm} from 'react-hook-form'
import {
  View,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
  Platform,
  Pressable,
} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'

import {useTheme} from 'styled-components'
import * as Yup from 'yup'

import {verifyEmailAndPhoneAreRegistered} from '@/api/userApi'
import LogoSvg from '@/assets/logo2.svg'
import ButtonComponent from '@/components/Button'
import {InputForm} from '@/components/Form/InputForm'
import {useAuth} from '@/hooks/auth'
import {useTogglePasswordVisibility} from '@/hooks/useTogglePasswordVisibility'
import {
  Container,
  Header,
  ScrollView,
  Description,
  ViewInputPassword,
  ViewBoxOr,
  ViewOr,
  OrText,
  ViewSignIn,
  SignLink,
  SignLinkText,
  SignLinkTextAccess,
  ViewUnderline,
  Error,
} from '@/screens/SignUp/SignUpScreen.styles'
import {apiSMS} from '@/services/api'
import {TStackNavigationProp} from '@/types/application/Navigation/NavigationApplication.types'
import {IUser} from '@/types/entities/User/UserEntity.types'
import getValidationErrors from '@/utils/getValidationErrors'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {yupResolver} from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useNavigation} from '@react-navigation/native'
import {FormHandles} from '@unform/core'
export interface ISignUpFormData {
  email: string
  telephone: string
  password: string
}

export interface IVerifySMS {
  situacao: string
  id: string
  mensagem: string
  code: string
  descricao: string
}

const SignUpScreen: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const theme = useTheme()
  const navigation = useNavigation<TStackNavigationProp>()
  const {useSignInWithGoogle, signInWithApple, signInFacebook} = useAuth()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [usersRegistered, setUsersRegistered] = useState<IUser[]>([])
  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility()

  const schema = Yup.object().shape({
    email: Yup.string()
      .required('E-mail obrigatório')
      .email('Digite um e-mail válido'),
    telephone: Yup.string()
      .required('Telefone obrigatório')
      .min(15, 'Digite seu telefone com DDD'),
    password: Yup.string()
      .required('Senha obrigatório')
      .min(6, 'Digite sua senha no mínimo 6 dígitos'),
  })

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ISignUpFormData>({resolver: yupResolver(schema)})

  const handleSendSms = useCallback(
    async (data: ISignUpFormData) => {
      setError('')

      const response = await verifyEmailAndPhoneAreRegistered(
        data.email,
        data.telephone,
      )

      if (response?.haveRegister) {
        setError(response.message)
        return
      }

      setLoading(true)
      try {
        Keyboard.dismiss()
        const pre_register = {
          ...data,
          username: data.email.split('@')[0],
          telephone: data.telephone.replace(/[^0-9]/g, ''),
          blocked: false,
        }

        await AsyncStorage.setItem(
          '@mameguia:pre_user',
          JSON.stringify(pre_register),
        )

        const params = {
          key: 'W2OP4QJ64SPEOS16Q90S2AQDN5S4UJR13YYQHV9ZTPNYMCY3ZK6HUANK7GTZ9B77QO56OB5JYOQONOHMPZLOTFLBERQR7H7JDS4AN3NX8X6HY46XGFO3QTJ5FVXVSC3B',
          number: `55${pre_register.telephone}`,
          template:
            'Seu código de verificação do aplicativo Mameguia é: {999-999}',
          expire: 180,
        }

        const response = await apiSMS.post('verify', params)

        const {code}: IVerifySMS = response.data
        setLoading(false)
        navigation.navigate('Sms', {code})
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)
          formRef?.current?.setErrors(errors)

          return
        }
      }
    },
    [navigation],
  )

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
    } catch (error: any) {
      Alert.alert('Não foi possível conectar à conta Apple')
    }
  }

  return (
    <Container>
      <ScrollView>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={-200}
          style={{flex: 1}}>
          <View style={{flexDirection: 'column', width: '100%'}}>
            <Header>
              <LogoSvg width={RFValue(200)} height={RFValue(68)} />
            </Header>

            <Description>
              Legal! Agora crie seu login de acesso ao app para poder salvar
              suas informações e consultas diárias:
            </Description>
            <View>
              <InputForm
                name="email"
                control={control}
                placeholder="E-mail"
                autoCapitalize="none"
                autoCorrect={false}
                error={errors.email && errors.email.message}
                returnKeyType="next"
                keyboardType="email-address"
              />

              <InputForm
                name="telephone"
                control={control}
                placeholder="Telefone"
                autoCapitalize="none"
                autoCorrect={false}
                error={errors.telephone && errors.telephone.message}
                mask={'([00]) [00000] - [0000]'}
                returnKeyType="next"
                keyboardType="phone-pad"
              />
              <ViewInputPassword>
                <InputForm
                  secureTextEntry={passwordVisibility}
                  name="password"
                  control={control}
                  placeholder="Crie uma senha com 6 dígitos"
                  autoCapitalize="none"
                  autoCorrect={false}
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
                  title="Cadastrar"
                  backgroundColor={theme.colors.primary}
                  color={theme.colors.text_light}
                  onPress={handleSubmit(handleSendSms)}
                  disabled={false}
                  loading={loading}
                />
              </View>
            </View>

            <ViewBoxOr>
              <ViewOr />
              <OrText>Ou</OrText>
              <ViewOr />
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
              <SignLinkText>Já têm uma conta?</SignLinkText>

              <SignLink onPress={() => navigation.navigate('SignIn')}>
                <ViewUnderline>
                  <SignLinkTextAccess>Acesse Agora</SignLinkTextAccess>
                </ViewUnderline>
              </SignLink>
            </ViewSignIn>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </Container>
  )
}

export default SignUpScreen
