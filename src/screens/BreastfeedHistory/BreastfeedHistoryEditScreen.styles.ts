import {TextInputMask} from 'react-native-masked-text'
import {RFValue} from 'react-native-responsive-fontsize'

import styled from 'styled-components/native'

interface IBreastfeedHistoryEdit {
  backgroundColor?: string
  color?: string
  selected?: boolean
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
  align-items: center;
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
export const SubTitle = styled.Text`
  text-align: left;
  margin: ${RFValue(24)}px 0;

  color: ${({theme}) => theme.colors.text_light};
  font-size: ${RFValue(18)}px;
  font-family: ${({theme}) => theme.fonts.extra_bold};
  width: 100%;
`
export const BoxView = styled.View<IBreastfeedHistoryEdit>`
  width: 100%;
  padding: ${RFValue(0)}px ${RFValue(24)}px;
  background-color: ${({backgroundColor}) => backgroundColor};
  border-radius: ${RFValue(16)}px;

  align-items: center;
`
export const BoxText = styled.Text<IBreastfeedHistoryEdit>`
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: ${RFValue(14)}px;
  color: ${({color}) => color};
  text-align: center;
  width: 100%;
`
export const BoxBreast = styled.View<IBreastfeedHistoryEdit>`
  flex-direction: row;
  background-color: ${({theme}) => theme.colors.blue};
  padding: ${RFValue(10)}px 30px;
  border-radius: ${RFValue(10)}px;
  justify-content: center;
  align-items: center;
  opacity: ${({selected}) => (selected ? 1 : 0.6)};
  max-width: 125px;
  margin: ${RFValue(16)}px 0;
`
export const BoxBreastTextView = styled.View`
  flex-direction: column;
`
export const BreastSideText = styled.Text`
  color: ${({theme}) => theme.colors.text_light};
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: ${RFValue(13)}px;
  margin-left: ${RFValue(8)}px;
  width: 100%;
`

export const BoxDate = styled.View`
  background-color: ${({theme}) => theme.colors.secondary_dark};
  width: 100%;
  padding: 16px;
  border-radius: 10px;
`
export const Text = styled.Text`
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: ${RFValue(16)}px;
  color: ${({theme}) => theme.colors.text_light};
  margin: 8px 0;
  width: 100%;
`
export const BoxEdit = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.secondary};
  width: 100%;
  padding: 16px;
  border-radius: 10px;
`
export const BoxButton = styled.View`
  flex: 1;
  width: 100%;
`
export const ButtonView = styled.View`
  flex: 1;
  width: 100%;
  margin: ${RFValue(8)}px 0;
`
export const ViewInput = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  margin-bottom: ${RFValue(24)}px;
`
export const ContainerMask = styled<any>(TextInputMask)`
  width: 60px;
  height: 32px;
  text-align: center;
  margin-right: ${RFValue(8)}px;

  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;

  background-color: ${({theme}) => theme.colors.secondary_dark};
  color: ${({theme}) => theme.colors.text_light};

  border-radius: 5px;
`
