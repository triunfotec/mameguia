import {RFPercentage, RFValue} from 'react-native-responsive-fontsize'

import styled from 'styled-components/native'

interface IQuizProps {
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

export const Container = styled.View`
  flex: 1;
  padding: 0 ${RFValue(20)}px ${RFValue(44)}px;
  align-items: center;
`
export const HeaderView = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  flex: 1;
  margin: 20px 0 0 0;
  width: 100%;
`

export const ButtonCloseView = styled.View`
  justify-content: flex-end;
  align-items: flex-end;
  width: 18%;
`

export const TitleView = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 20px 0 0 0;
  padding-left: 20px;
`
export const TitleText = styled.Text<IQuizProps>`
  font-family: ${({theme}) => theme.fonts.extra_bold};
  font-size: ${RFValue(24)}px;
  color: ${({color}) => color};
  text-align: left;
  margin-left: 8px;
  width: 100%;
`

export const QuestionView = styled.View<IQuizProps>`
  width: 100%;
  padding: ${RFValue(24)}px;
  background-color: ${({backgroundColor}) => backgroundColor};
  border-radius: ${RFValue(16)}px;
  margin-top: ${RFValue(24)}px;
`
export const QuestionActualNumber = styled.Text<IQuizProps>`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({color}) => color};
  text-align: left;
  margin: 8px 0 0;
  width: 100%;
`
export const QuestionText = styled.Text<IQuizProps>`
  font-family: ${({theme}) => theme.fonts.extra_bold};
  font-size: ${RFValue(24)}px;
  color: ${({color}) => color};
  text-align: left;
  margin: 8px 0 0;
  width: 100%;
`

export const AnswerView = styled.View<IQuizProps>`
  width: 100%;
  margin-top: ${RFValue(24)}px;
`
