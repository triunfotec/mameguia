import React from 'react'

import {useTheme} from 'styled-components'

import ButtonComponent from '@/components/Button'
import {BoxView, TitleText, Text, ButtonView} from '@/components/ChatBox/styles'
import {TStackNavigationProp} from '@/types/application/Navigation/NavigationApplication.types'
import {useNavigation} from '@react-navigation/native'

const ChatBoxComponent: React.FC = () => {
  const theme = useTheme()
  const navigation = useNavigation<TStackNavigationProp>()
  return (
    <BoxView backgroundColor={theme.colors.text_light}>
      <TitleText color={theme.colors.secondary}>Chat</TitleText>
      <Text color={theme.colors.dark_grey}>
        Entre em contato para tirar todas as suas dúvidas.
      </Text>

      <ButtonView>
        <ButtonComponent
          title="Fale com a gente"
          backgroundColor={theme.colors.text_light}
          color={theme.colors.primary}
          borderColor={theme.colors.secondary}
          onPress={() => navigation.navigate('Chat')}
        />
      </ButtonView>
    </BoxView>
  )
}

export default ChatBoxComponent
