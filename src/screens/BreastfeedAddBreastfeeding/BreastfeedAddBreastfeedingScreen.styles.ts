import {RFValue} from 'react-native-responsive-fontsize'

import styled from 'styled-components/native'

interface IBreastfeedAddBreastfeeding {
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

export const Container = styled.View`
  flex: 1;
  padding: 0 ${RFValue(20)}px;
  align-items: center;
  width: 100%;
`

export const HeaderView = styled.View<IBreastfeedAddBreastfeeding>`
  align-items: flex-end;
  width: 100%;
  flex-direction: row;
  justify-content: ${({hasBreastfeeds}) =>
    hasBreastfeeds ? 'space-between' : 'center'};

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

export const SubTitle = styled.Text`
  text-align: left;
  margin: ${RFValue(10)}px 0;

  color: ${({theme}) => theme.colors.text_light};
  font-size: ${RFValue(18)}px;
  font-family: ${({theme}) => theme.fonts.extra_bold};
  width: 100%;
`

export const ButtonView = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: ${RFValue(20)}px;
  background-color: ${({theme}) => theme.colors.text_light};
  border-radius: ${RFValue(30)}px;
  padding: ${RFValue(10)}px;
`

export const PlusText = styled.Text`
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: ${RFValue(16)}px;
  color: ${({theme}) => theme.colors.text_light};
  text-align: center;
  margin: 8px 0;
  width: 100%;
`
export const ButtonNewChildView = styled.View`
  width: 100%;
  margin: ${RFValue(44)}px 0;
`
export const ViewButton = styled.View`
  margin: ${RFValue(24)}px 0 0;
  width: 100%;
`
