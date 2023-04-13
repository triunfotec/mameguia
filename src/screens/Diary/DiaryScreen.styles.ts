import {RFPercentage, RFValue} from 'react-native-responsive-fontsize'

import styled from 'styled-components/native'

interface ITestProps {
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
  background-color: #fff;
`

export const Container = styled.View`
  flex: 1;
  padding: 0 ${RFValue(20)}px;
  align-items: flex-start;
  background-color: #fff;
  margin-bottom: ${RFValue(10)}px;
`
export const ViewLogo = styled.View`
  flex: 1;
  align-items: center;
  width: 100%;

  margin-top: ${RFValue(20)}px;
`
export const Title = styled.Text`
  width: 100%;
  text-align: left;

  color: ${({theme}) => theme.colors.secondary};
  font-size: ${RFValue(40)}px;
  font-family: ${({theme}) => theme.fonts.extra_bold};

  margin: ${RFValue(8)}px 0;
`

export const Box = styled.View<ITestProps>`
  width: 100%;

  background-color: ${({backgroundColor}) => backgroundColor};
  border-radius: 16px;
  padding: 40px 16px;

  margin-bottom: ${RFValue(10)}px;
  margin-top: ${RFValue(10)}px;
`

export const BoxTitle = styled.Text<ITestProps>`
  width: 100%;

  color: ${({color}) => color};
  font-size: ${RFValue(20)}px;
  font-family: ${({theme}) => theme.fonts.extra_bold};
`
export const BoxDescription = styled.Text<ITestProps>`
  width: 100%;

  color: ${({color}) => color};
  font-size: ${RFValue(16)}px;
  font-family: ${({theme}) => theme.fonts.regular};

  margin: ${RFValue(5)}px 0 ${RFValue(20)}px;
`
