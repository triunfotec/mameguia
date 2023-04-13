import {RFValue} from 'react-native-responsive-fontsize'

import styled from 'styled-components/native'

export interface IHomeProps {
  color?: string
  backgroundColor?: string
  borderColor?: string
  isSocial?: boolean
  height?: number
  disabled?: boolean
}

export const ScrollView = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`
export const ContainerScrollView = styled.View`
  width: 100%;
  flex: 1;
`
export const ContentScrollView = styled.View`
  width: 100%;
  flex-direction: column;
  margin-bottom: ${RFValue(10)}px;
`

export const Container = styled.View`
  flex: 1;
  padding: 0 ${RFValue(20)}px;
  align-items: center;
`
export const HeaderView = styled.View`
  align-items: flex-start;
  width: 100%;
  flex-direction: row;

  margin-top: ${RFValue(10)}px;
`

export const GoBackView = styled.View`
  align-items: center;
  justify-content: center;
`
export const Title = styled.Text<IHomeProps>`
  font-family: ${({theme}) => theme.fonts.extra_bold};
  font-size: ${RFValue(40)}px;
  color: ${({color}) => color};
  text-align: left;
  margin: 20px 0 0;
  width: 100%;
`
export const Title2 = styled.Text<IHomeProps>`
  font-family: ${({theme}) => theme.fonts.extra_bold};
  font-size: ${RFValue(28)}px;
  color: ${({color}) => color};
  text-align: left;
  margin: 0;
  width: 100%;
`

export const SubTitle = styled.Text<IHomeProps>`
  font-family: ${({theme}) => theme.fonts.extra_bold};
  font-size: ${RFValue(20)}px;
  color: ${({color}) => color};
  text-align: left;
  width: 100%;
  margin: 20px 0 0;
`
export const Description = styled.Text<IHomeProps>`
  font-family: ${({theme}) => theme.fonts.medium};
  font-size: ${RFValue(18)}px;
  color: ${({color}) => color};
  margin: 10px 0 10px;
  width: 100%;
`

export const TitleTest = styled.Text<IHomeProps>`
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: ${RFValue(20)}px;
  color: ${({color}) => color};
  margin: 10px 0;
`
export const SubTitleTest = styled.Text<IHomeProps>`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;
  color: ${({color}) => color};
  margin: 0 0 ${RFValue(30)}px;
`
