import React, {useCallback, useState, useEffect} from 'react'
import {View, ImageBackground, TouchableNativeFeedback} from 'react-native'
import Modal from 'react-native-modal'
import {RFValue} from 'react-native-responsive-fontsize'
import {batch, useDispatch, useSelector} from 'react-redux'

import * as Analytics from 'expo-firebase-analytics'
import {useTheme} from 'styled-components'

import BackgroundPregnant from '@/assets/backgroundHome/background_gestante.png'
import IconDiaryWhite from '@/assets/diary/icon_diary_white.svg'
import LogoSvg1 from '@/assets/logos/Logo-1.svg'
import ButtonComponent from '@/components/Button'
import {weekNumber} from '@/screens/Week/weekScreen.data'
import {
  ScrollView,
  ContainerScrollView,
  ContentScrollView,
  Container,
  HeaderView,
  TitleView,
  Title,
  BoxWeekView,
  BoxGoToWeekDescriptionView,
  WeekText,
  ButtonDeleteWeekView,
  ViewModal,
  ButtonCloseView,
  ModalAskText,
  ButtonsView,
  ButtonView,
  ButtonText,
} from '@/screens/Week/WeekScreen.styles'
import {
  weekDeleteInitialDateUserRequest,
  weekDeleteStartUserStatus,
  weekReset,
} from '@/store/Week/WeekCreators'
import {
  selectWeekDeleteStartDateUserStatus,
  selectWeekStartDateUser,
  selectWeekStartDateUserStatus,
} from '@/store/Week/WeekSelectors'
import {EActionTypeStatus} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {TStackNavigationProp} from '@/types/application/Navigation/NavigationApplication.types'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {useFocusEffect, useNavigation} from '@react-navigation/native'

