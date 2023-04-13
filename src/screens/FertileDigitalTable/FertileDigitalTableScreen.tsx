import React, {useState, useEffect, useMemo} from 'react'
import {
  TouchableWithoutFeedback,
  ImageBackground,
  ActivityIndicator,
} from 'react-native'
import {Calendar} from 'react-native-calendars'
import {RFValue} from 'react-native-responsive-fontsize'
import {batch, useDispatch, useSelector} from 'react-redux'

import {useTheme} from 'styled-components'

import BackgroundTentante from '@/assets/backgroundHome/background_tentante.png'
import LogoSvg5 from '@/assets/logos/Logo-5.svg'
import IconDiaryPurple from '@/assets/menu/icon_diary_azul.svg'
import ButtonComponent from '@/components/Button'
import ModalConfirmActionComponent from '@/components/ModalConfirmAction'
import {useAuth} from '@/hooks/auth'
import {
  Container,
  ScrollView,
  ContainerScrollView,
  ContentScrollView,
  Content,
  HeaderView,
  GoBackView,
  TitleView,
  Title,
  SubTitle,
  Text,
  CalendarView,
  CicloText,
  LegendView,
  LegendItemView,
  LegendText,
  BoxFertileCycleView,
  TitleFertileCycleText,
  TextFertileCycleText,
  BoxDayFertileCycleView,
  TextBoldText,
  ButtonView,
} from '@/screens/FertileDigitalTable/FertileDigitalTableScreen.styles'
import {
  fertileCycleCreate,
  fertileCycleCreateStatus,
  fertileCycleDelete,
  fertileCycleDeleteStatus,
  fertileCycleGet,
  fertileCycleGetStatus,
} from '@/store/FertileCycle/FertileCycleCreators'
import {
  selectFertileCycleMenstruationDate,
  selectFertileCyclesCreateStatus,
  selectFertileCyclesDeleteStatus,
  selectFertileCyclesGetStatus,
} from '@/store/FertileCycle/FertileCycleSelectors'
import {EActionTypeStatus} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {
  TStackNavigationProp,
  TStackScreenParam,
} from '@/types/application/Navigation/NavigationApplication.types'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native'

export interface IFertileDigitalTableScreenParam {
  isMenstruationDateSave: boolean
  fertileCycleId?: number
}

