import React, {useState, useMemo, useEffect} from 'react'
import {
  View,
  ImageBackground,
  TouchableNativeFeedback,
  Text,
} from 'react-native'
import ModalSelector from 'react-native-modal-selector'
import {RFValue} from 'react-native-responsive-fontsize'
import {useDispatch, useSelector} from 'react-redux'

import {useTheme} from 'styled-components'

import BackgroundPregnant from '@/assets/backgroundHome/background_gestante.png'
import IconDiaryWhite from '@/assets/diary/icon_diary_white.svg'
import LogoSvg1 from '@/assets/logos/Logo-1.svg'
import ButtonComponent from '@/components/Button'
import {useAuth} from '@/hooks/auth'
import {
  ScrollView,
  Container,
  HeaderView,
  GoBackView,
  TitleView,
  Title,
  BoxView,
  BoxText,
  MouthText,
  ChooseDayText,
} from '@/screens/ChooseWeek/ChooseWeekScreen.styles'
import {
  weekGetStartDateUser,
  weekInitialDateUserRequestStatus,
  weekSetInitialDateUserRequest,
} from '@/store/Week/WeekCreators'
import {selectWeekStartDateUserStatus} from '@/store/Week/WeekSelectors'
import {EActionTypeStatus} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {
  TStackNavigationProp,
  TStackScreenParam,
} from '@/types/application/Navigation/NavigationApplication.types'
import {monthNames} from '@/utils/months'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native'

export interface IChooseWeekInitialDateParams {
  weekNumber: number
}

