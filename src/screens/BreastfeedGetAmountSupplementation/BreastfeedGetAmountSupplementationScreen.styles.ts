import {TextInput} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'

import styled from 'styled-components/native'

export const ScrollView = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`

export const Container = styled.View`
  flex: 1;
  padding: 0 ${RFValue(20)}px;
  align-items: center;
  width: 100%;
`

export const HeaderView = styled.View`
  align-items: flex-end;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;

  margin-top: ${RFValue(20)}px;
`

export const GoBackView = styled.View`
  align-items: center;
  justify-content: center;

  background-color: #fff;
  border-radius: 10px;
  margin-top: 10px;
`
export const TitleView = styled.View`
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  flex-direction: row;
  margin-top: ${RFValue(20)}px;
`
export const Title = styled.Text`
  text-align: left;
  margin: ${RFValue(10)}px;

  color: ${({theme}) => theme.colors.text_light};
  font-size: ${RFValue(24)}px;
  font-family: ${({theme}) => theme.fonts.extra_bold};
`

export const BoxView = styled.View`
  width: 100%;
  padding: ${RFValue(24)}px;
  background-color: ${({theme}) => theme.colors.blue};
  border-radius: ${RFValue(16)}px;
  margin: ${RFValue(24)}px 0;
`
export const BoxNumberText = styled.Text`
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: ${RFValue(12)}px;
  color: ${({theme}) => theme.colors.text_light};
  text-align: left;
  margin: 8px 0 0;
  width: 100%;
`

export const BoxText = styled.Text`
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: ${RFValue(16)}px;
  color: ${({theme}) => theme.colors.text_light};
  text-align: left;
  margin: 8px 0 20px;
  width: 100%;
`

export const ButtonView = styled.View`
  width: 100%;
  margin-bottom: ${RFValue(24)}px;
  flex: 1;
  justify-content: flex-end;
`

export const QuantityView = styled.View`
  width: 100%;
  margin-bottom: ${RFValue(8)}px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

export const QuantityTextInput = styled(TextInput).attrs({
  placeholderTextColor: '#fff',
})`
  width: 65px;
  padding: 4px 18px;

  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;

  background-color: ${({theme}) => theme.colors.primary};
  color: ${({theme}) => theme.colors.text_light};

  border-radius: 5px;
  text-align: center;
`

export const QuantityText = styled.Text`
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.text_light};
  text-align: left;
  width: 100%;
  padding-left: 10px;
`

export const EachText = styled.Text`
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: ${RFValue(16)}px;
  color: ${({theme}) => theme.colors.text_light};
  text-align: left;
  margin: 8px 0;
  width: 100%;
`
