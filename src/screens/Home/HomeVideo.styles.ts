import {RFValue} from 'react-native-responsive-fontsize'

import styled from 'styled-components/native'

import {IHomeProps} from '@/screens/Home/HomeScreen.styles'
export const ContainerView = styled.View<IHomeProps>`
  width: 100%;
  flex: 1;
  background-color: ${({backgroundColor}) => backgroundColor};
  border-radius: ${RFValue(24)}px;
  padding: ${RFValue(32)}px ${RFValue(15)}px;
  margin-bottom: ${RFValue(25)}px;
`
export const TitleText = styled.Text<IHomeProps>`
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: ${RFValue(20)}px;
  color: ${({color}) => color};
`
export const SubTitleText = styled.Text<IHomeProps>`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;
  color: ${({color}) => color};
  margin: ${RFValue(8)}px 0 ${RFValue(24)}px;
`

export const ButtonView = styled.View`
  margin: ${RFValue(25)}px 0 ${RFValue(0)}px;
`
