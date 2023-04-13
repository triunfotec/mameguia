import React, {useEffect, useCallback, useState, useMemo} from 'react'
import {ImageBackground, View, TouchableWithoutFeedback} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {RFValue} from 'react-native-responsive-fontsize'
import {batch, useDispatch, useSelector} from 'react-redux'

import {useTheme} from 'styled-components'

import BackgroundBreastfeed from '@/assets/backgroundHome/background_lactante.png'
import MamaDireita from '@/assets/breastfeeding/mama-direita.svg'
import MamaEsquerda from '@/assets/breastfeeding/mama-esquerda.svg'
import IconDiaryWhite from '@/assets/diary/icon_diary_white.svg'
import LogoSvg2 from '@/assets/logos/Logo-2.svg'
import ButtonComponent from '@/components/Button'
import ChatBoxComponent from '@/components/ChatBox'
import ModalConfirmActionComponent from '@/components/ModalConfirmAction'
import {useAuth} from '@/hooks/auth'
import {
  ScrollView,
  ContainerScrollView,
  ContentScrollView,
  Container,
  HeaderView,
  GoBackView,
  TitleView,
  Title,
  SubTitle,
  ButtonView,
  PlusText,
  TitleDateView,
  TitleDateText,
  BoxBreastfeedingView,
  BoxBreastfeedView,
  BoxChildView,
  BoxImageMamaView,
  BoxColumnView,
  HeadText,
  BodyText,
  ButtonDeleteView,
  HeadChildText,
  ButtonNewChildView,
  ViewButton,
} from '@/screens/BreastfeedHistory/BreastfeedHistoryScreen.styles'
import {
  breastfeedingBreastfeedGetRequest,
  breastfeedingBreastfeedDeleteRequest,
  breastfeedingChildrenGetRequest,
  breastfeedingBreastfeedDeleteRequestStatus,
} from '@/store/Breastfeeding/BreastfeedingCreators'
import {
  selectBreastfeedingBreastfeed,
  selectBreastfeedingChildren,
  selectBreastfeedingDeleteStatus,
} from '@/store/Breastfeeding/BreastfeedingSelectors'
import {frequentAskGet} from '@/store/FrequentAsk/FrequentAskCreators'
import {selectFrequentAsks} from '@/store/FrequentAsk/FrequentAskSelectors'
import {EActionTypeStatus} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {
  TStackNavigationProp,
  TStackScreenParam,
} from '@/types/application/Navigation/NavigationApplication.types'
import {IBreastfeed} from '@/types/entities/Breastfeed/BreastfeedEntity.types'
import {groupBy} from '@/utils/changeArray'
import {capitalizeFirstLetter} from '@/utils/extensions'
import {
  hoursMinutesSecondsBetweenTwoDates,
  periodHoursMinutesBetweenTwoDates,
} from '@/utils/formatDate'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native'

export interface IBreastfeedHistoryScreenParams {
  screen?: string
  update?: boolean
}

