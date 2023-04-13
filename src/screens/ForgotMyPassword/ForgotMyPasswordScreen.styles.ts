import {RFValue} from 'react-native-responsive-fontsize'

import styled from 'styled-components/native'

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.text_light};
  flex-direction: column;
  padding: 0 24px;
  justify-content: center;
  align-items: center;
  flex: 1;
`

export const ScrollView = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})``

export const ViewContent = styled.View`
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

export const ViewSignIn = styled.View`
  flex-direction: row;
  margin: 5px 0 20px 0;
  justify-content: center;
  align-items: center;
`

export const SignLink = styled.TouchableOpacity`
  margin: 20px 0;
  text-align: center;
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
  text-align: center;
`

export const ViewButtons = styled.View`
  flex: 1;
`

export const Success = styled.Text`
  color: ${({theme}) => theme.colors.success};

  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.regular};

  padding: 0 0 10px 0;
  text-align: center;
`
export const Error = styled.Text`
  color: ${({theme}) => theme.colors.attention};

  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.regular};

  padding: 0 0 10px 0;
  text-align: center;
`
