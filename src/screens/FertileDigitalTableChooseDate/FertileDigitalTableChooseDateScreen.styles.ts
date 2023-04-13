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
`

export const Container = styled.View`
  flex: 1;
`

export const Content = styled.View`
  flex: 1;
  width: 100%;
  padding: 0 ${RFValue(20)}px;
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
  flex-direction: row;
  align-items: center;
`
export const Title = styled.Text`
  width: 100%;
  text-align: left;

  color: ${({theme}) => theme.colors.primary};
  font-size: ${RFValue(24)}px;
  font-family: ${({theme}) => theme.fonts.extra_bold};

  margin: ${RFValue(8)}px;
`
export const SubTitle = styled.Text`
  width: 100%;
  text-align: left;

  color: ${({theme}) => theme.colors.primary};
  font-size: ${RFValue(20)}px;
  font-family: ${({theme}) => theme.fonts.extra_bold};

  margin: ${RFValue(8)}px 0;
`
export const Text = styled.Text`
  width: 100%;
  text-align: left;

  color: ${({theme}) => theme.colors.primary};
  font-size: ${RFValue(18)}px;
  font-family: ${({theme}) => theme.fonts.medium};

  margin: ${RFValue(8)}px 0;
`

export const CicloText = styled.Text`
  width: 100%;
  text-align: center;

  color: ${({theme}) => theme.colors.text_light};
  font-size: ${RFValue(17)}px;
  font-family: ${({theme}) => theme.fonts.extra_bold};

  margin: ${RFValue(24)}px 0 ${RFValue(16)}px;
`
export const ObservationText = styled.Text`
  width: 100%;
  text-align: center;

  color: ${({theme}) => theme.colors.text_light};
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.regular};

  margin: ${RFValue(24)}px 0 ${RFValue(8)}px;
`

export const ObservationText2 = styled.Text`
  width: 100%;
  text-align: center;

  color: ${({theme}) => theme.colors.text_light};
  font-size: ${RFValue(12)}px;
  font-family: ${({theme}) => theme.fonts.regular};

  margin: ${RFValue(0)}px 0 ${RFValue(16)}px;
`

export const CalendarView = styled.View`
  background-color: ${({theme}) => theme.colors.primary};
  border-radius: 30px;
  width: 100%;
  flex: 1;
  margin: ${RFValue(16)}px 0;
  padding: 0 ${RFValue(20)}px;
`

export const ButtonView = styled.View`
  width: 100%;
  margin: ${RFValue(24)}px 0;
  padding: 0 10px;
`

export const ObservationText3 = styled.Text`
  width: 100%;
  text-align: left;

  color: ${({theme}) => theme.colors.primary};
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.bold};

  margin: 0 0 ${RFValue(24)}px;
  padding-left: ${RFValue(24)}px;
`
export const ObservationText3Bold = styled.Text`
  color: ${({theme}) => theme.colors.primary};
  font-size: ${RFValue(15)}px;
  font-family: ${({theme}) => theme.fonts.extra_bold};
`