const WeekScreen: React.FC = () => {
  const theme = useTheme()
  const navigation = useNavigation<TStackNavigationProp>()

  const [isModalVisible, setModalVisible] = useState(false)
  const weekStartDateUser = useSelector(selectWeekStartDateUser)
  const weekStartUserStatus = useSelector(selectWeekStartDateUserStatus)

  const weekDeleteUserStatus = useSelector(selectWeekDeleteStartDateUserStatus)

  const dispatch = useDispatch()

  const dateFormat = useCallback((date: Date = new Date()) => {
    return new Intl.DateTimeFormat('pt-BR', {timeZone: 'UTC'}).format(
      new Date(date),
    )
  }, [])

  function addWeeks(weeks: number, date = new Date()) {
    date.setDate(date.getDate() + weeks * 7)

    return date
  }

  function subWeeks(weeks: number, date = new Date()) {
    date.setDate(date.getDate() - weeks * 7)

    return date
  }

  const getDateWeekByWeekNumber = useCallback(
    (weekNumber: number) => {
      const startDate = new Date(weekStartDateUser?.weekStartDate)

      if (weekNumber < weekStartDateUser?.weekNumber) {
        const date = subWeeks(
          weekStartDateUser?.weekNumber - weekNumber,
          startDate,
        )
        return dateFormat(date)
      }

      if (weekNumber > weekStartDateUser?.weekNumber) {
        const date = addWeeks(
          weekNumber - weekStartDateUser?.weekNumber,
          startDate,
        )
        return dateFormat(date)
      }

      return dateFormat(weekStartDateUser?.weekStartDate)
    },
    [
      dateFormat,
      weekStartDateUser?.weekNumber,
      weekStartDateUser?.weekStartDate,
    ],
  )

  const isWeekActual = useCallback(
    (weekNumber: number) => {
      const startDate = new Date(weekStartDateUser?.weekStartDate + 'T00:00:00')
      let date = startDate || new Date()

      if (weekNumber < weekStartDateUser?.weekNumber) {
        date = subWeeks(weekStartDateUser?.weekNumber - weekNumber, startDate)
      }

      if (weekNumber > weekStartDateUser?.weekNumber) {
        date = addWeeks(weekNumber - weekStartDateUser?.weekNumber, startDate)
      }

      const dateActual = new Date()
      if (date > dateActual) {
        return false
      }

      const differenceInTime = dateActual.getTime() - date.getTime()
      const differenceInDays = differenceInTime / (1000 * 3600 * 24)

      if (differenceInDays >= 7) {
        return false
      }

      return true
    },
    [weekStartDateUser?.weekNumber, weekStartDateUser?.weekStartDate],
  )

  useEffect(() => {
    if (weekDeleteUserStatus?.status === EActionTypeStatus.Success) {
      setModalVisible(false)

      batch(() => {
        dispatch(
          weekDeleteStartUserStatus({
            status: EActionTypeStatus.Waiting,
          }),
        )
        dispatch(weekReset())
      })

      navigation.reset({
        routes: [{name: 'ChooseWeek'}],
      })
    }
  }, [dispatch, navigation, weekDeleteUserStatus?.status])

  useFocusEffect(
    React.useCallback(() => {
      if (Object.keys(weekStartDateUser).length === 0) {
        navigation.navigate('ChooseWeek')
      }

      return () => {}
    }, [navigation, weekStartDateUser]),
  )

  useEffect(() => {
    Analytics.logEvent('screen_view', {
      screen_name: 'Tela Semana a Semana',
    })
  }, [])

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        resizeMode="cover"
        source={BackgroundPregnant}
        style={{
          justifyContent: 'flex-start',
          flex: 1,
        }}>
        <Container>
          <HeaderView>
            <LogoSvg1 width={RFValue(200)} height={RFValue(44)} />
          </HeaderView>
          <ContainerScrollView>
            <ScrollView>
              <ContentScrollView>
                <TitleView>
                  <IconDiaryWhite />

                  <Title>Semana a semana</Title>
                </TitleView>

                <BoxWeekView>
                  {weekNumber.map((number, index) => (
                    <TouchableNativeFeedback
                      onPress={() => {
                        navigation.navigate('WeekDescription', {
                          weekNumber: index + 1,
                        })

                        Analytics.logEvent('screen_view', {
                          screen_name: `Tela Semana${index + 1}`,
                        })
                      }}
                      key={index}>
                      <BoxGoToWeekDescriptionView
                        weekActual={isWeekActual(index + 1)}>
                        <MaterialCommunityIcons
                          name="check"
                          size={22}
                          color={
                            isWeekActual(index + 1)
                              ? theme.colors.text_light
                              : theme.colors.primary
                          }
                        />

                        <WeekText weekActual={isWeekActual(index + 1)}>
                          {number}ª semana -{' '}
                          {getDateWeekByWeekNumber(index + 1)}
                        </WeekText>

                        <MaterialCommunityIcons
                          name="chevron-right"
                          size={32}
                          color={
                            isWeekActual(index + 1)
                              ? theme.colors.text_light
                              : theme.colors.primary
                          }
                        />
                      </BoxGoToWeekDescriptionView>
                    </TouchableNativeFeedback>
                  ))}
                  <ButtonDeleteWeekView>
                    <ButtonComponent
                      title="Excluir minhas semanas"
                      backgroundColor={theme.colors.text_light}
                      borderColor={theme.colors.primary}
                      color={theme.colors.primary}
                      onPress={() => {
                        setModalVisible(true)
                      }}
                      height={50}
                    />
                  </ButtonDeleteWeekView>
                </BoxWeekView>
              </ContentScrollView>
            </ScrollView>
          </ContainerScrollView>
        </Container>

        <View>
          <Modal isVisible={isModalVisible}>
            <ViewModal>
              <TouchableNativeFeedback
                onPress={() => {
                  setModalVisible(false)
                }}>
                <ButtonCloseView>
                  <MaterialCommunityIcons
                    name="close"
                    size={22}
                    color={theme.colors.primary}
                  />
                </ButtonCloseView>
              </TouchableNativeFeedback>

              <ModalAskText>
                Você realmente deseja excluir sua data inicial? Após a exclusão
                é preciso inserir uma nova data para visualizar as semanas.
              </ModalAskText>

              <ButtonsView>
                <TouchableNativeFeedback
                  onPress={() => {
                    if (weekStartDateUser?.id) {
                      dispatch(
                        weekDeleteStartUserStatus({
                          status: EActionTypeStatus.Busy,
                        }),
                      )
                      dispatch(
                        weekDeleteInitialDateUserRequest(weekStartDateUser.id),
                      )
                    }
                  }}>
                  <ButtonView>
                    {weekStartUserStatus?.status !== EActionTypeStatus.Busy && (
                      <ButtonText>Sim</ButtonText>
                    )}
                    {weekStartUserStatus?.status === EActionTypeStatus.Busy && (
                      <ButtonText>Excluindo...</ButtonText>
                    )}
                  </ButtonView>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback
                  onPress={() => {
                    setModalVisible(false)
                  }}>
                  <ButtonView>
                    <ButtonText>Não</ButtonText>
                  </ButtonView>
                </TouchableNativeFeedback>
              </ButtonsView>
            </ViewModal>
          </Modal>
        </View>
      </ImageBackground>
    </View>
  )
}

export default WeekScreen
