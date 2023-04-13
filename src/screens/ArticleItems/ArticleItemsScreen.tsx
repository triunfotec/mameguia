import React, {useEffect, useRef, useState} from 'react'
import {ActivityIndicator, TouchableWithoutFeedback, View} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'
import {useSelector} from 'react-redux'

import * as Analytics from 'expo-firebase-analytics'
import {useTheme} from 'styled-components'

import LogoSvg from '@/assets/logo3.svg'
import {
  Container,
  ScrollView,
  Content,
  Content2,
  HeaderView,
  GoBackView,
  Title,
  ImageView,
  ArticleImage,
} from '@/screens/ArticleItems/ArticleItemsScreen.styles'
import {
  selectArticleById,
  selectArticleItems,
} from '@/store/Article/ArticleSelectors'
import {
  TStackNavigationProp,
  TStackScreenParam,
} from '@/types/application/Navigation/NavigationApplication.types'
import {IArticle} from '@/types/entities/Article/ArticleEntity.types'
import {IArticleItems} from '@/types/entities/Article/ArticleItemsEntity.types'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native'

import {articleItemType} from './ArticleItemsType'

export interface IArticleItemsScreenParams {
  screen?: string
  articleId: number
}
const ArticleItemsScreen: React.FC<IArticleItemsScreenParams> = () => {
  const scrollRef = useRef<any>()
  const theme = useTheme()
  const {params} = useRoute<RouteProp<TStackScreenParam, 'ArticleItems'>>()

  const [loading, setLoading] = useState(true)

  const navigation = useNavigation<TStackNavigationProp>()

  const articleItems: IArticleItems[] = useSelector(selectArticleItems)

  const article: IArticle =
    useSelector(selectArticleById(params.articleId)) || ({} as IArticle)

  useEffect(() => {
    Analytics.logEvent('screen_view', {
      screen_name: `Tela ${article.title}`,
    })
  }, [article.title])

  return (
    <Container>
      <Content>
        <HeaderView>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.goBack()
            }}>
            <GoBackView>
              <MaterialCommunityIcons
                name="chevron-left"
                size={32}
                color={theme.colors.primary}
              />
            </GoBackView>
          </TouchableWithoutFeedback>
          <LogoSvg width={RFValue(200)} height={RFValue(44)} />

          <TouchableWithoutFeedback onPress={() => {}}>
            <GoBackView>
              <MaterialCommunityIcons
                name="chevron-right"
                size={32}
                color={theme.colors.primary}
                style={{opacity: 0}}
              />
            </GoBackView>
          </TouchableWithoutFeedback>
        </HeaderView>
        <View style={{width: '100%', flex: 1}}>
          <ScrollView ref={scrollRef}>
            <Content2>
              <Title>{article.title}</Title>

              {loading && (
                <ImageView>
                  <ActivityIndicator
                    color={theme.colors.primary}
                    size="large"
                  />
                </ImageView>
              )}
              <ArticleImage
                source={{
                  uri: article.imageUrl,
                }}
                onLoadEnd={() => setLoading(false)}
              />

              {articleItems.map(item => (
                <View key={item.id} style={{marginVertical: 5}}>
                  {articleItemType['load'](item.text)[item.type]}
                </View>
              ))}
            </Content2>
          </ScrollView>
        </View>
      </Content>
    </Container>
  )
}

export default ArticleItemsScreen
