import {RFValue} from 'react-native-responsive-fontsize'

import styled from 'styled-components/native'

interface IMenuProps {
  color?: string
}

export const ContainerView = styled.View`
  position: absolute;
  top: ${RFValue(70)}px;
  z-index: 99;
  width: 100%;
  height: 100%;
`
export const ContentView = styled.View`
  flex: 1;
`
export const ButtonsView = styled.View`
  background-color: ${({theme}) => theme.colors.text_light};
  width: 100%;
  padding: ${RFValue(20)}px;
  border-radius: ${RFValue(20)}px;
`
export const MenuBoxView = styled.View`
  width: 100%;
  align-items: flex-start;
  padding: ${RFValue(20)}px;
  margin-left: ${RFValue(20)}px;
`
export const MenuText = styled.Text<IMenuProps>`
  color: ${({color, theme}) => color || theme.colors.text_light};
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.extra_bold};
`
