import {RFValue} from 'react-native-responsive-fontsize'

import styled from 'styled-components/native'

interface IWeekProps {
  weekActual?: boolean
}

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
  padding: 0 ${RFValue(20)}px;
  align-items: center;
  width: 100%;
`

export const HeaderView = styled.View`
  align-items: flex-start;
  width: 100%;
  flex-direction: row;
  justify-content: center;

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
  text-align: left;
  margin: ${RFValue(10)}px;

  color: ${({theme}) => theme.colors.text_light};
  font-size: ${RFValue(24)}px;
  font-family: ${({theme}) => theme.fonts.extra_bold};
`

export const BoxWeekView = styled.View`
  background-color: ${({theme}) => theme.colors.text_light};
  margin: ${RFValue(24)}px 0;
  padding: 10px 16px;
  border-radius: 10px;
  width: 100%;
`

export const BoxGoToWeekDescriptionView = styled.View<IWeekProps>`
  width: 100%;
  background-color: ${({theme, weekActual}) =>
    weekActual ? theme.colors.primary : theme.colors.text_light};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  padding: 0 8px;
  margin: 8px 0;
  border-color: ${({theme}) => theme.colors.primary};
  border-width: 1px;
`

export const WeekText = styled.Text<IWeekProps>`
  text-align: left;
  flex: 1;
  padding: 16px 0;
  color: ${({theme, weekActual}) =>
    weekActual ? theme.colors.text_light : theme.colors.primary};
  font-size: ${RFValue(16)}px;
  font-family: ${({theme}) => theme.fonts.extra_bold};
`

export const ButtonDeleteWeekView = styled.View`
  width: 100%;
  margin: ${RFValue(16)}px 0;
`

export const ViewModal = styled.View`
  width: 100%;
  padding: ${RFValue(16)}px;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.text_light};
  border-radius: 20px;
`
export const ButtonCloseView = styled.View`
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  padding: 10px 0;
`
export const ModalAskText = styled.Text`
  text-align: left;
  padding: 16px 0;
  color: ${({theme}) => theme.colors.dark_grey};
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.extra_bold};
`
export const ButtonsView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: ${RFValue(16)}px 0;
`

export const ButtonView = styled.View`
  background-color: ${({theme}) => theme.colors.primary};
  padding: 18px 0;
  width: 120px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
`
export const ButtonText = styled.Text`
  color: ${({theme}) => theme.colors.text_light};
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.extra_bold};
`
