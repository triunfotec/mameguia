import {TouchableOpacity} from 'react-native-gesture-handler'
import {RFValue} from 'react-native-responsive-fontsize'

import styled from 'styled-components/native'

interface IChatBoxProps {
  color?: string
  backgroundColor?: string
}

export const BoxView = styled.View<IChatBoxProps>`
  width: 100%;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  background-color: ${({backgroundColor}) => backgroundColor};
  padding: ${RFValue(24)}px ${RFValue(16)}px;
  margin: ${RFValue(24)}px 0;
`

export const TitleText = styled.Text<IChatBoxProps>`
  width: 100%;
  color: ${({color}) => color};
  font-size: ${RFValue(20)}px;
  font-family: ${({theme}) => theme.fonts.bold};
  margin: ${RFValue(8)}px 0;
`
export const Text = styled.Text<IChatBoxProps>`
  width: 100%;
  color: ${({color}) => color};
  font-size: ${RFValue(16)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  margin: ${RFValue(8)}px 0;
`

export const ButtonView = styled.View<IChatBoxProps>`
  width: 100%;
  margin: ${RFValue(16)}px 0 0;
`
