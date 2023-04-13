import React, {useState, Fragment, useCallback, useMemo} from 'react'
import {View, TouchableWithoutFeedback, ImageBackground} from 'react-native'
import {Calendar, CalendarProps} from 'react-native-calendars'
import '@/lib/react-native-calendars/calendars.ts'
import ModalSelector from 'react-native-modal-selector'
import {RFValue} from 'react-native-responsive-fontsize'
import {useDispatch} from 'react-redux'

import {useTheme} from 'styled-components'

import BackgroundTentante from '@/assets/backgroundHome/background_tentante.png'
import LogoSvg5 from '@/assets/logos/Logo-5.svg'
import IconDiaryPurple from '@/assets/menu/icon_diary_azul.svg'
import ButtonComponent from '@/components/Button'
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
  ObservationText,
  ObservationText2,
  ButtonView,
  ObservationText3,
  ObservationText3Bold,
} from '@/screens/FertileDigitalTableChooseDate/FertileDigitalTableChooseDateScreen.styles'
import {fertileCycleMenstruationDate} from '@/store/FertileCycle/FertileCycleCreators'
import {TStackNavigationProp} from '@/types/application/Navigation/NavigationApplication.types'
import {useNavigation} from '@react-navigation/native'

const FertileDigitalTableChooseDateScreen: React.FC = () => {
  const navigation = useNavigation<TStackNavigationProp>()

  const theme = useTheme()
  const dispatch = useDispatch()
  const [dateSelected, setDateSelected] = useState<string>('')
  const [daySelected, setDaySelected] = useState<number>()

  const days = useMemo(() => {
    return Array.from({length: 15}, (_, i) => ({
      key: i + 24,
      label: i + 24,
    }))
  }, [])

  const onDayPress: CalendarProps['onDayPress'] = useCallback(day => {
    setDateSelected(day.dateString)
  }, [])

  const marked = useMemo(() => {
    return {
      [dateSelected]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: '#D13569',
        selectedTextColor: '#fff',
      },
    }
  }, [dateSelected])

  const renderCalendarWithSelectableDate = useCallback(() => {
    return (
      <CalendarView>
        <CicloText>
          Quantos dias dura (em média) o seu ciclo menstrual?
        </CicloText>

        <ModalSelector
          data={days}
          initValue="Escolha o dia"
          onChange={option => {
            setDaySelected(option.key)
          }}
          cancelText="Fechar"
          selectStyle={{
            borderColor: 'white',
            width: '100%',
            borderRadius: 20,
          }}
          initValueTextStyle={{
            color: theme.colors.text_light,
            fontWeight: '300',
          }}
          selectTextStyle={{
            color: theme.colors.text_light,
            fontWeight: 'bold',
          }}
          optionTextStyle={{color: theme.colors.primary}}
          header={
            <View style={{padding: 16, alignItems: 'center'}}>
              <Text style={{fontSize: 16, color: theme.colors.primary}}>
                Quantos dias dura (em média) o seu ciclo menstrual?
              </Text>
            </View>
          }
        />

        <ObservationText>
          Se o período entre as suas menstruações for menor do que 24 dias ou
          maior do que 38 dias, ela é considerada irregular. Procure seu médico
          ginecologista para te auxiliar.
        </ObservationText>

        <ObservationText2>
          (Fonte: FEBRASGO - Federação Brasileira das Associações de Ginecologia
          e Obstetrícia.)
        </ObservationText2>
        <CicloText>
          Qual foi o primeiro dia da sua última menstruação?
        </CicloText>

        <Calendar
          current={dateSelected}
          onDayPress={onDayPress}
          markedDates={marked}
          disabledDaysIndexes={[0, 6]}
          theme={{
            calendarBackground: theme.colors.primary,
            monthTextColor: theme.colors.text_light,
            dayTextColor: theme.colors.text_light,
            textColor: theme.colors.text_light,
            textSectionTitleDisabledColor: theme.colors.text_light,
            textSectionTitleColor: theme.colors.text_light,
            arrowColor: theme.colors.text_light,
            todayTextColor: theme.colors.text_light,
            todayBackgroundColor: '#706398',
            textDayFontFamily: theme.fonts.bold,
            textMonthFontFamily: theme.fonts.bold,
            textDayHeaderFontFamily: theme.fonts.bold,
          }}
        />
        <ButtonView>
          <ButtonComponent
            title="Calcular"
            backgroundColor={theme.colors.secondary_light}
            borderColor={theme.colors.secondary_light}
            color={theme.colors.primary}
            onPress={() => {
              if (daySelected) {
                dispatch(
                  fertileCycleMenstruationDate({
                    menstruationDate: new Date(dateSelected),
                    menstrualCycleDaysToAverage: daySelected,
                  }),
                )
                navigation.navigate('FertileDigitalTable', {
                  isMenstruationDateSave: false,
                })
              }
            }}
            loading={false}
            disabled={!daySelected || !dateSelected}
          />
        </ButtonView>
      </CalendarView>
    )
  }, [
    dateSelected,
    daySelected,
    days,
    dispatch,
    marked,
    navigation,
    onDayPress,
    theme.colors.primary,
    theme.colors.secondary_light,
    theme.colors.text_light,
    theme.fonts.bold,
  ])

  const RenderCalendar = useCallback(() => {
    return <Fragment>{renderCalendarWithSelectableDate()}</Fragment>
  }, [renderCalendarWithSelectableDate])

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
            <TouchableWithoutFeedback onPress={() => {}}>
              <GoBackView>
                <></>
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

                <ObservationText3>
                  <ObservationText3Bold>*Importante:</ObservationText3Bold> o
                  cálculo do seu período fértil terá como base as informações
                  que você fornecer. Sendo assim, o resultado pode ser
                  impreciso.
                </ObservationText3>
              </ContentScrollView>
            </ScrollView>
          </ContainerScrollView>
        </Content>
      </ImageBackground>
    </Container>
  )
}

export default FertileDigitalTableChooseDateScreen
