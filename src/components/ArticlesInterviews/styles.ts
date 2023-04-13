import {RFValue} from 'react-native-responsive-fontsize'

import styled from 'styled-components/native'

interface IArticleProps {
  color?: string
  isAnotherResponsible?: boolean
}

export const Container = styled.View<IArticleProps>`
  background: ${({isAnotherResponsible}) =>
    isAnotherResponsible ? '#535353' : '#f6f6f6'};
  border-radius: ${RFValue(16)}px;

  margin: ${RFValue(10)}px 0;
  padding: ${RFValue(16)}px;
  width: 100%;
`

export const ViewArticles = styled.View`
  justify-content: center;
`
export const Title = styled.Text<IArticleProps>`
  color: ${({isAnotherResponsible}) =>
    isAnotherResponsible ? '#fff' : '#535353'};
  font-size: ${RFValue(16)}px;
  font-family: ${({theme}) => theme.fonts.bold};
`
export const Text = styled.Text<IArticleProps>`
  color: #7f7f7f;
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.regular};
`
export const Read = styled.Text`
  color: #ad9be6;
  font-size: ${RFValue(12)}px;
  font-family: ${({theme}) => theme.fonts.extra_bold};
  text-decoration: underline;
  text-decoration-color: #ad9be6;
  width: 100%;
  text-align: right;
  margin-top: ${RFValue(10)}px;
`
