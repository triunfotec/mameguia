import React, {useEffect, useMemo, useState} from 'react'
import {Button, View, Image} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'

import * as Application from 'expo-application'
import * as ImagePicker from 'expo-image-picker'
import {useTheme} from 'styled-components'

import LogoSvg from '@/assets/logo3.svg'
import PerfilSvg from '@/assets/menu/icon_perfil_azul.svg'
import ButtonComponent from '@/components/Button'
import ModalConfirmActionComponent from '@/components/ModalConfirmAction'
import {useAuth} from '@/hooks/auth'
import {
  ScrollView,
  Container,
  Content,
  ViewLogo,
  Title,
  SubTitle,
  Username,
  ViewItemPerfil,
  ItemPerfil,
  ItemVersion,
  ViewButton,
  ViewCategory,
  BoxPhoto,
  CirclePhoto,
  ButtonsPhoto,
  TextPhoto,
  ButtonPhoto,
} from '@/screens/Perfil/PerfilScreen.styles'
import {api} from '@/services/api'
import {frequentAskGet} from '@/store/FrequentAsk/FrequentAskCreators'
import {userDelete, userDeleteStatus} from '@/store/User/UserCreators'
import {selectUserDeleteStatus} from '@/store/User/UserSelectors'
import {EActionTypeStatus} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {TStackNavigationProp} from '@/types/application/Navigation/NavigationApplication.types'
import {emailDeleted} from '@/utils/emailTemplate'
import {maskPhone} from '@/utils/formatNumbers'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'

const PerfilScreen: React.FC = () => {
  const {signOut, user} = useAuth()
  const theme = useTheme()
  const dispatch = useDispatch()
  const navigation = useNavigation<TStackNavigationProp>()

  const [showModalConfirmAction, setShowModalConfirmAction] = useState(false)
  const [image, setImage] = useState(null)

  const selectedUserDeleteStatus = useSelector(selectUserDeleteStatus)

  const askDeleteAccount = useMemo(() => {
    return 'Você realmente deseja excluir a sua conta no aplicativo Mameguia?'
  }, [])

  const pickImage = async () => {
    console.log('pickImage')
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result)

    if (!result.canceled) {
      setImage(result?.assets[0]?.uri)
    }
  }

  useEffect(() => {
    if (selectedUserDeleteStatus.status === EActionTypeStatus.Success) {
      setShowModalConfirmAction(false)
      dispatch(
        userDeleteStatus({
          status: EActionTypeStatus.Waiting,
          message: '',
        }),
      )

      const dataSendEmail = {
        to: user.email,
        subject: 'Conta encerrada no aplicativo Mameguia',
        html: emailDeleted,
      }

      try {
        api.post('api/email', dataSendEmail)
      } catch (error: any) {}

      signOut()
    }
  }, [dispatch, selectedUserDeleteStatus.status, signOut, user.email])

  return (
    <>
      <ViewLogo>
        <LogoSvg />
      </ViewLogo>
      <Container>
        <ScrollView>
          <Content>
            <Title>Perfil</Title>
            <BoxPhoto>
              <ButtonPhoto onPress={() => pickImage()}>
                {image ? (
                  <>
                    <Image
                      source={{uri: image}}
                      style={{width: 100, height: 100, borderRadius: 100}}
                    />
                    <Username>{user.username}</Username>
                  </>
                ) : (
                  <>
                    <CirclePhoto>
                      <PerfilSvg width={40} height={40} />
                    </CirclePhoto>
                    <ButtonsPhoto>
                      <Username>{user.username}</Username>
                    </ButtonsPhoto>
                  </>
                )}
              </ButtonPhoto>
            </BoxPhoto>

            <ViewCategory>
              {user?.telephone && user.providerAccess === 'padrão' && (
                <ViewItemPerfil>
                  <MaterialCommunityIcons
                    name="phone-outline"
                    size={24}
                    color="#13004D"
                  />
                  <ItemPerfil>{maskPhone(user.telephone)}</ItemPerfil>
                </ViewItemPerfil>
              )}

              <ViewItemPerfil>
                <MaterialCommunityIcons name="at" size={24} color="#13004D" />
                <ItemPerfil>{user.email}</ItemPerfil>
              </ViewItemPerfil>

              <ViewItemPerfil>
                <ItemPerfil>Situação: {user.situation}</ItemPerfil>
              </ViewItemPerfil>

              <ButtonComponent
                title="Editar dados"
                backgroundColor={theme.colors.text_light}
                color={theme.colors.primary}
                borderColor={theme.colors.primary}
                onPress={() => navigation.navigate('UpdateUser')}
                height={44}
              />
            </ViewCategory>

            <SubTitle>Sobre o app</SubTitle>

            <View>
              <ViewButton>
                <ButtonComponent
                  title="Política de privacidade"
                  backgroundColor={theme.colors.primary}
                  color={theme.colors.text_light}
                  onPress={() => navigation.navigate('Policy')}
                />
              </ViewButton>

              <ViewButton>
                <ButtonComponent
                  title="Termos e condições de uso"
                  backgroundColor={theme.colors.primary}
                  color={theme.colors.text_light}
                  onPress={() => navigation.navigate('TermCondition')}
                />
              </ViewButton>

              <ViewButton>
                <ButtonComponent
                  title="Sair"
                  backgroundColor={theme.colors.primary}
                  color={theme.colors.text_light}
                  onPress={() => {
                    signOut()

                    navigation.reset({
                      routes: [{name: 'TabHome'}],
                    })
                  }}
                />
              </ViewButton>

              <ViewItemPerfil>
                <ItemVersion>
                  App Mameguia version: {Application.nativeApplicationVersion}
                </ItemVersion>
              </ViewItemPerfil>

              <ViewButton>
                <ButtonComponent
                  title="Deletar conta"
                  backgroundColor={theme.colors.text_light}
                  color={theme.colors.primary}
                  borderColor={theme.colors.primary}
                  onPress={() => setShowModalConfirmAction(true)}
                  height={44}
                />
              </ViewButton>
            </View>
          </Content>
        </ScrollView>

        <ModalConfirmActionComponent
          visible={showModalConfirmAction}
          handleModalVisible={setShowModalConfirmAction}
          askText={askDeleteAccount}
          handleActionYes={() => {
            dispatch(userDelete(user.id))
          }}
          statusAction={selectedUserDeleteStatus}
        />
      </Container>
    </>
  )
}

export default PerfilScreen
