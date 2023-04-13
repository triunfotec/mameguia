import {RFValue} from 'react-native-responsive-fontsize'

import styled from 'styled-components/native'

interface IIntroductionScreenProps {
  isBold?: boolean
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
  flex-direction: column;
  justify-content: center;
  padding: ${RFValue(20)}px ${RFValue(20)}px;
`

export const Header = styled.View`
  flex: 1;
  margin-top: ${RFValue(22)}px;

  justify-content: flex-end;
  align-items: center;
`
export const Footer = styled.View`
  flex: 1;
  border-radius: ${RFValue(24)}px;

  margin-top: ${RFValue(-22)}px;
`

export const ViewText = styled.View`
  width: 85%;
  justify-content: center;
  align-items: center;
`

export const Text = styled.Text<IIntroductionScreenProps>`
  color: ${({theme}) => theme.colors.text_light};
  text-align: center;
  font-size: ${RFValue(18)}px;

  font-family: ${({theme, isBold}) =>
    isBold ? theme.fonts.extra_bold : theme.fonts.regular};
`
export const Description = styled.Text<IIntroductionScreenProps>`
  color: ${({theme}) => theme.colors.text_light};
  text-align: center;
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.regular};
`

export const ViewButton = styled.View`
  width: 100%;
  margin-top: ${RFValue(30)}px;
`
