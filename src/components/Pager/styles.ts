import {RFValue} from 'react-native-responsive-fontsize'

import styled from 'styled-components/native'

interface IPodcastProps {
  color?: string
}

export const Container = styled.View`
  flex: 1;

  background: #f6f6f6;
  border-radius: ${RFValue(16)}px;

  margin: ${RFValue(10)}px 0;
  padding: ${RFValue(16)}px;
`

export const ViewArticles = styled.View`
  justify-content: center;
  flex: 1;
`
export const Title = styled.Text`
  color: #535353;
  font-size: ${RFValue(16)}px;
  font-family: ${({theme}) => theme.fonts.bold};
`
export const Text = styled.Text`
  color: #7f7f7f;
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.regular};
`
export const Read = styled.Text`
  color: #ad9be6;
  font-size: ${RFValue(12)}px;
  font-family: ${({theme}) => theme.fonts.extra_bold};
  text-decoration: underline;
  width: 100%;
  text-align: right;
`
