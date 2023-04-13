import {RFValue} from 'react-native-responsive-fontsize'

import styled from 'styled-components/native'

type TModalConfirmAction = {
  backgroundColor?: string
  color?: string
}

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

export const ButtonModalView = styled.View<TModalConfirmAction>`
  background-color: ${({backgroundColor}) => backgroundColor};
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
