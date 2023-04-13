import {RFValue} from 'react-native-responsive-fontsize'

import styled from 'styled-components/native'

export const ScrollView = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`
export const ContainerScrollView = styled.View`
  width: 100%;
  flex: 1;
`
export const ContentScrollView = styled.View`
  width: 100%;
  flex-direction: column;
  margin-bottom: ${RFValue(10)}px;
`
export const Container = styled.View`
  flex: 1;
`

export const Content = styled.View`
  flex: 1;
  padding: 0 ${RFValue(20)}px;
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
export const TitleView = styled.View`
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  flex-direction: row;
`
export const Title = styled.Text`
  width: 100%;
  text-align: left;

  color: ${({theme}) => theme.colors.primary};
  font-size: ${RFValue(22)}px;
  font-family: ${({theme}) => theme.fonts.extra_bold};
  padding-left: ${RFValue(8)}px;
  margin: ${RFValue(8)}px 0;
`

export const ButtonView = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: ${RFValue(20)}px;
  background-color: ${({theme}) => theme.colors.primary};
  border-radius: ${RFValue(30)}px;
  padding: ${RFValue(10)}px;
  flex-direction: row;
`

export const PlusText = styled.Text`
  color: ${({theme}) => theme.colors.text_light};
  font-size: ${RFValue(16)}px;
  font-family: ${({theme}) => theme.fonts.bold};

  margin: ${RFValue(8)}px;
`

export const HistoricView = styled.View`
  margin: ${RFValue(32)}px 0;
`
export const BoxFertileCycleView = styled.View`
  background-color: ${({theme}) => theme.colors.text_light};
  border-radius: ${RFValue(16)}px;
  padding: ${RFValue(16)}px ${RFValue(10)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${RFValue(16)}px;
`

export const FertileCycleText = styled.Text`
  color: ${({theme}) => theme.colors.primary};
  font-size: ${RFValue(16)}px;
  font-family: ${({theme}) => theme.fonts.extra_bold};
  text-align: center;
  flex: 1;
`
