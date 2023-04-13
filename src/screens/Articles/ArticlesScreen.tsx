import React, {useState, useMemo, useEffect} from 'react'
import {ActivityIndicator, TouchableWithoutFeedback, View} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'
import {useDispatch, useSelector} from 'react-redux'

import * as Analytics from 'expo-firebase-analytics'
import {useTheme} from 'styled-components'

import LogoSvg from '@/assets/logo3.svg'
import ArticleInterviewsComponent from '@/components/ArticlesInterviews'
import ButtonComponent from '@/components/Button'
import {
  Container,
  ScrollView,
  ContainerScrollView,
  ContentScrollView,
  Content,
  HeaderView,
  GoBackView,
  Title,
  SubTitle,
  BoxSpotlightView,
  BoxImageView,
  ImageView,
  ArticleImage,
  ReadTitle,
  ButtonView,
} from '@/screens/Articles/ArticlesScreen.styles'
import {
  articleItemsGetRequestStatus,
  articleItemsRequest,
} from '@/store/Article/ArticleCreators'
import {
  selectArticleItemsGetRequestStatus,
  selectArticles,
  selectArticlesSpotlight,
} from '@/store/Article/ArticleSelectors'
import {EActionTypeStatus} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {TStackNavigationProp} from '@/types/application/Navigation/NavigationApplication.types'
import {IArticle} from '@/types/entities/Article/ArticleEntity.types'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'

export interface IArticlesScreenParams {
  screen?: string
}
const ArticlesScreen: React.FC = () => {
  const theme = useTheme()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)
  const [quantityArticlesToShow, setQuantityArticlesToShow] = useState(4)
  const [articleId, setArticleId] = useState<number>()

  const navigation = useNavigation<TStackNavigationProp>()

  const articleSpotlight: IArticle = useSelector(selectArticlesSpotlight)[0]
  const articles: IArticle[] = useSelector(selectArticles)
  const articleItemsStatus = useSelector(selectArticleItemsGetRequestStatus)

  const articlesToShow = useMemo(() => {
    const allArticles = articles
      .filter(article => article.id !== articleSpotlight.id)
      .slice(0, quantityArticlesToShow)

    return allArticles
  }, [articleSpotlight?.id, articles, quantityArticlesToShow])

  const showButtonLoadArticles = useMemo(() => {
    return !(articlesToShow.length + 1 === articles.length)
  }, [articles.length, articlesToShow.length])

  useEffect(() => {
    if (articleItemsStatus.status === EActionTypeStatus.Success && articleId) {
      dispatch(
        articleItemsGetRequestStatus({status: EActionTypeStatus.Waiting}),
      )
      navigation.navigate('ArticleItems', {articleId})
    }
  }, [articleId, articleItemsStatus.status, dispatch, navigation])

  useEffect(() => {
    if (articles.length > 0) {
      Analytics.logEvent('screen_view', {
        screen_name: `Tela Todos artigos ${articles[0].situation}`,
      })
    }
  }, [articles])

  return (
    <Container>
      <Content>
        <HeaderView>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('Home')
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

        <ContainerScrollView>
          <ScrollView>
            <ContentScrollView>
              <Title>Artigos e entrevistas</Title>
              <SubTitle>Em destaque</SubTitle>

              <BoxSpotlightView>
                {loading && (
                  <ImageView>
                    <ActivityIndicator
                      color={theme.colors.primary}
                      size="large"
                    />
                  </ImageView>
                )}

                <BoxImageView>
                  <ArticleImage
                    source={{
                      uri: articleSpotlight?.imageUrl,
                    }}
                    onLoadEnd={() => setLoading(false)}
                  />
                </BoxImageView>

                <ArticleInterviewsComponent
                  article={articleSpotlight}
                  color={theme.colors.primary}
                  isAnotherResponsible={false}
                  onPress={() => {
                    setArticleId(articleSpotlight.id)
                    dispatch(articleItemsRequest(articleSpotlight.id))
                  }}
                  loading={
                    articleItemsStatus.status === EActionTypeStatus.Busy &&
                    articleId === articleSpotlight.id
                  }
                />
              </BoxSpotlightView>

              <ReadTitle>Leia nossos artigos</ReadTitle>

              {articlesToShow.length > 0 &&
                articlesToShow.map(article => (
                  <View style={{width: '100%'}} key={article.id}>
                    <ArticleInterviewsComponent
                      article={article}
                      color={theme.colors.primary}
                      isAnotherResponsible={false}
                      onPress={() => {
                        dispatch(articleItemsRequest(article.id))
                        setArticleId(article.id)
                      }}
                      loading={
                        articleItemsStatus.status === EActionTypeStatus.Busy &&
                        articleId === article.id
                      }
                    />
                  </View>
                ))}

              {showButtonLoadArticles && (
                <ButtonView>
                  <ButtonComponent
                    title="Carregar mais artigos"
                    backgroundColor={theme.colors.text_light}
                    color={theme.colors.primary}
                    borderColor={theme.colors.secondary_light}
                    onPress={() =>
                      setQuantityArticlesToShow(quantityArticlesToShow + 4)
                    }
                    height={56}
                  />
                </ButtonView>
              )}
            </ContentScrollView>
          </ScrollView>
        </ContainerScrollView>
      </Content>
    </Container>
  )
}

export default ArticlesScreen
