import {RFValue} from 'react-native-responsive-fontsize'

import styled from 'styled-components/native'

export const ScrollView = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`
export const Content = styled.View`
  flex: 1;
  padding: 0 ${RFValue(20)}px;
  background-color: #fff;
  margin-bottom: ${RFValue(10)}px;
`
export const HeaderView = styled.View`
  align-items: flex-end;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;

  margin: ${RFValue(20)}px 0;
`

export const GoBackView = styled.View`
  align-items: center;
  justify-content: center;

  background-color: #fff;
  border-radius: 10px;
  margin-top: 10px;
`
export const Title = styled.Text`
  width: 100%;
  text-align: left;

  color: ${({theme}) => theme.colors.blue};
  font-size: ${RFValue(20)}px;
  font-family: ${({theme}) => theme.fonts.bold};

  margin: ${RFValue(8)}px 0;
`
export const ButtonView = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;

  margin: ${RFValue(44)}px 0;
`
export const ViewInputPassword = styled.View`
  width: 100%;
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
`
export const Error = styled.Text`
  width: 100%;
  height: 30px;
  text-align: center;
  color: ${({theme}) => theme.colors.attention};
  line-height: 30px;
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.regular};
`
export const RadioView = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`
