import React, {useEffect, useState, useCallback} from 'react'
import {
  AppState,
  ImageBackground,
  View,
  TouchableWithoutFeedback,
} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'
import {useDispatch, useSelector} from 'react-redux'

import {useTheme} from 'styled-components'

import BackgroundBreastfeed from '@/assets/backgroundHome/background_lactante.png'
import ClockSVG from '@/assets/breastfeeding/icon-time.svg'
import MamaDireita from '@/assets/breastfeeding/mama-direita.svg'
import MamaEsquerda from '@/assets/breastfeeding/mama-esquerda.svg'
import IconDiaryWhite from '@/assets/diary/icon_diary_white.svg'
import LogoSvg2 from '@/assets/logos/Logo-2.svg'
import ButtonComponent from '@/components/Button'
import ChatBoxComponent from '@/components/ChatBox'
import {
  ScrollView,
  Container,
  HeaderView,
  GoBackView,
  TitleView,
  Title,
  BoxView,
  SubTitleText,
  BoxText,
  BoxBreast,
  BoxBreastTextView,
  BreastSideText,
  BoxTimeView,
  BoxTimeText,
  ButtonView,
  ViewButton,
} from '@/screens/BreastfeedEndBreastfeeding/BreastfeedEndBreastfeedingScreen.styles'
import {
  breastfeedingBreastfeedCreateRequest,
  breastfeedingBreastfeedCreateRequestStatus,
  breastfeedingBreastfeedSetDraft,
} from '@/store/Breastfeeding/BreastfeedingCreators'
import {
  selectBreastfeedingBreastfeedCreateStatus,
  selectBreastfeedingBreastfeedDraft,
} from '@/store/Breastfeeding/BreastfeedingSelectors'
import {EActionTypeStatus} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {TStackNavigationProp} from '@/types/application/Navigation/NavigationApplication.types'
import {IBreastfeed} from '@/types/entities/Breastfeed/BreastfeedEntity.types'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'

export interface IBreastfeedEndScreenParams {
  screen?: string
}
var minutes = 0,
  seconds = 0
let myInterval: NodeJS.Timer

const BreastfeedEndScreen: React.FC = () => {
  const theme = useTheme()
  const dispatch = useDispatch()

  const navigation = useNavigation<TStackNavigationProp>()

  const breastfeedDraft = useSelector(selectBreastfeedingBreastfeedDraft)
  const breastfeedCreateRequestStatus = useSelector(
    selectBreastfeedingBreastfeedCreateStatus,
  )
  const [minutesSeconds, setMinutesSeconds] = useState('')

  const handleDiffMinutesDate = useCallback(
    (dateEnd: Date, dateStart: Date) => {
      let diff = (dateEnd.getTime() - dateStart.getTime()) / 1000
      diff /= 60
      const minutes = Math.abs(Math.round(diff))
      return minutes
    },
    [],
  )

  const startTimer = useCallback(() => {
    const startTime = new Date()

    myInterval = setInterval(function () {
      const currentTime = new Date()

      seconds = currentTime.getSeconds() - startTime.getSeconds()

      if (seconds < 0) {
        seconds += 60
      } else if (seconds === 0) {
        minutes = currentTime.getMinutes() - startTime.getMinutes()
      }

      setMinutesSeconds(
        minutes.toString().padStart(2, '0') +
          ':' +
          seconds.toString().padStart(2, '0'),
      )
    }, 5)
  }, [])

  useEffect(() => {
    return () => {
      clearInterval(myInterval)
    }
  }, [])

  // useEffect(() => {
  //   const subscription = AppState.addEventListener('change', nextAppState => {
  //     if (breastfeedDraft?.startTime && nextAppState === 'active') {
  //       const minutesCurrent = handleDiffMinutesDate(
  //         new Date(),
  //         new Date(breastfeedDraft?.startTime),
  //       )
  //       minutes = minutesCurrent
  //     }
  //   })

  //   return () => {
  //     subscription.remove()
  //   }
  // }, [breastfeedDraft, handleDiffMinutesDate])

  useEffect(() => {
    minutes = 0
    seconds = 0
    startTimer()
  }, [startTimer])

  useEffect(() => {
    if (breastfeedCreateRequestStatus.status === EActionTypeStatus.Success) {
      dispatch(
        breastfeedingBreastfeedCreateRequestStatus({
          status: EActionTypeStatus.Waiting,
        }),
      )

      navigation.reset({
        routes: [{name: 'BreastfeedHistory', params: {update: true}}],
      })
    }
  }, [breastfeedCreateRequestStatus.status, dispatch, navigation])

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        resizeMode="cover"
        source={BackgroundBreastfeed}
        style={{
          justifyContent: 'flex-start',
          flex: 1,
        }}>
        <ScrollView>
          <Container>
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
              <LogoSvg2 width={RFValue(200)} height={RFValue(44)} />

              <TouchableWithoutFeedback onPress={() => {}}>
                <GoBackView>
                  <></>
                </GoBackView>
              </TouchableWithoutFeedback>
            </HeaderView>

            <TitleView>
              <IconDiaryWhite />

              <Title>Amamentação</Title>
            </TitleView>

            <SubTitleText>Registrar uma amamentação no Diário</SubTitleText>

            <BoxView backgroundColor={theme.colors.secondary}>
              <BoxText color={theme.colors.text_light}>
                Mama selecionada
              </BoxText>
              <BoxBreast selected={true}>
                {breastfeedDraft?.leftBreast && (
                  <>
                    <MamaEsquerda />

                    <BoxBreastTextView>
                      <BreastSideText> Mama</BreastSideText>
                      <BreastSideText> Esquerda</BreastSideText>
                    </BoxBreastTextView>
                  </>
                )}
                {breastfeedDraft?.rightBreast && (
                  <>
                    <MamaDireita />

                    <BoxBreastTextView>
                      <BreastSideText> Mama</BreastSideText>
                      <BreastSideText> Direita</BreastSideText>
                    </BoxBreastTextView>
                  </>
                )}
              </BoxBreast>
            </BoxView>

            <BoxTimeView>
              <ClockSVG />
              <View style={{marginLeft: 16, flexDirection: 'row'}}>
                <BoxTimeText>{minutesSeconds}</BoxTimeText>

                {/* <BoxTimeText>
                  {minutes.toString().padStart(2, '0')}:
                </BoxTimeText>
                <BoxTimeText>{second.toString().padStart(2, '0')}</BoxTimeText> */}
              </View>
            </BoxTimeView>

            <ButtonView>
              <ButtonComponent
                title="Encerrar amamentação"
                backgroundColor={theme.colors.blue}
                color={theme.colors.text_light}
                borderColor={theme.colors.blue}
                onPress={() => {
                  const breastfeed: Partial<IBreastfeed> = {
                    endTime: new Date().toISOString(),
                  }
                  dispatch(breastfeedingBreastfeedSetDraft(breastfeed))
                  clearInterval(myInterval)
                  dispatch(breastfeedingBreastfeedCreateRequest())
                  //navigation.navigate('BreastfeedSaveDiaryBreastfeeding')
                }}
              />
            </ButtonView>

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
          </Container>
        </ScrollView>
      </ImageBackground>
    </View>
  )
}

export default BreastfeedEndScreen
