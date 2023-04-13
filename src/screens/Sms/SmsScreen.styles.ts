import {RFValue} from 'react-native-responsive-fontsize'

import styled from 'styled-components/native'

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.text_light};
  flex-direction: column;
  padding: 0 24px;
  justify-content: center;
  align-items: center;
  height: 100%;
`
export const ScrollView = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})``

export const Header = styled.View`
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  margin-top: ${RFValue(20)}px;
  flex-direction: row;
`
export const Text = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
  line-height: ${RFValue(24)}px;

  color: ${({theme}) => theme.colors.text};

  text-align: center;
  padding: 0 25px;
`

export const BoxInput = styled.View`
  height: 60px;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 20px;
  margin: 44px 0 22px 0;
`
export const Input = styled.TextInput`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
  line-height: ${RFValue(24)}px;

  width: 44px;
  height: 55px;

  background-color: ${({theme}) => theme.colors.background};
  border-radius: 8px;
  padding: 0;
  color: ${({theme}) => theme.colors.text};
  text-align: center;
`
export const ViewResend = styled.View`
  width: 100%;
  flex-direction: column;
  margin-bottom: 24px;
`
export const TextAskResend = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;
  line-height: ${RFValue(24)}px;

  color: ${({theme}) => theme.colors.text};
  font-weight: 300;
  text-align: center;

  line-height: 22px;
`
export const TextResend = styled.Text`
  font-family: ${({theme}) => theme.fonts.extra_bold};
  font-size: ${RFValue(16)}px;
  line-height: ${RFValue(24)}px;

  color: ${({theme}) => theme.colors.text_dark};
  font-weight: bold;
  text-align: center;
  font-size: ${RFValue(16)}px;
  line-height: 22px;
  text-decoration: underline;
`
export const Error = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme}) => theme.colors.secondary};
  text-align: center;
  margin: 7px 0;
`
