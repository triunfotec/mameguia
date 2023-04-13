import {RFValue} from 'react-native-responsive-fontsize'

import styled from 'styled-components/native'

export const ViewModal = styled.View`
  width: 100%;
  height: 100%;
`
export const Container = styled.View`
  flex: 1;
  padding: ${RFValue(20)}px;
  width: 90%;

  background-color: #fff;
  border-radius: 10px;

  margin-top: 20px;
  margin-left: 5%;
  margin-bottom: 12px;
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
  margin-left: 8px;
  margin: 20px 0;
`
export const AnswerText = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;
  color: ${({theme}) => theme.colors.text_dark};
  margin-bottom: 20px;
  flex: 1;
`

export const ButtonsView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #000;
`
