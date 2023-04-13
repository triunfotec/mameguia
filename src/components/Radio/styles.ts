import {RFValue} from 'react-native-responsive-fontsize'

import styled from 'styled-components/native'

interface IRadioProps {
  color?: string
  backgroundColor?: string
  fontFamily?: string
}

export const Container = styled.View<IRadioProps>`
  background-color: ${({backgroundColor}) => backgroundColor};
  border-radius: 10px;
  flex-direction: row;
  padding: ${RFValue(16)}px 12px;
  align-items: center;
  width: 100%;
`

export const RadioText = styled.Text<IRadioProps>`
  color: ${({color}) => color};
  font-size: ${RFValue(14)}px;
  font-family: ${({theme, fontFamily}) =>
    fontFamily ? theme.fonts.regular : theme.fonts['extra_bold']};
  margin-left: ${RFValue(8)}px;
`
