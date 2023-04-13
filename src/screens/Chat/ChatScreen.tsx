import React, {useMemo} from 'react'
import {
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  TouchableWithoutFeedback,
  View,
  ImageBackground,
} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'
import {WebView} from 'react-native-webview'

import {useTheme} from 'styled-components'

import BackgroundBreastfeed from '@/assets/backgroundHome/background_lactante.png'
import IconChat from '@/assets/chat/icon_chat.svg'
import LogoSvg2 from '@/assets/logos/Logo-2.svg'
import {useAuth} from '@/hooks/auth'
import {
  HeaderView,
  GoBackView,
  TitleView,
  Title,
} from '@/screens/Chat/ChatScreen.styles'
import {TStackNavigationProp} from '@/types/application/Navigation/NavigationApplication.types'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
export interface IChatScreenParams {
  screen?: string
}

const URL_CHAT = 'https://apiassistente.libbs.com.br/chat3/chat/chatfilter.zul'
const ChatScreen: React.FC<IChatScreenParams> = () => {
  const theme = useTheme()
  const {user} = useAuth()

  const navigation = useNavigation<TStackNavigationProp>()
  let screenHeight = Dimensions.get('window').height
  const injectScript =
    'const meta = document.createElement("meta"); meta.setAttribute("content", "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"); meta.setAttribute("name", "viewport"); document.head.appendChild(meta);'

  const urlChat = useMemo(() => {
    const name = user?.username
    const email = user?.email
    const description = 'Mameguia'

    return `${URL_CHAT}?context=4&lang=pt_BR&typeCode=567&autologin=1&name=${name}&email=${email}&description=${description}`
  }, [user?.email, user?.username])

  return (
    <Modal>
      <ImageBackground
        resizeMode="cover"
        source={BackgroundBreastfeed}
        style={{
          justifyContent: 'flex-start',
          flex: 1,
        }}>
        <View
          style={{
            height: screenHeight,
            alignContent: 'center',
            justifyContent: 'center',
            flex: 1,
            paddingVertical: 20,
          }}>
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
            <LogoSvg2 width={RFValue(200)} height={RFValue(44)} />

            <TouchableWithoutFeedback onPress={() => {}}>
              <GoBackView>
                <></>
              </GoBackView>
            </TouchableWithoutFeedback>
          </HeaderView>
          <KeyboardAvoidingView
            style={{flex: 1}}
            keyboardVerticalOffset={Platform.select({ios: 0, android: 0})}>
            <TitleView>
              <IconChat />

              <Title>Chat</Title>
            </TitleView>
            <WebView
              source={{
                uri: urlChat,
              }}
              injectedJavaScript={injectScript}
            />
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </Modal>
  )
}

export default ChatScreen