const FertileDigitalTableScreen: React.FC = () => {
  const {params} =
    useRoute<RouteProp<TStackScreenParam, 'FertileDigitalTable'>>()

  const {
    isMenstruationDateSave,
    fertileCycleId,
  }: IFertileDigitalTableScreenParam = params

  const navigation = useNavigation<TStackNavigationProp>()
  const theme = useTheme()
  const dispatch = useDispatch()
  const {user} = useAuth()

  const [listDate, setListDate] = useState<any>()
  const [endDate, setEndDate] = useState<any>()
  const [showModalConfirmAction, setShowModalConfirmAction] = useState(false)
  const [textFertileCycle, setTextFertileCycle] = useState('')
  const [textDayMoreFertile, setTextDayMoreFertile] = useState('')

  const askDeleteFertileCycleText = useMemo(() => {
    return 'Você realmente deseja excluir a ciclo fértil?'
  }, [])

  const menstruationDateAndMenstrualCycleEntered = useSelector(
    selectFertileCycleMenstruationDate,
  )

  const selectedFertileCycleCreateStatus = useSelector(
    selectFertileCyclesCreateStatus,
  )

  const selectedFertileCycleDeleteStatus = useSelector(
    selectFertileCyclesDeleteStatus,
  )

  const fertileCyclesGetStatus = useSelector(selectFertileCyclesGetStatus)

  const textButton = useMemo(() => {
    if (isMenstruationDateSave) {
      return 'Voltar para o histórico'
    }
    return 'Salvar no Diário de Ciclos Férteis'
  }, [isMenstruationDateSave])

  useEffect(() => {
    if (menstruationDateAndMenstrualCycleEntered?.menstruationDate) {
      const dateCurrent = new Date(
        menstruationDateAndMenstrualCycleEntered?.menstruationDate.getTime(),
      )

      const dateMenstruation = new Date(
        menstruationDateAndMenstrualCycleEntered?.menstruationDate.getTime(),
      )

      const dateNextMenstruation = dateMenstruation.setDate(
        dateMenstruation.getDate() +
          menstruationDateAndMenstrualCycleEntered?.menstrualCycleDaysToAverage,
      )

      const cycle =
        menstruationDateAndMenstrualCycleEntered?.menstrualCycleDaysToAverage -
        14

      const dataFertile = dateCurrent.setDate(dateCurrent.getDate() + cycle)

      const optionsFertileWeekDay: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        timeZone: 'UTC',
      }
      const optionsFertile: Intl.DateTimeFormatOptions = {
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
      }

      const weekday = new Intl.DateTimeFormat(
        'pt-BR',
        optionsFertileWeekDay,
      ).format(dataFertile)

      const dateFull = `${weekday} ${new Intl.DateTimeFormat(
        'pt-BR',
        optionsFertile,
      ).format(dataFertile)}`

      setTextDayMoreFertile(dateFull)

      const inicial = dateCurrent.setDate(new Date(dataFertile).getDate() - 3)
      const final = dateCurrent.setDate(new Date(dateCurrent).getDate() + 6)

      const options: Intl.DateTimeFormatOptions = {
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
      }
      const initialFertileFormat = new Intl.DateTimeFormat(
        'pt-BR',
        options,
      ).format(inicial)

      const endFertileFormat = new Intl.DateTimeFormat('pt-BR', options).format(
        final,
      )

      setTextFertileCycle(`de ${initialFertileFormat} a ${endFertileFormat}`)
      setEndDate(final)

      const initialDate = new Date(inicial).toISOString().split('T')[0]

      let list: any = {
        [menstruationDateAndMenstrualCycleEntered?.menstruationDate
          .toISOString()
          .split('T')[0]]: {
          selected: true,
          disableTouchEvent: true,
          selectedColor: '#D13569',
          selectedTextColor: '#fff',
          color: '#D13569',
          textColor: theme.colors.text_light,
          startingDay: true,
          endingDay: true,
        },
        [initialDate]: {
          color: '#FF89001A',
          textColor: theme.colors.primary,
          startingDay: true,
        },
      }

      for (let i = 1; i < 7; i++) {
        const _date = new Date(inicial)

        const date = _date.setDate(new Date(inicial).getDate() + i)

        list = {
          ...list,
          [new Date(date).toISOString().split('T')[0]]: {
            color: i === 3 ? '#FF8900' : '#FF89001A',
            textColor: i === 3 ? theme.colors.text_light : theme.colors.primary,
            endingDay: i === 6,
          },
        }
      }

      list = {
        ...list,
        [new Date(dateNextMenstruation).toISOString().split('T')[0]]: {
          selected: true,
          disableTouchEvent: true,
          selectedColor: '#D13569',
          selectedTextColor: '#fff',
          color: '#D13569',
          textColor: theme.colors.text_light,
          startingDay: true,
          endingDay: true,
        },
      }

      setListDate(list)
    }
  }, [
    menstruationDateAndMenstrualCycleEntered?.menstrualCycleDaysToAverage,
    menstruationDateAndMenstrualCycleEntered?.menstruationDate,
    theme.colors.primary,
    theme.colors.text_light,
  ])

  useEffect(() => {
    if (
      selectedFertileCycleCreateStatus?.status === EActionTypeStatus.Success
    ) {
      batch(() => {
        dispatch(
          fertileCycleCreateStatus({
            status: EActionTypeStatus.Waiting,
            message: '',
          }),
        )

        dispatch(fertileCycleGet(user.id))
      })
    }
  }, [selectedFertileCycleCreateStatus, navigation, dispatch, user.id])

  useEffect(() => {
    if (
      selectedFertileCycleDeleteStatus?.status === EActionTypeStatus.Success
    ) {
      batch(() => {
        dispatch(
          fertileCycleDeleteStatus({
            status: EActionTypeStatus.Waiting,
            message: '',
          }),
        )

        dispatch(fertileCycleGet(user.id))
      })
    }
  }, [dispatch, navigation, selectedFertileCycleDeleteStatus?.status, user.id])

  useEffect(() => {
    if (fertileCyclesGetStatus?.status === EActionTypeStatus.Success) {
      dispatch(
        fertileCycleGetStatus({
          status: EActionTypeStatus.Waiting,
          message: '',
        }),
      )
      navigation.navigate('FertileDigitalTableHistoric')
    }
  }, [dispatch, fertileCyclesGetStatus?.status, navigation])

  const RenderCalendar = () => {
    if (
      !endDate ||
      !listDate ||
      !menstruationDateAndMenstrualCycleEntered?.menstruationDate
    ) {
      return <ActivityIndicator color="#AD9BE6" size="large" />
    }

    return (
      <CalendarView>
        <CicloText>Fases do ciclo menstrual atual</CicloText>

        <Calendar
          current={new Date(endDate).toISOString()}
          markingType={'period'}
          markedDates={listDate}
          disabledDaysIndexes={[0, 6]}
          theme={{
            textInactiveColor: '#ccc',
            monthTextColor: theme.colors.primary,
            textSectionTitleDisabledColor: theme.colors.primary,
            textSectionTitleColor: theme.colors.primary,
            arrowColor: theme.colors.primary,
            dayTextColor: theme.colors.primary,
            textDayFontFamily: theme.fonts.bold,
            textMonthFontFamily: theme.fonts.bold,
            textDayHeaderFontFamily: theme.fonts.bold,
            todayTextColor: theme.colors.text_light,
            todayBackgroundColor: theme.colors.secondary_light,
            indicatorColor: theme.colors.primary,
          }}
        />

        <LegendView>
          <LegendItemView backgroundColor="#D13569">
            <LegendText>Menstruação</LegendText>
          </LegendItemView>
          <LegendItemView backgroundColor="#FF89001A">
            <LegendText>Período fértil</LegendText>
          </LegendItemView>
          <LegendItemView backgroundColor="#FF8900">
            <LegendText>Ovulação</LegendText>
          </LegendItemView>
        </LegendView>

        <BoxFertileCycleView backgroundColor="#FF89001A">
          <BoxDayFertileCycleView backgroundColor="#FF8900">
            <TextFertileCycleText color="#FFFFFF" fontSize={14}>
              <TextBoldText>SEU DIA MAIS FÉRTIL</TextBoldText> NESTE CICLO ESTÁ
              PREVISTO PARA <TextBoldText>{textDayMoreFertile}</TextBoldText>
            </TextFertileCycleText>
          </BoxDayFertileCycleView>

          <TitleFertileCycleText color="#FF8900">
            Período fértil
          </TitleFertileCycleText>
          <TitleFertileCycleText color="#FF8900">
            {textFertileCycle}
          </TitleFertileCycleText>

          <TextFertileCycleText color="#FF8900" fontSize={16}>
            Durante a ovulação, o corpo produz uma secreção incolor e pegajosa
            para facilitar o percurso do espermatozoide e que funciona como
            lubrificante.
          </TextFertileCycleText>
          <TextFertileCycleText color="#FF8900">
            Sua libido deve aumentar bastante. Aproveite!
          </TextFertileCycleText>
        </BoxFertileCycleView>

        <ButtonView>
          <ButtonComponent
            title={textButton}
            backgroundColor={theme.colors.secondary_light}
            color={theme.colors.primary}
            onPress={() => {
              if (isMenstruationDateSave) {
                navigation.navigate('FertileDigitalTableHistoric')
                return
              }
              dispatch(
                fertileCycleCreate({
                  user_id: user.id,
                  menstruationDate:
                    menstruationDateAndMenstrualCycleEntered?.menstruationDate,
                  menstrualCycleDaysToAverage:
                    menstruationDateAndMenstrualCycleEntered?.menstrualCycleDaysToAverage,
                }),
              )
            }}
            loading={
              selectedFertileCycleCreateStatus?.status ===
              EActionTypeStatus.Busy
            }
          />
        </ButtonView>

        {isMenstruationDateSave && (
          <ButtonView>
            <ButtonComponent
              title="Excluir período fértil"
              backgroundColor={theme.colors.secondary_light}
              color={theme.colors.primary}
              onPress={() => {
                setShowModalConfirmAction(true)
              }}
              loading={
                selectedFertileCycleDeleteStatus?.status ===
                EActionTypeStatus.Busy
              }
            />
          </ButtonView>
        )}
      </CalendarView>
    )
  }

  return (
    <Container>
      <ImageBackground
        resizeMode="cover"
        source={BackgroundTentante}
        style={{
          justifyContent: 'flex-start',
          flex: 1,
        }}>
        <Content>
          <HeaderView>
            <TouchableWithoutFeedback
              onPress={() => {
                if (isMenstruationDateSave) {
                  navigation.navigate('FertileDigitalTableHistoric')
                  return
                }

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

            <LogoSvg5 width={RFValue(200)} height={RFValue(44)} />

            <TouchableWithoutFeedback onPress={() => {}}>
              <GoBackView>
                <></>
              </GoBackView>
            </TouchableWithoutFeedback>
          </HeaderView>

          <ContainerScrollView>
            <ScrollView>
              <ContentScrollView>
                <TitleView>
                  <IconDiaryPurple />

                  <Title>Seu período fértil</Title>
                </TitleView>

                <SubTitle>Por que a tabelinha?</SubTitle>

                <Text>
                  A tabelinha ajuda a mulher tentante a identificar o seu
                  período fértil e traz as melhores dicas para cada fase do seu
                  ciclo
                </Text>
                {RenderCalendar()}
              </ContentScrollView>
            </ScrollView>
          </ContainerScrollView>
        </Content>
      </ImageBackground>

      <ModalConfirmActionComponent
        visible={showModalConfirmAction}
        handleModalVisible={setShowModalConfirmAction}
        askText={askDeleteFertileCycleText}
        handleActionYes={() => {
          if (fertileCycleId) {
            dispatch(fertileCycleDelete(fertileCycleId))
          }
        }}
        statusAction={selectedFertileCycleDeleteStatus}
      />
    </Container>
  )
}

export default FertileDigitalTableScreen
