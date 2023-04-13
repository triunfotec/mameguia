import {RFValue} from 'react-native-responsive-fontsize'

import styled from 'styled-components/native'

interface IWeekDescriptionProps {
  color?: string
  backgroundColor?: string
  borderColor?: string
  isSocial?: boolean
  height?: number
  disabled?: boolean
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
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;

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
  /* margin-top: ${RFValue(20)}px; */
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
  padding: 10px 10px 20px;
  border-radius: 10px;
  width: 100%;
`
export const GoBackAllWeeksView = styled.View`
  align-items: center;
  justify-content: flex-start;

  flex-direction: row;
  background-color: #fff;
  border-radius: 10px;
  margin-top: 10px;
`
export const AllWeeksText = styled.Text`
  color: ${({theme}) => theme.colors.primary};
  font-size: ${RFValue(16)}px;
  font-family: ${({theme}) => theme.fonts.regular};
`
export const WeekText = styled.Text`
  text-align: left;
  width: 100%;
  margin: ${RFValue(10)}px;

  color: ${({theme}) => theme.colors.primary};
  font-size: ${RFValue(40)}px;
  font-family: ${({theme}) => theme.fonts.bold};
`
export const WeekSubtitleText = styled.Text`
  text-align: left;
  width: 100%;
  margin: ${RFValue(10)}px;

  color: ${({theme}) => theme.colors.text_dark};
  font-size: ${RFValue(22)}px;
  font-family: ${({theme}) => theme.fonts.bold};
`
export const WeekParagraphText = styled.Text`
  text-align: left;
  width: 100%;
  padding: 0 ${RFValue(10)}px;

  color: ${({theme}) => theme.colors.dark_grey};
  font-size: ${RFValue(16)}px;
  font-family: ${({theme}) => theme.fonts.medium};
  margin: ${RFValue(10)}px 0 0;
`

export const ButtonSaveView = styled.View`
  width: 100%;
  margin: ${RFValue(24)}px 0;
`
export const ImageView = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`

export const WeekImage = styled.Image.attrs({
  resizeMode: 'contain',
})`
  margin: ${RFValue(8)}px 0;
  width: 100%;
  height: 260px;
`
