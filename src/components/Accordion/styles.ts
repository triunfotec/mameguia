import {RFValue} from 'react-native-responsive-fontsize'

import styled from 'styled-components/native'

export const AccordionView = styled.View`
  margin: ${RFValue(10)}px 0 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 10px 0 0;
  width: 100%;
`

export const TitleAccordion = styled.Text`
  color: ${({theme}) => theme.colors.title};
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.bold};
  margin: ${RFValue(10)}px 0 0;
  flex: 1;
`
export const TextAccordion = styled.Text`
  color: ${({theme}) => theme.colors.title};
  font-size: ${RFValue(12)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  margin: ${RFValue(8)}px 0 0;
`
