import {RFPercentage, RFValue} from 'react-native-responsive-fontsize'

import styled from 'styled-components/native'

interface IQuizResultProps {
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
  padding: 0 ${RFValue(20)}px;
  align-items: center;
  margin-bottom: ${RFValue(20)}px;
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

export const SituationText = styled.Text<IQuizResultProps>`
  font-family: ${({theme}) => theme.fonts.extra_bold};
  font-size: ${RFValue(14)}px;
  color: ${({color}) => color};
  text-align: center;
  margin: 20px 0 0;
  border: 2px solid ${({color}) => color};
  border-radius: ${RFValue(16)}px;
  padding: 5px 10px;
`

export const ClassificationText = styled.Text<IQuizResultProps>`
  font-family: ${({theme}) => theme.fonts.extra_bold};
  font-size: ${RFValue(40)}px;
  color: ${({color}) => color};
  text-align: center;
  margin: 20px 0 0;
`
export const PercentView = styled.View<IQuizResultProps>`
  border: solid 4px ${({borderColor}) => borderColor};
  width: ${RFValue(200)}px;
  height: ${RFValue(200)}px;
  border-radius: ${RFValue(100)}px;
  align-items: center;
  justify-content: center;
  margin-top: ${RFValue(20)}px;
`
export const PercentBoxView = styled.View`
  flex-direction: row;
  align-items: center;
`
export const PercentText = styled.Text<IQuizResultProps>`
  font-family: ${({theme}) => theme.fonts.extra_bold};
  font-size: ${RFValue(70)}px;
  color: ${({color}) => color};
`
export const PercentSymbolText = styled.Text<IQuizResultProps>`
  font-family: ${({theme}) => theme.fonts.extra_bold};
  font-size: ${RFValue(40)}px;
  color: ${({color}) => color};
`
export const QuantityText = styled.Text<IQuizResultProps>`
  font-family: ${({theme}) => theme.fonts.extra_bold};
  font-size: ${RFValue(14)}px;
  color: ${({color}) => color};
  border: 2px solid ${({color}) => color};
  border-radius: ${RFValue(16)}px;
  padding: 5px 10px;
`

export const RetakeText = styled.Text<IQuizResultProps>`
  margin-top: ${RFValue(20)}px;
  font-family: ${({theme}) => theme.fonts.extra_bold};
  font-size: ${RFValue(18)}px;
  color: ${({color}) => color};
  text-decoration: underline;
  text-decoration-color: ${({color}) => color};
`

export const YourResponseText = styled.Text<IQuizResultProps>`
  font-family: ${({theme}) => theme.fonts.extra_bold};
  font-size: ${RFValue(20)}px;
  color: ${({color}) => color};
  margin-top: ${RFValue(20)}px;
`
export const BoxResponseView = styled.View<IQuizResultProps>`
  width: 100%;
  background-color: ${({backgroundColor}) => backgroundColor};
  border-radius: ${RFValue(24)}px;
  align-items: flex-start;
  justify-content: center;
  margin-top: ${RFValue(20)}px;
  padding: 30px 20px 0;
  flex: 1;
`
export const QuestionText = styled.Text<IQuizResultProps>`
  font-family: ${({theme}) => theme.fonts.extra_bold};
  font-size: ${RFValue(16)}px;
  color: ${({color}) => color};
  margin-left: 8px;
  margin: 20px 0;
`
export const AnswerText = styled.Text<IQuizResultProps>`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;
  color: ${({color}) => color};
  margin-bottom: 20px;
`

export const ButtonsView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 40px;
  border: 1px solid #fff;
  border-radius: ${RFValue(30)}px;
`

export const ButtonText = styled.Text<IQuizResultProps>`
  font-family: ${({theme}) => theme.fonts.extra_bold};
  font-size: ${RFValue(14)}px;
  color: ${({color}) => color};
  padding: 12px 0;
`
