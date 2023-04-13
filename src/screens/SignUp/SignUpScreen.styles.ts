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
  margin-top: ${RFValue(5)}px;

  align-items: flex-start;
`
export const Description = styled.Text`
  height: 65px;
  text-align: left;
  color: ${({theme}) => theme.colors.text};
  margin-top: 16px;
`
export const ViewInputPassword = styled.View`
  width: 100%;
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
`

export const ViewBoxOr = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 30px;
  margin: 16px 0;
`
export const ViewOr = styled.View`
  width: 100%;
  height: 1px;
  padding: 0 20px;
  background-color: ${({theme}) => theme.colors.text};
`

export const OrText = styled.Text`
  width: 50px;
  height: 30px;
  text-align: center;
  color: ${({theme}) => theme.colors.text};
  line-height: 30px;
`
export const Form = styled.View`
  align-self: stretch;
  margin-top: 16px;
`

export const ViewSignIn = styled.View`
  flex-direction: row;
  margin: -20px 0 20px 0;
  justify-content: center;
  align-items: center;
`

export const SignLink = styled.TouchableOpacity`
  margin: 20px 0;
`

export const SignLinkText = styled.Text`
  color: ${({theme}) => theme.colors.text};

  font-size: ${RFValue(14)}px;
  text-align: center;
`
export const ViewUnderline = styled.View`
  border-bottom-width: 1px;
  margin-left: ${RFValue(10)}px;
  border-color: ${({theme}) => theme.colors.text_dark};
`
export const SignLinkTextAccess = styled.Text`
  color: ${({theme}) => theme.colors.text_dark};
  font-size: ${RFValue(14)}px;
`

export const Error = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme}) => theme.colors.attention};
  text-align: center;
  margin: 7px 0;
`