const ChooseWeekInitialDateScreen: React.FC = () => {
  const theme = useTheme()
  const navigation = useNavigation<TStackNavigationProp>()
  const {user} = useAuth()
  const dispatch = useDispatch()
  const {params} =
    useRoute<RouteProp<TStackScreenParam, 'ChooseWeekInitialDate'>>()
  const weekStartUserStatus = useSelector(selectWeekStartDateUserStatus)

  const days = useMemo(() => {
    return Array.from({length: 31}, (_, i) => ({
      key: ++i,
      label: i.toString(),
    }))
  }, [])

  const mouths = useMemo(() => {
    return Array.from({length: 12}, (_, i) => ({
      key: ++i,
      label: monthNames[--i],
    }))
  }, [])

  const years = useMemo(() => {
    const date = new Date()
    date.getFullYear()

    const yearActual = date.getFullYear()

    return [
      {key: yearActual - 1, label: (yearActual - 1).toString()},
      {key: yearActual, label: yearActual.toString()},
    ]
  }, [])

  const [daySelected, setDaySelected] = useState<number>(0)
  const [mouthSelected, setMouthSelected] = useState<number>(0)
  const [yearSelected, setYearSelected] = useState<number>(years[1].key)

  const disableButtonNext = useMemo(() => {
    return !(daySelected > 0 && mouthSelected > 0)
  }, [daySelected, mouthSelected])

  useEffect(() => {
    if (weekStartUserStatus?.status === EActionTypeStatus.Success) {
      navigation.navigate('WeekDescription', {weekNumber: params.weekNumber})
      weekInitialDateUserRequestStatus({
        status: EActionTypeStatus.Waiting,
        message: '',
      })
    }
  }, [
    dispatch,
    navigation,
    params.weekNumber,
    user.id,
    weekStartUserStatus?.status,
  ])

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        resizeMode="cover"
        source={BackgroundPregnant}
        style={{
          justifyContent: 'flex-start',
          flex: 1,
        }}>
        <ScrollView>
          <Container>
            <HeaderView>
              <TouchableNativeFeedback
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
              </TouchableNativeFeedback>
              <LogoSvg1 width={RFValue(200)} height={RFValue(44)} />

              <TouchableNativeFeedback
                onPress={() => {
                  navigation.goBack()
                }}>
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={32}
                  color={theme.colors.primary}
                />
              </TouchableNativeFeedback>
            </HeaderView>

            <TitleView>
              <IconDiaryWhite />

              <Title>Semana a semana</Title>
            </TitleView>

            <BoxView backgroundColor={theme.colors.secondary_light}>
              <BoxText color={theme.colors.primary}>
                {`Coloque a data de início da ${params.weekNumber}ª semana`}
              </BoxText>
            </BoxView>

            <MouthText>Dia</MouthText>

            <ModalSelector
              data={days}
              initValue="Escolha o dia"
              onChange={option => {
                setDaySelected(option.key)
              }}
              cancelText="Fechar"
              selectStyle={{
                borderColor: 'white',
                width: 190,
                borderRadius: 20,
              }}
              initValueTextStyle={{
                color: theme.colors.text_light,
                fontWeight: '300',
              }}
              selectTextStyle={{
                color: theme.colors.secondary_light,
                fontWeight: 'bold',
              }}
              optionTextStyle={{color: theme.colors.primary}}
              header={
                <View style={{padding: 16, alignItems: 'center'}}>
                  <Text style={{fontSize: 16, color: theme.colors.primary}}>
                    {`Escolha o dia que iniciou a ${params.weekNumber}ª semana?`}
                  </Text>
                </View>
              }
            />
            <MouthText>Mês</MouthText>
            <ModalSelector
              data={mouths}
              initValue="Escolha o mês"
              onChange={option => {
                setMouthSelected(option.key)
              }}
              cancelText="Fechar"
              selectStyle={{
                borderColor: 'white',
                width: 190,
                borderRadius: 20,
              }}
              initValueTextStyle={{
                color: theme.colors.text_light,
                fontWeight: '300',
              }}
              selectTextStyle={{
                color: theme.colors.secondary_light,
                fontWeight: 'bold',
              }}
              optionTextStyle={{
                color: theme.colors.primary,
                paddingHorizontal: 24,
              }}
              header={
                <View style={{padding: 16, alignItems: 'center'}}>
                  <Text style={{fontSize: 16, color: theme.colors.primary}}>
                    {`Escolha o mês que iniciou a ${params.weekNumber}ª semana?`}
                  </Text>
                </View>
              }
            />

            <MouthText>Ano</MouthText>
            <ModalSelector
              data={years}
              initValue={years[1].label}
              initValueTextStyle={{color: theme.colors.secondary_light}}
              onChange={option => {
                setYearSelected(option.key)
              }}
              cancelText="Fechar"
              selectStyle={{
                borderColor: 'white',
                width: 190,
                borderRadius: 20,
              }}
              selectTextStyle={{
                color: theme.colors.secondary_light,
                fontWeight: 'bold',
              }}
              optionTextStyle={{
                color: theme.colors.primary,
              }}
              header={
                <View style={{padding: 16, alignItems: 'center'}}>
                  <Text style={{fontSize: 16, color: theme.colors.primary}}>
                    {`Escolha o ano que iniciou a ${params.weekNumber}ª semana?`}
                  </Text>
                </View>
              }
            />

            <View style={{width: '100%', marginVertical: 24}}>
              <ButtonComponent
                title={
                  weekStartUserStatus?.status === EActionTypeStatus.Busy
                    ? 'Salvando...'
                    : 'Próximo'
                }
                backgroundColor={theme.colors.text_light}
                color={theme.colors.primary}
                onPress={() => {
                  const weekInitialUser = {
                    id: 0,
                    userId: user.id || 0,
                    weekNumber: params.weekNumber,
                    weekStartDate: new Date(
                      `${yearSelected}-${mouthSelected
                        .toString()
                        .padStart(2, '0')}-${daySelected
                        .toString()
                        .padStart(2, '0')}`,
                    ),
                  }

                  dispatch(weekSetInitialDateUserRequest(weekInitialUser))
                }}
                loading={false}
                disabled={
                  disableButtonNext ||
                  weekStartUserStatus?.status === EActionTypeStatus.Busy
                }
              />

              {weekStartUserStatus?.status === EActionTypeStatus.Error && (
                <MouthText>{weekStartUserStatus?.message}</MouthText>
              )}
            </View>
          </Container>
        </ScrollView>
      </ImageBackground>
    </View>
  )
}

export default ChooseWeekInitialDateScreen
