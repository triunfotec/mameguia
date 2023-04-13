import {RFValue} from 'react-native-responsive-fontsize'

import styled from 'styled-components/native'

export const ScrollView = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  background-color: #fff;
`

export const Container = styled.View`
  flex: 1;
  background-color: #000;
`
export const Content = styled.View`
  flex: 1;
  padding: 0 ${RFValue(20)}px;
  align-items: flex-start;
  background-color: #fff;
  margin-bottom: ${RFValue(10)}px;
`
export const HeaderView = styled.View`
  align-items: flex-end;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;

  margin: ${RFValue(20)}px 0;
  padding: 0 ${RFValue(20)}px;
`

export const GoBackView = styled.View`
  align-items: center;
  justify-content: center;

  background-color: #fff;
  border-radius: 10px;
  margin-top: 10px;
`
export const TitleView = styled.View`
  padding: ${RFValue(20)}px ${RFValue(20)}px;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  flex-direction: row;
`
export const Title = styled.Text`
  text-align: left;
  margin: ${RFValue(10)}px;

  color: ${({theme}) => theme.colors.text_light};
  font-size: ${RFValue(24)}px;
  font-family: ${({theme}) => theme.fonts.extra_bold};
`
