import {RFValue} from 'react-native-responsive-fontsize'

import styled from 'styled-components/native'

interface IBreastfeedStartBreastfeeding {
  backgroundColor?: string
  color?: string
  selected?: boolean
  hasBreastfeeds?: boolean
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
export const HeaderView = styled.View<IBreastfeedStartBreastfeeding>`
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
export const BoxView = styled.View<IBreastfeedStartBreastfeeding>`
  width: 100%;
  padding: ${RFValue(16)}px ${RFValue(24)}px;
  background-color: ${({backgroundColor}) => backgroundColor};
  border-radius: ${RFValue(16)}px;
  margin: ${RFValue(8)}px 0;
`
export const SubTitleText = styled.Text`
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: ${RFValue(16)}px;
  color: ${({theme}) => theme.colors.text_light};
  text-align: left;
  margin: 8px 0 0;
  width: 100%;
`

export const BoxText = styled.Text<IBreastfeedStartBreastfeeding>`
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: ${RFValue(14)}px;
  color: ${({color}) => color};
  text-align: left;
  width: 100%;
`

export const ButtonView = styled.View`
  width: 100%;
  margin: ${RFValue(22)}px 0;
  justify-content: space-between;
  height: 140px;
`
export const ChildrenView = styled.View`
  flex: 1;
  margin-bottom: ${RFValue(24)}px;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
`
export const BoxChildrenView = styled.View`
  width: 100%;
  margin: ${RFValue(16)}px 0 0;
`

export const ChildDeleteView = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
`
export const ChildDeleteText = styled.Text`
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: ${RFValue(13)}px;
  color: ${({theme}) => theme.colors.text_dark};
  text-align: center;
`

export const RadioView = styled.View`
  flex: 1;
`
export const BoxChooseBreast = styled.View`
  flex-direction: row;
  margin-top: ${RFValue(16)}px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
export const BoxBreast = styled.View<IBreastfeedStartBreastfeeding>`
  flex-direction: row;
  background-color: ${({theme}) => theme.colors.blue};
  padding: ${RFValue(10)}px 30px;
  border-radius: ${RFValue(10)}px;
  justify-content: center;
  align-items: center;
  opacity: ${({selected}) => (selected ? 1 : 0.6)};
  max-width: 125px;
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
export const ViewButton = styled.View`
  margin: ${RFValue(24)}px 0 0;
  width: 100%;
`
