import React, {useEffect, useCallback, useState, useMemo, useRef} from 'react'
import {
  ImageBackground,
  View,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'
import {batch, useDispatch, useSelector} from 'react-redux'

import {useTheme} from 'styled-components'

import BackgroundBreastfeed from '@/assets/backgroundHome/background_lactante.png'
import MamaDireita from '@/assets/breastfeeding/mama-direita.svg'
import MamaEsquerda from '@/assets/breastfeeding/mama-esquerda.svg'
import IconDiaryWhite from '@/assets/diary/icon_diary_white.svg'
import LogoSvg2 from '@/assets/logos/Logo-2.svg'
import ButtonComponent from '@/components/Button'
import {useAuth} from '@/hooks/auth'
import CalendarModal from '@/modals/Calendar/CalendarModal'
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
  BoxView,
  BoxText,
  BoxBreast,
  BoxBreastTextView,
  BreastSideText,
  BoxDate,
  BoxEdit,
  BoxButton,
  ButtonView,
  Text,
  ViewInput,
  ContainerMask,
} from '@/screens/BreastfeedHistory/BreastfeedHistoryEditScreen.styles'
import {
  breastfeedingBreastfeedCreateRequest,
  breastfeedingBreastfeedCreateRequestStatus,
  breastfeedingBreastfeedGetRequest,
  breastfeedingBreastfeedGetRequestStatus,
  breastfeedingBreastfeedSetDraft,
  breastfeedingBreastfeedUpdateRequest,
  breastfeedingBreastfeedUpdateRequestStatus,
} from '@/store/Breastfeeding/BreastfeedingCreators'
import {
  selectBreastfeedingBreastfeed,
  selectBreastfeedingBreastfeedCreateStatus,
  selectBreastfeedingBreastfeedDraft,
  selectBreastfeedingBreastfeedStatus,
  selectBreastfeedingChildren,
  selectBreastfeedingUpdateStatus,
} from '@/store/Breastfeeding/BreastfeedingSelectors'
import {EActionTypeStatus} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {
  TStackNavigationProp,
  TStackScreenParam,
} from '@/types/application/Navigation/NavigationApplication.types'
import {IBreastfeed} from '@/types/entities/Breastfeed/BreastfeedEntity.types'
import {getHoursMinutes} from '@/utils/formatDate'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native'
export interface IBreastfeedHistoryEditScreenParams {
  breast?: IBreastfeed
  isManual?: boolean
  breastfeedManual?: Omit<IBreastfeed, 'id' | 'childName' | 'withPainBreast'>
}
const SECONDS = ':00'
const BreastfeedHistoryEditScreen: React.FC = () => {
  const theme = useTheme()

  const dispatch = useDispatch()
  const navigation = useNavigation<TStackNavigationProp>()
  const {params} =
    useRoute<RouteProp<TStackScreenParam, 'BreastfeedHistoryEdit'>>()

  const input1Ref = useRef()

  const breastfeedParams = useMemo(() => {
    if (params?.isManual) {
      return params.breastfeedManual
    }
    return params.breast
  }, [params?.breast, params?.breastfeedManual, params?.isManual])

  const [initial, setInitial] = useState(
    params?.isManual ? '' : getHoursMinutes(breastfeedParams?.startTime || ''),
  )
  const [showModalCalendar, setShowModalCalendar] = useState(false)
  const [endTime, setEndTime] = useState(
    params?.isManual ? '' : getHoursMinutes(breastfeedParams?.endTime || ''),
  )
  const [dateChanged, setDateChanged] = useState('')
  const [loading, setLoading] = useState(false)

  const breastfeedUpdateStatus = useSelector(selectBreastfeedingUpdateStatus)
  const children = useSelector(selectBreastfeedingChildren)
  const breastfeedingStatus = useSelector(selectBreastfeedingBreastfeedStatus)
  const breastfeedCreateRequestStatus = useSelector(
    selectBreastfeedingBreastfeedCreateStatus,
  )
  const breastfeedDraft = useSelector(selectBreastfeedingBreastfeedDraft)

  const titleDate = useCallback((date: string) => {
    const dateExtensionFull = new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'long',
    }).format(new Date(date))
    return dateExtensionFull
  }, [])

  useEffect(() => {
    if (breastfeedCreateRequestStatus.status === EActionTypeStatus.Success) {
      setLoading(false)
      dispatch(
        breastfeedingBreastfeedCreateRequestStatus({
          status: EActionTypeStatus.Waiting,
        }),
      )

      navigation.reset({
        routes: [{name: 'BreastfeedHistory', params: {update: true}}],
      })
    }
    if (breastfeedCreateRequestStatus.status === EActionTypeStatus.Error) {
      setLoading(false)
    }
  }, [breastfeedCreateRequestStatus.status, dispatch, navigation])

  useEffect(() => {
    if (
      breastfeedingStatus.status === EActionTypeStatus.Success ||
      breastfeedingStatus.status === EActionTypeStatus.Error
    ) {
      dispatch(
        breastfeedingBreastfeedGetRequestStatus({
          status: EActionTypeStatus.Waiting,
          message: '',
        }),
      )
      navigation.navigate('BreastfeedHistory', {update: false})
    }
  }, [breastfeedingStatus.status, dispatch, navigation])

  useEffect(() => {
    if (breastfeedUpdateStatus.status === EActionTypeStatus.Success) {
      dispatch(
        breastfeedingBreastfeedUpdateRequestStatus({
          status: EActionTypeStatus.Waiting,
          message: '',
        }),
      )
      dispatch(
        breastfeedingBreastfeedGetRequest(children.map(child => child.id)),
      )

      return
    }

    if (breastfeedUpdateStatus.status === EActionTypeStatus.Error) {
      Alert.alert('Erro ao editar', breastfeedUpdateStatus.message)
    }
  }, [
    breastfeedUpdateStatus.message,
    breastfeedUpdateStatus.status,
    children,
    dispatch,
    navigation,
  ])

  const timeZone = useMemo(() => {
    const hoursTimeZone = (new Date().getTimezoneOffset() / 60)
      .toString()
      .padStart(2, '0')
    if (new Date().getTimezoneOffset() > 0) {
      return `-${hoursTimeZone}:00`
    }

    return `+${hoursTimeZone}:00`
  }, [])

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
            <TouchableWithoutFeedback
              onPress={() => {
                params?.isManual
                  ? navigation.navigate('BreastfeedStartBreastfeeding')
                  : navigation.navigate('BreastfeedHistory', {update: false})
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

          <ContainerScrollView>
            <ScrollView>
              <ContentScrollView>
                <TitleView>
                  <IconDiaryWhite />

                  <Title>Amamentação</Title>
                </TitleView>

                <SubTitle>
                  {params?.isManual
                    ? 'Registrar uma amamentação no diário'
                    : 'Editar mamada'}
                </SubTitle>
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
                <BoxEdit>
                  <TouchableWithoutFeedback
                    onPress={() => setShowModalCalendar(true)}>
                    <BoxDate>
                      <Text>
                        {titleDate(
                          dateChanged
                            ? `${dateChanged}T${getHoursMinutes(
                                breastfeedParams?.startTime || '',
                              )}`
                            : breastfeedParams?.startTime || '',
                        )}
                      </Text>
                    </BoxDate>
                  </TouchableWithoutFeedback>

                  <Text>Qual foi o horário de inicio?</Text>
                  <ViewInput>
                    <ContainerMask
                      placeholderTextColor="#ccc"
                      type={'datetime'}
                      onChangeText={setInitial}
                      value={initial}
                      options={{
                        format: 'HH:mm',
                      }}
                      keyboardType="phone-pad"
                      ref={input1Ref}
                      placeholder="18:00"
                    />
                    <Text>Horas</Text>
                  </ViewInput>

                  <Text>Qual foi o horário de término?</Text>
                  <ViewInput>
                    <ContainerMask
                      placeholderTextColor="#ccc"
                      type={'datetime'}
                      onChangeText={setEndTime}
                      value={endTime}
                      options={{
                        format: 'HH:mm',
                      }}
                      keyboardType="phone-pad"
                      placeholder="18:15"
                    />
                    <Text>Horas</Text>
                  </ViewInput>
                </BoxEdit>
                <BoxButton>
                  <ButtonView>
                    <ButtonComponent
                      title={
                        params?.isManual ? 'Salvar mamada' : 'Salvar edição'
                      }
                      backgroundColor={theme.colors.blue}
                      color={theme.colors.text_light}
                      onPress={() => {
                        const dateFormatISO =
                          dateChanged || breastfeedParams?.dateFormatISO

                        const newDateInitial = `${dateFormatISO}T${initial}`
                        const newDateEnd = `${dateFormatISO}T${endTime}`

                        const diferenceDate =
                          new Date(newDateEnd).getTime() -
                          new Date(newDateInitial).getTime()

                        if (!diferenceDate) {
                          Alert.alert(
                            'Horário errado',
                            'Por favor informe um horário válido',
                          )
                          return
                        }

                        if (diferenceDate <= 0) {
                          Alert.alert(
                            'Horário errado',
                            'o horário de inicio tem que ser maior que o horário de término',
                          )
                          return
                        }
                        if (params?.isManual) {
                          setLoading(true)
                          batch(() => {
                            dispatch(
                              breastfeedingBreastfeedSetDraft({
                                ...breastfeedParams,
                                startTime: new Date(
                                  `${newDateInitial}${SECONDS}${timeZone}`,
                                ).toISOString(),
                                endTime: new Date(
                                  `${newDateEnd}${SECONDS}${timeZone}`,
                                ).toISOString(),
                              }),
                            )
                            dispatch(breastfeedingBreastfeedCreateRequest())
                          })
                          return
                        }

                        dispatch(
                          breastfeedingBreastfeedUpdateRequest({
                            id: params.breast?.id,
                            startTime: new Date(
                              `${newDateInitial}${SECONDS}${timeZone}`,
                            ).toISOString(),
                            endTime: new Date(
                              `${newDateEnd}${SECONDS}${timeZone}`,
                            ).toISOString(),
                          }),
                        )
                      }}
                      loading={loading}
                      borderColor={theme.colors.blue}
                    />
                  </ButtonView>

                  <ButtonView>
                    <ButtonComponent
                      title={params?.isManual ? 'Cancelar' : 'Cancelar edição'}
                      backgroundColor={theme.colors.blue}
                      color={theme.colors.text_light}
                      onPress={() => {
                        params?.isManual
                          ? navigation.navigate('BreastfeedStartBreastfeeding')
                          : navigation.navigate('BreastfeedHistory', {
                              update: false,
                            })
                      }}
                      loading={false}
                      borderColor={theme.colors.blue}
                    />
                  </ButtonView>
                </BoxButton>
              </ContentScrollView>
            </ScrollView>
          </ContainerScrollView>
        </Container>
      </ImageBackground>
      {showModalCalendar && (
        <CalendarModal
          visible={true}
          handleModalVisible={() => setShowModalCalendar(false)}
          startTime={dateChanged || breastfeedParams?.dateFormatISO}
          setDateChanged={setDateChanged}
        />
      )}
    </View>
  )
}

export default BreastfeedHistoryEditScreen
