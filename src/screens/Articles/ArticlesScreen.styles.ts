import {RFValue} from 'react-native-responsive-fontsize'

import styled from 'styled-components/native'

export const ScrollView = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  background-color: #fff;
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
  padding: 0 ${RFValue(20)}px;
  align-items: flex-start;
  background-color: #fff;
  margin-bottom: ${RFValue(10)}px;
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
  font-size: ${RFValue(24)}px;
  font-family: ${({theme}) => theme.fonts.extra_bold};

  margin: ${RFValue(8)}px 0;
`

export const BoxSpotlightView = styled.View`
  background-color: #f6f6f6;
  border-radius: ${RFValue(16)}px;
  width: 100%;
`
export const BoxImageView = styled.View`
  background-color: #f6f6f6;
  padding: 0 1px;
`

export const ImageView = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`

export const ArticleImage = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 100%;
  height: 260px;
`
export const ReadTitle = styled.Text`
  width: 100%;
  text-align: left;

  color: ${({theme}) => theme.colors.blue};
  font-size: ${RFValue(24)}px;
  font-family: ${({theme}) => theme.fonts.bold};

  margin: ${RFValue(32)}px 0 ${RFValue(0)}px;
`
export const ButtonView = styled.View`
  width: 100%;
  margin: ${RFValue(24)}px 0;
`
