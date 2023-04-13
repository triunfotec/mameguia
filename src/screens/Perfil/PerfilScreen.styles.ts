import {RFPercentage, RFValue} from 'react-native-responsive-fontsize'

import styled from 'styled-components/native'

export const ScrollView = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.text_light};
`
export const Content = styled.View`
  width: 100%;
  padding: 0 ${RFValue(20)}px;
  margin-bottom: ${RFValue(10)}px;
`
export const ViewLogo = styled.View`
  align-items: center;
  width: 100%;
  background-color: ${({theme}) => theme.colors.text_light};
  padding-top: ${RFValue(20)}px;
`

export const Title = styled.Text`
  width: 100%;
  text-align: left;

  color: ${({theme}) => theme.colors.secondary};
  font-size: ${RFValue(40)}px;
  font-family: ${({theme}) => theme.fonts.extra_bold};

  margin: ${RFValue(8)}px 0;
`

export const SubTitle = styled.Text`
  width: 100%;
  text-align: left;

  color: ${({theme}) => theme.colors.blue};
  font-size: ${RFValue(20)}px;
  font-family: ${({theme}) => theme.fonts.bold};

  margin: ${RFValue(16)}px 0 0;
`

export const Username = styled.Text`
  width: 100%;

  color: ${({theme}) => theme.colors.blue};
  font-size: ${RFValue(20)}px;
  font-family: ${({theme}) => theme.fonts.extra_bold};

  margin: ${RFValue(8)}px 0;
  text-align: center;
`

export const ViewItemPerfil = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin: ${RFValue(8)}px 0;
`

export const ItemPerfil = styled.Text`
  width: 100%;
  text-align: left;

  color: ${({theme}) => theme.colors.blue};
  font-size: ${RFValue(16)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  line-height: ${RFValue(22)}px;
  padding: 0 ${RFValue(8)}px;
`

export const ItemVersion = styled.Text`
  width: 100%;
  text-align: center;

  color: ${({theme}) => theme.colors.blue};
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  line-height: ${RFValue(22)}px;
`
export const ViewButton = styled.View`
  margin: ${RFValue(16)}px 0;
`

export const ViewCategory = styled.View`
  margin: ${RFValue(24)}px 0;
`

export const AccordionView = styled.View`
  margin: ${RFValue(10)}px 0 ${RFValue(44)}px;
`

export const TitleAccordion = styled.Text`
  color: ${({theme}) => theme.colors.title};
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.bold};
  margin: ${RFValue(10)}px 0 0;
`
export const TextAccordion = styled.Text`
  color: ${({theme}) => theme.colors.title};
  font-size: ${RFValue(12)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  margin: ${RFValue(8)}px 0 0;
`

export const BoxPhoto = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
export const CirclePhoto = styled.View`
  border: solid 1px ${({theme}) => theme.colors.primary};
  width: 110px;
  height: 110px;
  align-items: center;
  justify-content: center;
  border-radius: 80px;
`
export const ButtonsPhoto = styled.View`
  /* margin-left: 20px; */
  justify-content: center;
`

export const TextPhoto = styled.Text`
  color: ${({theme}) => theme.colors.title};
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.bold};
`

export const ButtonPhoto = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