const BreastfeedHistoryScreen: React.FC = () => {
  const theme = useTheme()
  const {user} = useAuth()
  const dispatch = useDispatch()
  const navigation = useNavigation<TStackNavigationProp>()
  const {params} = useRoute<RouteProp<TStackScreenParam, 'BreastfeedHistory'>>()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [showModalConfirmAction, setShowModalConfirmAction] = useState(false)
  const [breastfeedIdDelete, setBreastfeedIdDelete] = useState(0)

  const children = useSelector(selectBreastfeedingChildren)
  const breastfeeds = useSelector(selectBreastfeedingBreastfeed)
  const breastfeedDeleteStatus = useSelector(selectBreastfeedingDeleteStatus)
  const frequentAsks = useSelector(selectFrequentAsks)

  const groupByDate = useMemo(() => {
    return groupBy(breastfeeds, 'groupDate')
  }, [breastfeeds])

  const groupByDateKeysArray = useMemo(() => {
    return Object.keys(groupByDate)
  }, [groupByDate])

  const getBreastByDate = useCallback(
    (date: string) => {
      return groupByDate[date]
    },
    [groupByDate],
  )

  const breastCurrent: IBreastfeed[] = useMemo(() => {
    return getBreastByDate(groupByDateKeysArray[currentIndex])
  }, [currentIndex, getBreastByDate, groupByDateKeysArray])

  const titleDate = useCallback((date: string) => {
    const dateExtensionFull = new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'full',
      timeStyle: 'short',
    }).format(new Date(date))

    var options: any = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }

    return capitalizeFirstLetter(
      new Intl.DateTimeFormat('pt-BR', options).format(new Date(date)),
    )
  }, [])

  const askDeleteBreastfeedText = useMemo(() => {
    return 'Você realmente deseja excluir a amamentação?'
  }, [])

  useEffect(() => {
    if (params?.update) {
      batch(() => {
        dispatch(
          breastfeedingBreastfeedGetRequest(children.map(child => child.id)),
        )
        // dispatch(breastfeedingChildrenGetRequest(user.id))
      })
    }
  }, [children, dispatch, params?.update, user.id])

  useEffect(() => {
    if (breastfeedDeleteStatus?.status === EActionTypeStatus.Success) {
      setShowModalConfirmAction(false)
      dispatch(
        breastfeedingBreastfeedDeleteRequestStatus({
          status: EActionTypeStatus.Waiting,
          message: '',
        }),
      )
      dispatch(
        breastfeedingBreastfeedGetRequest(children.map(child => child.id)),
      )
    }
  }, [breastfeedDeleteStatus?.status, children, dispatch])

  useEffect(() => {
    if (frequentAsks.length === 0) {
      dispatch(frequentAskGet())
    }
  }, [dispatch, frequentAsks])

  useFocusEffect(
    React.useCallback(() => {
      if (children?.length === 0) {
        navigation.navigate('BreastfeedGetNameGenre')
        return
      }

      if (breastfeeds?.length === 0 && !params?.update) {
        navigation.navigate('BreastfeedAddBreastfeeding')
      }

      return () => {}
    }, [breastfeeds?.length, children, navigation, params?.update]),
  )

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        resizeMode="cover"
        source={BackgroundBreastfeed}
        style={{
          justifyContent: 'flex-start',
          flex: 1,
        }}>
        <Container>
          <HeaderView>
            <LogoSvg2 width={RFValue(200)} height={RFValue(44)} />
          </HeaderView>

          <ContainerScrollView>
            <ScrollView>
              <ContentScrollView>
                <TitleView>
                  <IconDiaryWhite />

                  <Title>Amamentação</Title>
                </TitleView>

                <TouchableWithoutFeedback
                  onPress={() =>
                    navigation.navigate('BreastfeedStartBreastfeeding')
                  }>
                  <ButtonView>
                    <MaterialCommunityIcons
                      name="plus"
                      size={28}
                      color={theme.colors.secondary}
                    />
                  </ButtonView>
                </TouchableWithoutFeedback>
                <PlusText>Adicionar mamada</PlusText>

                <SubTitle>Histórico de amamentação</SubTitle>

                <TitleDateView>
                  <TouchableOpacity
                    onPress={() => {
                      if (groupByDateKeysArray.length - 1 > currentIndex) {
                        setCurrentIndex(currentIndex + 1)
                        return
                      }
                    }}
                    style={{marginLeft: -15}}>
                    <MaterialCommunityIcons
                      name="chevron-left"
                      size={44}
                      color={theme.colors.text_light}
                      style={{
                        opacity:
                          groupByDateKeysArray.length - 1 > currentIndex
                            ? 1
                            : 0.2,
                      }}
                    />
                  </TouchableOpacity>

                  <TitleDateText>
                    {breastCurrent && titleDate(breastCurrent[0].startTime)}
                  </TitleDateText>
                  <TouchableOpacity
                    onPress={() => {
                      if (currentIndex > 0) {
                        setCurrentIndex(currentIndex - 1)
                        return
                      }
                    }}
                    style={{marginRight: -10}}>
                    <MaterialCommunityIcons
                      name="chevron-right"
                      size={44}
                      color={theme.colors.text_light}
                      style={{opacity: currentIndex > 0 ? 1 : 0.2}}
                    />
                  </TouchableOpacity>
                </TitleDateView>

                {breastCurrent?.length > 0 &&
                  breastCurrent.map(breast => (
                    <BoxBreastfeedingView key={breast.id}>
                      <BoxBreastfeedView>
                        <View>
                          <BoxImageMamaView>
                            {breast.leftBreast && <MamaEsquerda />}
                            {breast.rightBreast && <MamaDireita />}
                          </BoxImageMamaView>
                          <BoxColumnView>
                            <HeadText style={{marginTop: 2}}>Mama</HeadText>
                            <HeadText>
                              {breast.rightBreast ? 'direita' : 'esquerda'}
                            </HeadText>
                          </BoxColumnView>
                        </View>

                        <BoxColumnView>
                          <HeadText>Duração</HeadText>
                          <BodyText>
                            {hoursMinutesSecondsBetweenTwoDates(
                              breast.endTime,
                              breast.startTime,
                            )}
                          </BodyText>
                        </BoxColumnView>

                        <BoxColumnView>
                          <HeadText>Período</HeadText>
                          <BodyText>
                            {periodHoursMinutesBetweenTwoDates(
                              breast.endTime,
                              breast.startTime,
                            )}
                          </BodyText>
                        </BoxColumnView>
                      </BoxBreastfeedView>

                      <BoxChildView>
                        <HeadChildText>{breast.childName}</HeadChildText>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('BreastfeedHistoryEdit', {
                              breast,
                            })
                          }}>
                          <ButtonDeleteView>
                            <MaterialCommunityIcons
                              name="pencil"
                              size={20}
                              color={theme.colors.text_light}
                            />
                            <BodyText>Editar</BodyText>
                          </ButtonDeleteView>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => {
                            setBreastfeedIdDelete(breast.id)
                            setShowModalConfirmAction(true)
                          }}>
                          <ButtonDeleteView>
                            <MaterialCommunityIcons
                              name="close"
                              size={20}
                              color={theme.colors.text_light}
                            />
                            <BodyText>Excluir</BodyText>
                          </ButtonDeleteView>
                        </TouchableOpacity>
                      </BoxChildView>
                    </BoxBreastfeedingView>
                  ))}

                <ViewButton>
                  <ButtonComponent
                    title="Perguntas frequentes"
                    backgroundColor={theme.colors.text_light}
                    color={theme.colors.primary}
                    borderColor={theme.colors.text_light}
                    onPress={() => navigation.navigate('FrequentAsk')}
                    height={44}
                  />
                </ViewButton>

                <ChatBoxComponent />

                <ButtonNewChildView>
                  <ButtonComponent
                    title="Cadastrar uma nova criança"
                    backgroundColor={theme.colors.text_light}
                    color={theme.colors.dark_grey}
                    onPress={() => {
                      navigation.navigate('BreastfeedGetNameGenre')
                    }}
                    loading={false}
                  />
                </ButtonNewChildView>
              </ContentScrollView>
            </ScrollView>
          </ContainerScrollView>
        </Container>
      </ImageBackground>

      <ModalConfirmActionComponent
        visible={showModalConfirmAction}
        handleModalVisible={setShowModalConfirmAction}
        askText={askDeleteBreastfeedText}
        handleActionYes={() => {
          dispatch(breastfeedingBreastfeedDeleteRequest(breastfeedIdDelete))
        }}
        statusAction={breastfeedDeleteStatus}
      />
    </View>
  )
}

export default BreastfeedHistoryScreen
