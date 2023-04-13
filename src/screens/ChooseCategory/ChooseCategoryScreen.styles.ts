import {RFValue} from 'react-native-responsive-fontsize'

import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.text_light};
  padding: 0 5%;
`
export const ScrollView = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`
export const Header = styled.View`
  width: 100%;
  margin-top: ${RFValue(20)}px;

  align-items: flex-start;
`
export const Description = styled.Text`
  text-align: left;
  color: ${({theme}) => theme.colors.primary};
  margin: 16px 0;
  font-size: ${RFValue(16)}px;
`

export const ViewBoxOr = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 16px 0;
`

export const OrText2 = styled.Text`
  width: 100%;
  text-align: left;
  color: ${({theme}) => theme.colors.text};
  font-size: ${RFValue(16)}px;
`

export const Error = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme}) => theme.colors.attention};
  text-align: center;
  margin: 7px 0;
`
