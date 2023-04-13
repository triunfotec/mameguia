import {RFValue} from 'react-native-responsive-fontsize'

import styled from 'styled-components/native'

interface IChooseWeekProps {
  color?: string
  backgroundColor?: string
  borderColor?: string
  isSocial?: boolean
  height?: number
  disabled?: boolean
  fontSize?: number
}

interface IPickerNumberOptionWrapperViewProps {
  opacity: number
  selected: boolean
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
  flex: 1;
  align-items: flex-start;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;

  margin-top: ${RFValue(16)}px;
`

export const HeaderSimpleView = styled.View`
  flex: 1;
  align-items: center;
  width: 100%;
  flex-direction: row;
  justify-content: center;

  margin-top: ${RFValue(16)}px;
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
  margin-top: ${RFValue(24)}px;
`
export const Title = styled.Text`
  text-align: left;
  margin: 0 ${RFValue(10)}px;

  color: ${({theme}) => theme.colors.text_light};
  font-size: ${RFValue(24)}px;
  font-family: ${({theme}) => theme.fonts.extra_bold};
`
export const BoxView = styled.View<IChooseWeekProps>`
  width: 100%;
  padding: ${RFValue(24)}px;
  background-color: ${({backgroundColor}) => backgroundColor};
  border-radius: ${RFValue(16)}px;
  margin-top: ${RFValue(24)}px;
`

export const BoxText = styled.Text<IChooseWeekProps>`
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: ${RFValue(20)}px;
  color: ${({color}) => color};
  text-align: left;
  margin: 8px 0 0;
  width: 100%;
`
export const PickerNumberView = styled.View`
  padding: 10px 0;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

export const PickerNumberWrapperVerticalView = styled.View`
  width: ${RFValue(250)}px;
  height: ${RFValue(250)}px;
  justify-content: center;
  align-items: center;
`
export const PickerNumberOptionWrapperView = styled.View<IPickerNumberOptionWrapperViewProps>`
  justify-content: center;
  align-items: center;
  margin: 0 0 10px;
  padding: 10px 30px;
  height: ${RFValue(60)}px;
  border: solid 2px;
  border-radius: 30px;
  opacity: ${({opacity}) => opacity};
  border-color: ${({selected}) => (selected ? '#fff' : 'transparent')};
  width: ${RFValue(190)}px;
`

export const PickerNumber = styled.Text<IChooseWeekProps>`
  font-family: ${({theme}) => theme.fonts.extra_bold};
  font-size: ${({fontSize}) => RFValue(fontSize ? fontSize : 30)}px;
  color: ${({theme}) => theme.colors.secondary_light};
`

export const MouthText = styled.Text`
  color: ${({theme}) => theme.colors.text_light};
  font-size: ${RFValue(20)}px;
  font-family: ${({theme}) => theme.fonts.extra_bold};
  margin: ${RFValue(12)}px 0;
`

export const ChooseDayText = styled.Text`
  color: ${({theme}) => theme.colors.text_light};
  font-size: ${RFValue(20)}px;
  font-family: ${({theme}) => theme.fonts.extra_bold};
  margin: ${RFValue(12)}px 0;
`
