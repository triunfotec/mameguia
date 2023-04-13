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
export const SubTitle = styled.Text`
  text-align: left;
  margin: ${RFValue(24)}px 0;

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
  width: ${RFValue(44)}px;
  height: ${RFValue(44)}px; ;
`

export const PlusText = styled.Text`
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: ${RFValue(16)}px;
  color: ${({theme}) => theme.colors.text_light};
  text-align: center;
  margin: 8px 0;
  width: 100%;
`
export const TitleDateView = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
export const TitleDateText = styled.Text`
  text-align: center;
  margin: ${RFValue(10)}px 0;

  color: ${({theme}) => theme.colors.text_light};
  font-size: ${RFValue(20)}px;
  font-family: ${({theme}) => theme.fonts.extra_bold};
  padding: 0;
  width: 65%;
`

export const BoxBreastfeedingView = styled.View`
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.blue};
  border-radius: ${RFValue(30)}px;
  margin-top: ${RFValue(24)}px;
  width: 100%;
`
export const BoxBreastfeedView = styled.View`
  align-items: center;
  padding: ${RFValue(20)}px ${RFValue(16)}px 0;
  flex-direction: row;
  width: 100%;
`

export const BoxChildView = styled.View`
  align-items: center;
  justify-content: space-between;
  padding: ${RFValue(10)}px ${RFValue(15)}px 20px;
  flex-direction: row;
  width: 100%;
`

export const BoxImageMamaView = styled.View`
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.secondary};
  border-radius: ${RFValue(55)}px;
  /* padding: 10px 14px; */
  width: ${RFValue(55)}px;
  height: ${RFValue(55)}px;
`

export const BoxColumnView = styled.View`
  flex-direction: column;
  padding: 0 10px;
`
export const HeadText = styled.Text`
  color: ${({theme}) => theme.colors.text_light};
  font-size: ${RFValue(12)}px;
  font-family: ${({theme}) => theme.fonts.medium};
`
export const BodyText = styled.Text`
  color: ${({theme}) => theme.colors.text_light};
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.extra_bold};
`

export const ButtonDeleteView = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  padding: 0 16px;
`

export const HeadChildText = styled.Text`
  color: ${({theme}) => theme.colors.text_light};
  font-size: ${RFValue(12)}px;
  font-family: ${({theme}) => theme.fonts.medium};
  padding: 0 8px;
  flex: 1;
`
export const ButtonNewChildView = styled.View`
  width: 100%;
  margin: ${RFValue(44)}px 0;
`
export const ViewButton = styled.View`
  margin: ${RFValue(24)}px 0 0;
  width: 100%;
`
