import {RFValue} from 'react-native-responsive-fontsize'

import styled from 'styled-components/native'

export const ScrollView = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  background-color: #fff;
`

export const Container = styled.View`
  flex: 1;
`
export const Content = styled.View`
  flex: 1;
  padding: 0 ${RFValue(20)}px;
  align-items: flex-start;
  background-color: #fff;
`

export const Content2 = styled.View`
  width: 100%;
  flex-direction: column;
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
export const ImageView = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`

export const ArticleImage = styled.Image.attrs({
  resizeMode: 'contain',
})`
  margin: ${RFValue(8)}px 0;
  width: 100%;
  height: 260px;
`

export const ArticleItemSubtitleTypeText = styled.Text`
  font-size: ${RFValue(32)}px;
  font-family: ${({theme}) => theme.fonts.extra_bold};
  color: ${({theme}) => theme.colors.blue};
`
export const ArticleItemTextTypeText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme}) => theme.colors.text_dark};
`
export const ArticleItemTopicTypeContainerView = styled.View``

export const ArticleItemTopicTypeContentView = styled.View`
  flex-direction: row;
  align-items: center;
`
export const ArticleItemTopicTypeCircleView = styled.View`
  background-color: ${({theme}) => theme.colors.blue};
  width: 10px;
  height: 10px;
  border-radius: 10px;
  margin-right: 10px;
`
export const ArticleItemTopicTypeText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({theme}) => theme.fonts.bold};
  color: ${({theme}) => theme.colors.text_dark};
`
export const ArticleItemUrlTypeText = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme}) => theme.colors.secondary};
`
