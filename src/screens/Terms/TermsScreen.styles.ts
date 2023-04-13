import {RFValue} from 'react-native-responsive-fontsize'

import styled from 'styled-components/native'

interface ITermsScreenProps {
  isBold?: boolean
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
  align-items: center;
`

export const ScrollView = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`

export const ViewHeader = styled.View`
  width: 100%;
  padding: 0 16px;
`
export const Title = styled.Text<ITermsScreenProps>`
  color: ${({theme}) => theme.colors.text_light};
  font-size: ${RFValue(20)}px;
  line-height: ${RFValue(24)}px;
  padding-bottom: ${RFValue(20)}px;

  font-family: ${({theme}) => theme.fonts.bold};
`
export const SubTitle = styled.Text<ITermsScreenProps>`
  color: ${({theme}) => theme.colors.text_light};
  font-size: ${RFValue(18)}px;
  line-height: ${RFValue(24)}px;

  font-family: ${({theme}) => theme.fonts.regular};
`

export const ViewFooter = styled.View`
  width: 100%;

  padding: 0 ${RFValue(16)}px;
  margin-bottom: ${RFValue(24)}px;
`

export const ViewCheckbox = styled.View`
  width: 90%;
  flex-direction: row;
  margin-bottom: ${RFValue(20)}px;
`

export const AgreeText = styled.Text`
  color: ${({theme}) => theme.colors.text_light};
  padding: 0 10px;
  font-size: ${RFValue(16)}px;
  line-height: 18px;

  font-family: ${({theme}) => theme.fonts.regular};
`
export const AgreeTextLink = styled.Text`
  color: ${({theme}) => theme.colors.text_light};
  padding: 0 10px;
  font-size: ${RFValue(16)}px;
  line-height: 18px;

  font-family: ${({theme}) => theme.fonts.extra_bold};
  text-decoration: underline;
  text-decoration-color: ${({theme}) => theme.colors.text_light};
`
