import {RFValue} from 'react-native-responsive-fontsize'

import styled from 'styled-components/native'

interface IBreastfeedEndBreastfeeding {
  backgroundColor?: string
  color?: string
  selected?: boolean
}

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
export const BoxView = styled.View<IBreastfeedEndBreastfeeding>`
  width: 100%;
  padding: ${RFValue(16)}px ${RFValue(24)}px;
  background-color: ${({backgroundColor}) => backgroundColor};
  border-radius: ${RFValue(16)}px;
  margin: ${RFValue(8)}px 0;
  align-items: center;
`
export const SubTitleText = styled.Text`
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: ${RFValue(16)}px;
  color: ${({theme}) => theme.colors.text_light};
  text-align: left;
  margin: 8px 0 0;
  width: 100%;
`

export const BoxText = styled.Text<IBreastfeedEndBreastfeeding>`
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: ${RFValue(14)}px;
  color: ${({color}) => color};
  text-align: center;
  width: 100%;
`
export const BoxBreast = styled.View<IBreastfeedEndBreastfeeding>`
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
export const BoxTimeView = styled.View`
  width: 100%;
  padding: ${RFValue(16)}px;

  margin: ${RFValue(8)}px 0;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`
export const BoxTimeText = styled.Text`
  color: ${({theme}) => theme.colors.text_light};
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: ${RFValue(32)}px;
`
export const ButtonView = styled.View`
  width: 100%;
  margin: ${RFValue(44)}px 0;
`
export const ViewButton = styled.View`
  margin: ${RFValue(24)}px 0 0;
  width: 100%;
`
