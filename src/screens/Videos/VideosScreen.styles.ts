import {RFValue} from 'react-native-responsive-fontsize'

import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`
export const Content = styled.View`
  flex: 1;
  padding: 0 ${RFValue(16)}px;
  margin-bottom: ${RFValue(10)}px;
`

export const IconView = styled.View`
  width: 29px;
  height: 33px;
  /* transform: matrix(0, 1, -1, 0, 0, 0); */
  border: 4px solid #ad9be6;
  opacity: 1;
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
export const ContainerScrollView = styled.View`
  flex: 1;
`

export const ScrollView = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`

export const ContentScrollView = styled.View`
  flex-direction: column;
  flex: 1;
`
export const Title = styled.Text`
  width: 100%;
  text-align: left;

  color: ${({theme}) => theme.colors.secondary};
  font-size: ${RFValue(40)}px;
  font-family: ${({theme}) => theme.fonts.extra_bold};

  margin: ${RFValue(8)}px 0;
`
export const ButtonView = styled.View`
  width: 100%;
  margin: ${RFValue(24)}px 0;
`
export const VideoContainer = styled.View`
  border-radius: ${RFValue(20)}px;
  height: ${RFValue(200)}px;
  margin: ${RFValue(8)}px 0;
`
export const VideoContent = styled.View`
  justify-content: flex-end;
  flex: 1;
`
export const PlayDescription = styled.View`
  background-color: #000000b3;
  width: ${RFValue(80)}px;
  height: ${RFValue(32)}px;
  flex-direction: row;
  align-items: center;
  margin-left: ${RFValue(10)}px;
  margin-bottom: ${RFValue(10)}px;
  padding: 0 ${RFValue(8)}px;
  border-radius: ${RFValue(8)}px;
`
export const MinutesText = styled.Text`
  font-family: AccordAlternateBold;
  font-size: ${RFValue(14)}px;
  color: #fff;
  margin-left: ${RFValue(8)}px;
`
export const VideoDescriptionView = styled.View`
  flex-direction: row;
  padding: 0 ${RFValue(8)}px;
`
export const VideoDescriptionText = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: AccordAlternateBold;
  color: #fff;
  margin-bottom: ${RFValue(10)}px;
  width: 85%;
`
export const ButtonPlayView = styled.View`
  background-color: #000000b3;
  width: 44px;
  height: 44px;
  border-radius: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
`
