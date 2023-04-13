import {RFPercentage, RFValue} from 'react-native-responsive-fontsize'

import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  padding: ${RFValue(20)}px;
  width: 90%;

  background-color: #fff;
  border-radius: 10px;

  margin-top: ${RFValue(20)}px;
  margin-left: 5%;
  margin-bottom: ${RFValue(20)}px;
`
export const ScrollView = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-bottom: 20px;
`
export const CorrectView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
`

export const CorrectText = styled.Text`
  font-family: ${({theme}) => theme.fonts.extra_bold};
  font-size: ${RFValue(32)}px;
  color: ${({theme}) => theme.colors.text_dark};
  margin-left: 8px;
`

export const QuestionText = styled.Text`
  font-family: ${({theme}) => theme.fonts.extra_bold};
  font-size: ${RFValue(16)}px;
  color: ${({theme}) => theme.colors.text_dark};
  margin: 20px 0 8px 0;
`
export const AnswerText = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;
  color: ${({theme}) => theme.colors.text_dark};
  margin-bottom: 20px;
  flex: 1;
`
