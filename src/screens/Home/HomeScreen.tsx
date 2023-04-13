import React, {useState, useMemo, useEffect, Fragment, useRef} from 'react'
import {
  Image,
  ImageBackground,
  View,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'
import {useDispatch, useSelector} from 'react-redux'

import * as Analytics from 'expo-firebase-analytics'
import {useTheme} from 'styled-components'

import IconArticlePink from '@/assets/icons_home/articles/icon_article_pink.svg'
import IconArticlePurple from '@/assets/icons_home/articles/icon_article_purple.svg'
import IconArticleRed from '@/assets/icons_home/articles/icon_article_red.svg'
import IconArticleWhite from '@/assets/icons_home/articles/icon_article_white.svg'
import IconTestGray from '@/assets/icons_home/tests/icon_test_gray.svg'
import IconTestPurple from '@/assets/icons_home/tests/icon_test_purple.svg'
import IconTestWhite from '@/assets/icons_home/tests/icon_test_white.svg'
import LogoSvg1 from '@/assets/logos/Logo-1.svg'
import LogoSvg2 from '@/assets/logos/Logo-2.svg'
import LogoSvg3 from '@/assets/logos/Logo-3.svg'
import LogoSvg4 from '@/assets/logos/Logo-4.svg'
import ButtonClose from '@/assets/menu/superior/bt_close.svg'
import MenuHamburger from '@/assets/menu/superior/menu_hamburger.svg'
import ArticleInterviewsComponent from '@/components/ArticlesInterviews'
import ButtonComponent from '@/components/Button'
import MenuComponent from '@/components/Menu'
import {useAuth} from '@/hooks/auth'
import {videosMock} from '@/mocks/videos'
import {
  descriptionSituation,
  getLayoutHome,
} from '@/screens/Home/HomeScreen.data'
import {
  ScrollView,
  ContainerScrollView,
  ContentScrollView,
  Container,
  HeaderView,
  GoBackView,
  Title,
  Title2,
  TitleTest,
  SubTitleTest,
} from '@/screens/Home/HomeScreen.styles'
import {
  articleItemsGetRequestStatus,
  articleItemsRequest,
  articleRequest,
} from '@/store/Article/ArticleCreators'
import {
  selectArticleItemsGetRequestStatus,
  selectArticlesSpotlight,
} from '@/store/Article/ArticleSelectors'
import {
  breastfeedingBreastfeedGetRequest,
  breastfeedingBreastfeedGetRequestStatus,
  breastfeedingChildrenGetRequest,
  breastfeedingChildrenGetRequestStatus,
} from '@/store/Breastfeeding/BreastfeedingCreators'
import {
  selectBreastfeedingBreastfeedStatus,
  selectBreastfeedingChildren,
  selectBreastfeedingChildrenGetStatus,
} from '@/store/Breastfeeding/BreastfeedingSelectors'
import {
  fertileCycleGet,
  fertileCycleGetStatus,
} from '@/store/FertileCycle/FertileCycleCreators'
import {selectFertileCyclesGetStatus} from '@/store/FertileCycle/FertileCycleSelectors'
import {userSetSituation} from '@/store/User/UserCreators'
import {
  selectUserChosenCurrentSituation,
  selectUserScreenInitialToMenuDiary,
} from '@/store/User/UserSelectors'
import {
  weekGetStartDateUser,
  weekInitialDateUserRequestStatus,
} from '@/store/Week/WeekCreators'
import {selectWeekStartDateUserStatus} from '@/store/Week/WeekSelectors'
import {EActionTypeStatus} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {TStackNavigationProp} from '@/types/application/Navigation/NavigationApplication.types'
import {IArticle} from '@/types/entities/Article/ArticleEntity.types'
import {
  ESituation,
  SituationType,
  TSituation,
} from '@/types/entities/User/UserEntity.types'
import {IVideo} from '@/types/entities/Video/VideoEntity.types'
import {useNavigation} from '@react-navigation/native'

import HomeVideoScreen from './HomeVideo'

const HomeScreen: React.FC = () => {
  const {user} = useAuth()
  const navigation = useNavigation<TStackNavigationProp>()

  const dispatch = useDispatch()
  const scrollRef = useRef<any>()

  const theme = useTheme()

  const [loading, setLoading] = useState(true)
  const [situation, setSituation] = useState<TSituation>(
    SituationType[user.situation || 'Parceiro(a)'],
  )
  const [articleId, setArticleId] = useState<number>()
  const [menuShow, setMenuShow] = useState(false)

  const fertileCyclesStatus = useSelector(selectFertileCyclesGetStatus)
  const weekStartDateUserStatus = useSelector(selectWeekStartDateUserStatus)

  const children = useSelector(selectBreastfeedingChildren)
  const childrenStatus = useSelector(selectBreastfeedingChildrenGetStatus)
  const breastfeedingStatus = useSelector(selectBreastfeedingBreastfeedStatus)

  const articlesSpotlight = useSelector(selectArticlesSpotlight)
  const articleItemsStatus = useSelector(selectArticleItemsGetRequestStatus)

  const chosenCurrentSituation = useSelector(selectUserChosenCurrentSituation)
  const screenInitialToMenuDiary = useSelector(
    selectUserScreenInitialToMenuDiary,
  )

  const situationStatus = useMemo(() => {
    return {
      isGetPregnant: chosenCurrentSituation === 'getPregnant',
      isPregnant: chosenCurrentSituation === 'pregnant',
      isBreastfeeding: chosenCurrentSituation === 'breastfeeding',
      isAnotherResponsible: chosenCurrentSituation === 'anotherResponsible',
    }
  }, [chosenCurrentSituation])

  const description = descriptionSituation[situation]

  const homeData = useMemo(() => {
    return getLayoutHome(situation)
  }, [situation])

  useEffect(() => {
    if (user.situation) {
      dispatch(userSetSituation(SituationType[user.situation]))
      setSituation(SituationType[user.situation])

      Analytics.logEvent('screen_view', {
        screen_name: `Tela Home ${user.situation}`,
      })
    }
  }, [dispatch, user.situation])

  useEffect(() => {
    if (user?.id) {
      if (situationStatus.isGetPregnant) {
        dispatch(fertileCycleGet(user.id))
      }

      if (situationStatus.isPregnant) {
        dispatch(weekGetStartDateUser(user.id))
      }

      if (situationStatus.isBreastfeeding) {
        dispatch(breastfeedingChildrenGetRequest(user.id))
      }
    }
  }, [
    dispatch,
    situationStatus.isBreastfeeding,
    situationStatus.isGetPregnant,
    situationStatus.isPregnant,
    user.id,
  ])

  useEffect(() => {
    if (situation) {
      dispatch(articleRequest(ESituation[situation]))
    }
  }, [dispatch, situation])

  useEffect(() => {
    if (articleItemsStatus.status === EActionTypeStatus.Success && articleId) {
      dispatch(
        articleItemsGetRequestStatus({status: EActionTypeStatus.Waiting}),
      )
      navigation.navigate('ArticleItems', {articleId})
    }
  }, [
    articleId,
    articleItemsStatus,
    articleItemsStatus.status,
    dispatch,
    navigation,
  ])

  useEffect(() => {
    scrollRef?.current?.scrollTo({x: 0, y: 0, animation: true})

    if (fertileCyclesStatus.status === EActionTypeStatus.Success) {
      dispatch(
        fertileCycleGetStatus({
          status: EActionTypeStatus.Waiting,
          message: '',
        }),
      )

      setLoading(false)
    }

    if (weekStartDateUserStatus.status === EActionTypeStatus.Success) {
      dispatch(
        weekInitialDateUserRequestStatus({
          status: EActionTypeStatus.Waiting,
          message: '',
        }),
      )

      setLoading(false)
    }

    if (childrenStatus.status === EActionTypeStatus.Success) {
      dispatch(
        breastfeedingChildrenGetRequestStatus({
          status: EActionTypeStatus.Waiting,
          message: '',
        }),
      )
      dispatch(
        breastfeedingBreastfeedGetRequest(children.map(child => child.id)),
      )
    }

    if (breastfeedingStatus.status === EActionTypeStatus.Success) {
      dispatch(
        breastfeedingBreastfeedGetRequestStatus({
          status: EActionTypeStatus.Waiting,
          message: '',
        }),
      )
      setLoading(false)
    }

    if (situationStatus.isAnotherResponsible) {
      setLoading(false)
    }
  }, [
    breastfeedingStatus.status,
    children,
    childrenStatus.status,
    dispatch,
    fertileCyclesStatus.status,
    situationStatus.isAnotherResponsible,
    situationStatus.isBreastfeeding,
    situationStatus.isGetPregnant,
    situationStatus.isPregnant,
    weekStartDateUserStatus.status,
  ])

  return (
    <View style={{flex: 1}}>
      {homeData && (
        <ImageBackground
          resizeMode="cover"
          source={homeData.backgroundImage}
          style={{
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}>
          <Container>
            <HeaderView>
              <TouchableWithoutFeedback
                onPress={() => {
                  setMenuShow(!menuShow)
                }}>
                <GoBackView>
                  {menuShow ? <ButtonClose /> : <MenuHamburger />}
                </GoBackView>
              </TouchableWithoutFeedback>
              {situationStatus.isPregnant && (
                <LogoSvg1 width={RFValue(200)} height={RFValue(44)} />
              )}
              {situationStatus.isBreastfeeding && (
                <LogoSvg2 width={RFValue(200)} height={RFValue(44)} />
              )}
              {situationStatus.isAnotherResponsible && (
                <LogoSvg3 width={RFValue(200)} height={RFValue(44)} />
              )}
              {situationStatus.isGetPregnant && (
                <LogoSvg4 width={RFValue(200)} height={RFValue(44)} />
              )}

              <TouchableWithoutFeedback onPress={() => {}}>
                <GoBackView>
                  <></>
                </GoBackView>
              </TouchableWithoutFeedback>
            </HeaderView>

            {menuShow && (
              <MenuComponent
                situation={situation}
                callback={(situation: TSituation) => {
                  setSituation(situation)
                  setMenuShow(false)
                  dispatch(userSetSituation(situation))

                  Analytics.logEvent('screen_view', {
                    screen_name: `Tela Home ${ESituation[situation]}`,
                  })
                }}
                closeMenu={() => setMenuShow(false)}
              />
            )}
            {loading && <ActivityIndicator color="#AD9BE6" size="large" />}
            {!loading && (
              <ContainerScrollView>
                <ScrollView ref={scrollRef}>
                  <ContentScrollView>
                    <Image
                      style={{
                        resizeMode: 'contain',
                        height: 400,
                        width: '99%',
                        marginTop: 8,
                      }}
                      source={homeData.featuredImage}
                    />

                    <Title color={homeData.colorDefault}>
                      {description.title}
                    </Title>
                    <Title2 color={homeData.colorDefault}>
                      {description.title2}
                    </Title2>

                    <View
                      style={{
                        backgroundColor: homeData.testBackgroundColor,
                        borderRadius: 24,
                        paddingHorizontal: 16,
                        paddingVertical: 40,
                        marginBottom: RFValue(25),
                        marginTop: RFValue(25),
                        width: '100%',
                      }}>
                      {situationStatus.isPregnant && <IconTestPurple />}
                      {situationStatus.isBreastfeeding && <IconTestGray />}
                      {situationStatus.isAnotherResponsible && (
                        <IconTestWhite />
                      )}
                      {situationStatus.isGetPregnant && <IconTestWhite />}

                      <TitleTest color={homeData.testColor}>
                        Teste seus conhecimentos: Planejamento
                      </TitleTest>

                      <SubTitleTest color={homeData.testColor}>
                        Veja o que você já sabe sobre esse período tão especial
                        e aprenda mais sobre tópicos que você não conhece tão
                        bem!
                      </SubTitleTest>

                      <ButtonComponent
                        title="Quero fazer o quiz"
                        backgroundColor={homeData.testButtonBackgroundColor}
                        color={homeData.testButtonColor}
                        borderColor={theme.colors.text_light}
                        onPress={() => {
                          navigation.navigate('Testes', {
                            screen: 'Quiz',
                            params: {stepNumber: 1, situation},
                          })
                        }}
                        height={56}
                      />
                    </View>

                    {!situationStatus.isAnotherResponsible && (
                      <View
                        style={{
                          backgroundColor: homeData.tableDigitalBackgroundColor,
                          borderRadius: 24,
                          paddingHorizontal: 24,
                          paddingVertical: 40,
                          marginBottom: RFValue(25),
                          width: '100%',
                        }}>
                        <View>
                          <Image
                            style={{
                              resizeMode: 'contain',
                              width: '100%',
                              height: 210,
                            }}
                            source={homeData.tableCalendarImage}
                          />
                        </View>

                        <TitleTest color={homeData.tableDigitalTitleColor}>
                          {homeData.tableDigitalTitle}
                        </TitleTest>

                        <SubTitleTest
                          color={homeData.tableDigitalSubTitleColor}>
                          {homeData.tableDigitalSubTitle}
                        </SubTitleTest>

                        <ButtonComponent
                          title={homeData.tableDigitalButtonText}
                          backgroundColor={theme.colors.text_light}
                          color={homeData.buttonDefaultColor}
                          borderColor={theme.colors.secondary_light}
                          onPress={() => {
                            navigation.navigate('Diary', {
                              screen: screenInitialToMenuDiary,
                            })
                          }}
                          height={56}
                        />
                      </View>
                    )}

                    {/* {videosMock && (
                      <HomeVideoScreen
                        homeDataStyle={homeData}
                        theme={theme}
                        isAnotherResponsible={
                          situationStatus.isAnotherResponsible
                        }
                        navigation={navigation}
                        videos={videosMock}
                      />
                    )} */}

                    <View
                      style={{
                        backgroundColor: homeData.articleBackgroundColor,
                        borderRadius: 24,
                        paddingHorizontal: RFValue(24),
                        paddingVertical: RFValue(40),
                        marginBottom: RFValue(25),
                        width: '100%',
                      }}>
                      <View>
                        {situationStatus.isPregnant && (
                          <IconArticlePurple
                            width={RFValue(30)}
                            height={RFValue(30)}
                          />
                        )}
                        {situationStatus.isBreastfeeding && (
                          <IconArticleRed
                            width={RFValue(30)}
                            height={RFValue(30)}
                          />
                        )}
                        {situationStatus.isAnotherResponsible && (
                          <IconArticleWhite
                            width={RFValue(30)}
                            height={RFValue(30)}
                          />
                        )}
                        {situationStatus.isGetPregnant && (
                          <IconArticlePink
                            width={RFValue(30)}
                            height={RFValue(30)}
                          />
                        )}
                      </View>

                      <TitleTest color={homeData.articleTitleColor}>
                        Artigos e entrevistas
                      </TitleTest>

                      <View style={{marginBottom: 20}}>
                        {articlesSpotlight?.map((article: IArticle) => (
                          <Fragment key={article.id}>
                            <ArticleInterviewsComponent
                              article={article}
                              color={homeData.articleTitleColor}
                              isAnotherResponsible={
                                situationStatus.isAnotherResponsible
                              }
                              onPress={() => {
                                dispatch(articleItemsRequest(article.id))
                                setArticleId(article.id)
                              }}
                              loading={false}
                            />
                          </Fragment>
                        ))}
                      </View>

                      {articlesSpotlight?.length > 0 && (
                        <ButtonComponent
                          title="Ver todos os artigos"
                          backgroundColor={
                            situationStatus.isAnotherResponsible
                              ? theme.colors.dark_grey
                              : theme.colors.text_light
                          }
                          color={homeData.buttonDefaultColor}
                          borderColor={theme.colors.secondary_light}
                          onPress={() => navigation.navigate('Articles')}
                          height={56}
                        />
                      )}
                    </View>
                  </ContentScrollView>
                </ScrollView>
              </ContainerScrollView>
            )}
          </Container>
        </ImageBackground>
      )}
    </View>
  )
}

export default HomeScreen
