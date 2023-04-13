import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {useForm} from 'react-hook-form'
import {
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Pressable,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'
import {useDispatch, useSelector} from 'react-redux'

import {useTheme} from 'styled-components'
import * as Yup from 'yup'

import LogoSvg from '@/assets/logo3.svg'
import ButtonComponent from '@/components/Button'
import {InputForm} from '@/components/Form/InputForm'
import RadioComponent from '@/components/Radio'
import {useAuth} from '@/hooks/auth'
import {useTogglePasswordVisibility} from '@/hooks/useTogglePasswordVisibility'
import {
  Container,
  ScrollView,
  Content,
  HeaderView,
  GoBackView,
  Title,
  ButtonView,
  ViewInputPassword,
  Error,
  RadioView,
} from '@/screens/UpdateUser/UpdateUserScreen.styles'
import {userUpdate, userUpdateStatus} from '@/store/User/UserCreators'
import {selectUserUpdateStatus} from '@/store/User/UserSelectors'
import {EActionTypeStatus} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {TStackNavigationProp} from '@/types/application/Navigation/NavigationApplication.types'
import {
  ESituation,
  IUser,
  TSituations,
} from '@/types/entities/User/UserEntity.types'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {yupResolver} from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useNavigation} from '@react-navigation/native'

interface IUpdateUserFormData {
  username: string
  email: string
  telephone: string
  password: string
}

const UpdateUserScreen: React.FC = () => {
  const scrollRef = useRef<any>()
  const theme = useTheme()
  const dispatch = useDispatch()
  const {user, loadStoredUser} = useAuth()
  const [situation, setSituation] = useState<TSituations>(user.situation)
  const [_userUpdate, _setUserUpdate] = useState<Partial<IUser>>(user)

  const [error, setError] = useState('')

  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility()

  const isProviderDefault = useMemo(() => {
    return user.providerAccess === 'padrão'
  }, [user.providerAccess])

  const schema = Yup.object().shape(
    {
      username: Yup.string()
        .required('Nome do usuário obrigatório')
        .min(3, 'Digite o nome do usuário'),
      email: Yup.string()
        .required('E-mail obrigatório')
        .email('Digite um e-mail válido'),
      telephone: Yup.string()
        .required('celular obrigatório')
        .min(11, 'Digite seu telefone com DDD'),
      password: Yup.string()
        .nullable()
        .notRequired()
        .when('password', {
          is: (value: string | any[]) => value?.length,
          then: rule => rule.min(6, 'Digite no mínimo 6 caracteres'),
        }),
    },
    [['password', 'password']],
  )

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm<IUpdateUserFormData>({
    resolver: yupResolver(schema),
  })

  const navigation = useNavigation<TStackNavigationProp>()

  const selectUserUpdate = useSelector(selectUserUpdateStatus)

  const handleUpdateUser = useCallback(
    (_user: Partial<IUser>) => {
      const _update = {..._user, id: user.id, situation}
      _setUserUpdate(_update)
      dispatch(userUpdate(_update))
    },
    [dispatch, user.id, situation],
  )

  useEffect(() => {
    setValue('username', user.username || '')
    setValue('email', user.email)
    setValue('telephone', user.telephone || '11111111111')
  }, [setValue, user.email, user.telephone, user.username])

  useEffect(() => {
    if (selectUserUpdate.status === EActionTypeStatus.Success) {
      dispatch(
        userUpdateStatus({
          status: EActionTypeStatus.Waiting,
          message: '',
        }),
      )
      setError('Informações do perfil salvas com sucesso!')
      AsyncStorage.setItem(
        '@mameguia:user',
        JSON.stringify({...user, ..._userUpdate}),
      )
      loadStoredUser()
      navigation.reset({
        routes: [{name: 'Perfil'}],
      })
    }
  }, [
    _userUpdate,
    dispatch,
    loadStoredUser,
    navigation,
    selectUserUpdate.status,
    user,
  ])

  return (
    <Container>
      <View
        style={{
          width: '100%',
          flex: 1,
        }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={-44}
          style={{flex: 1}}
          enabled>
          <ScrollView ref={scrollRef}>
            <Content>
              <HeaderView>
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.goBack()
                  }}>
                  <GoBackView>
                    <MaterialCommunityIcons
                      name="chevron-left"
                      size={32}
                      color={theme.colors.primary}
                    />
                  </GoBackView>
                </TouchableWithoutFeedback>
                <LogoSvg width={RFValue(200)} height={RFValue(44)} />

                <TouchableWithoutFeedback onPress={() => {}}>
                  <GoBackView>
                    <MaterialCommunityIcons
                      name="chevron-right"
                      size={32}
                      color={theme.colors.primary}
                      style={{opacity: 0}}
                    />
                  </GoBackView>
                </TouchableWithoutFeedback>
              </HeaderView>
              <Title>Editar perfil</Title>
              {isProviderDefault && (
                <>
                  <InputForm
                    name="username"
                    control={control}
                    placeholder="Usuário"
                    autoCapitalize="none"
                    autoCorrect={false}
                    error={errors?.username && errors?.username.message}
                    returnKeyType="next"
                    keyboardType="email-address"
                  />
                  <InputForm
                    name="email"
                    control={control}
                    placeholder="E-mail"
                    autoCapitalize="none"
                    autoCorrect={false}
                    error={errors?.email && errors?.email.message}
                    returnKeyType="next"
                    keyboardType="email-address"
                  />
                  <InputForm
                    name="telephone"
                    control={control}
                    placeholder="Celular (xx)xxxxx-xxxx"
                    autoCapitalize="none"
                    autoCorrect={false}
                    error={errors?.telephone && errors?.telephone.message}
                    mask={'([00]) [00000] - [0000]'}
                    returnKeyType="next"
                    keyboardType="phone-pad"
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
                </>
              )}
              <RadioView>
                <RadioComponent
                  text="Tentante"
                  selected={situation === ESituation.getPregnant}
                  onPress={() => setSituation('Tentante')}
                  color={theme.colors.text}
                  fontFamily="regular"
                />
                <RadioComponent
                  text="Gestante"
                  selected={situation === ESituation.pregnant}
                  onPress={() => setSituation('Gestante')}
                  color={theme.colors.text}
                  fontFamily="regular"
                />
                <RadioComponent
                  text="Lactante"
                  selected={situation === ESituation.breastfeeding}
                  onPress={() => setSituation('Lactante')}
                  color={theme.colors.text}
                  fontFamily="regular"
                />
                <RadioComponent
                  text="Parceiro(a)"
                  selected={situation === ESituation.anotherResponsible}
                  onPress={() => setSituation('Parceiro(a)')}
                  color={theme.colors.text}
                  fontFamily="regular"
                />
              </RadioView>

              {!!error && <Error>{error}</Error>}
              <ButtonView>
                <ButtonComponent
                  title="Salvar informações"
                  backgroundColor={theme.colors.text_light}
                  borderColor={theme.colors.primary}
                  color={theme.colors.primary}
                  onPress={handleSubmit(handleUpdateUser)}
                  height={50}
                  loading={selectUserUpdate?.status === EActionTypeStatus.Busy}
                />
              </ButtonView>
            </Content>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Container>
  )
}

export default UpdateUserScreen
