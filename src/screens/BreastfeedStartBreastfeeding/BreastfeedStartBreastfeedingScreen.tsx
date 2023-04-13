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
import RadioComponent from '@/components/Radio'
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
  SubTitleText,
  BoxView,
  BoxText,
  ButtonView,
  BoxChildrenView,
  ChildrenView,
  RadioView,
  ChildDeleteView,
  ChildDeleteText,
  BoxChooseBreast,
  BoxBreast,
  BoxBreastTextView,
  BreastSideText,
  ViewButton,
} from '@/screens/BreastfeedStartBreastfeeding/BreastfeedStartBreastfeedingScreen.styles'
import {
  breastfeedingBreastfeedSetDraft,
  breastfeedingChildDelete,
  breastfeedingChildDeleteStatus,
  breastfeedingChildrenGetRequest,
} from '@/store/Breastfeeding/BreastfeedingCreators'
import {
  selectBreastfeedingBreastfeed,
  selectBreastfeedingChildDeleteStatus,
  selectBreastfeedingChildren,
} from '@/store/Breastfeeding/BreastfeedingSelectors'
import {EActionTypeStatus} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {TStackNavigationProp} from '@/types/application/Navigation/NavigationApplication.types'
import {IBreastfeed} from '@/types/entities/Breastfeed/BreastfeedEntity.types'
import {getDateFormatISO} from '@/utils/formatDate'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'

export interface IBreastfeedStartBreastfeedingScreenParams {
  screen?: string
}

type TBreast = 'left' | 'right'
const BreastfeedStartBreastfeedingScreen: React.FC = () => {
  const theme = useTheme()
  const {user} = useAuth()
  const dispatch = useDispatch()

  const navigation = useNavigation<TStackNavigationProp>()

  const [childIdSelected, setChildIdSelected] = useState<number>()
  const [breastSelected, setBreastSelected] = useState<TBreast>()
  const [showModalConfirmAction, setShowModalConfirmAction] = useState(false)
  const [childIdToDelete, setChildIdToDelete] = useState<number>(0)

  const children = useSelector(selectBreastfeedingChildren)
  const childDeleteStatus = useSelector(selectBreastfeedingChildDeleteStatus)

  const handleSelected = useCallback((childId: number) => {
    setChildIdSelected(childId)
  }, [])

  const getChild = useCallback(
    (childId: number) => {
      return children?.find(child => child.id === childId)
    },
    [children],
  )

  const canStartBreastfeed = useMemo(() => {
    return childIdSelected && breastSelected
  }, [breastSelected, childIdSelected])

  const askDeleteText = useMemo(() => {
    if (childIdToDelete) {
      const childName = getChild(childIdToDelete)?.name
      return `Você realmente deseja excluir a criança ${childName?.toUpperCase()} da amamentação?`
    }
    return ''
  }, [getChild, childIdToDelete])

  // useEffect(() => {
  //   dispatch(breastfeedingChildrenGetRequest(user.id))
  // }, [dispatch, user.id])

  useEffect(() => {
    if (childDeleteStatus.status === EActionTypeStatus.Success) {
      setShowModalConfirmAction(false)
      dispatch(
        breastfeedingChildDeleteStatus({
          status: EActionTypeStatus.Waiting,
        }),
      )
      dispatch(breastfeedingChildrenGetRequest(user.id))
    }
  }, [childDeleteStatus.status, dispatch, user.id])

  useEffect(() => {
    if (children?.length === 1) {
      handleSelected(children[0].id)
    }

    if (children?.length === 0) {
      navigation.navigate('BreastfeedGetNameGenre')
    }
  }, [children, handleSelected, navigation])

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

          <ContainerScrollView>
            <ScrollView>
              <ContentScrollView>
                <TitleView>
                  <IconDiaryWhite />

                  <Title>Amamentação</Title>
                </TitleView>

                <SubTitleText>Registrar uma amamentação no Diário</SubTitleText>

                <BoxView backgroundColor={theme.colors.secondary}>
                  <BoxText color={theme.colors.text_light}>
                    Para seu maior conforto e do seu bebê, lembre-se de alternar
                    o tempo de amamentação entre as duas mamas
                  </BoxText>
                </BoxView>

                {children?.length !== 1 && (
                  <BoxView backgroundColor={theme.colors.text_light}>
                    <BoxText color={theme.colors.secondary}>
                      Selecione a criança abaixo:
                    </BoxText>
                  </BoxView>
                )}

                <BoxChildrenView>
                  {children.length > 0 &&
                    children.map(child => (
                      <ChildrenView key={child.id}>
                        <RadioView>
                          <RadioComponent
                            text={child.name}
                            selected={childIdSelected === child.id}
                            onPress={() => handleSelected(child.id)}
                          />
                        </RadioView>

                        <TouchableOpacity
                          onPress={() => {
                            setChildIdToDelete(child.id)
                            setShowModalConfirmAction(true)
                          }}>
                          <ChildDeleteView>
                            <MaterialCommunityIcons
                              name="close"
                              size={22}
                              color={theme.colors.text_dark}
                            />
                            <ChildDeleteText>Excluir</ChildDeleteText>
                          </ChildDeleteView>
                        </TouchableOpacity>
                      </ChildrenView>
                    ))}
                </BoxChildrenView>

                <BoxView backgroundColor={theme.colors.secondary}>
                  <BoxText color={theme.colors.text_light}>
                    Selecione a mama abaixo:
                  </BoxText>

                  <BoxChooseBreast>
                    <TouchableOpacity onPress={() => setBreastSelected('left')}>
                      <BoxBreast selected={breastSelected === 'left'}>
                        <MamaEsquerda />

                        <BoxBreastTextView>
                          <BreastSideText> Mama</BreastSideText>
                          <BreastSideText> Esquerda</BreastSideText>
                        </BoxBreastTextView>
                      </BoxBreast>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => setBreastSelected('right')}>
                      <BoxBreast selected={breastSelected === 'right'}>
                        <MamaDireita />

                        <BoxBreastTextView>
                          <BreastSideText> Mama</BreastSideText>
                          <BreastSideText> Direita</BreastSideText>
                        </BoxBreastTextView>
                      </BoxBreast>
                    </TouchableOpacity>
                  </BoxChooseBreast>
                </BoxView>

                <ButtonView>
                  <ButtonComponent
                    title="Iniciar amamentação"
                    backgroundColor={theme.colors.blue}
                    color={theme.colors.text_light}
                    borderColor={theme.colors.blue}
                    onPress={() => {
                      if (childIdSelected) {
                        const breastfeed: Partial<IBreastfeed> = {
                          childId: childIdSelected,
                          leftBreast: breastSelected === 'left',
                          rightBreast: breastSelected === 'right',
                          startTime: new Date().toISOString(),
                        }
                        dispatch(breastfeedingBreastfeedSetDraft(breastfeed))
                        navigation.navigate('BreastfeedEndBreastfeeding')
                      }
                    }}
                    loading={false}
                    disabled={!canStartBreastfeed}
                  />
                  <ButtonComponent
                    title="Já amamentei"
                    backgroundColor={theme.colors.text_light}
                    color={theme.colors.blue}
                    borderColor={theme.colors.text_light}
                    onPress={() => {
                      if (childIdSelected) {
                        const breastfeed: Omit<
                          IBreastfeed,
                          'id' | 'childName' | 'withPainBreast'
                        > = {
                          childId: childIdSelected,
                          leftBreast: breastSelected === 'left',
                          rightBreast: breastSelected === 'right',
                          startTime: new Date().toISOString(),
                          endTime: new Date().toISOString(),
                          dateFormatISO: getDateFormatISO(
                            new Date().toISOString(),
                          ),
                        }
                        dispatch(breastfeedingBreastfeedSetDraft(breastfeed))

                        navigation.navigate('BreastfeedHistoryEdit', {
                          breastfeedManual: breastfeed,
                          isManual: true,
                        })
                      }
                    }}
                    loading={false}
                    disabled={!canStartBreastfeed}
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
              </ContentScrollView>
            </ScrollView>
          </ContainerScrollView>
        </Container>
      </ImageBackground>

      <ModalConfirmActionComponent
        visible={showModalConfirmAction}
        handleModalVisible={setShowModalConfirmAction}
        askText={askDeleteText}
        handleActionYes={() =>
          batch(() => {
            dispatch(
              breastfeedingChildDeleteStatus({
                status: EActionTypeStatus.Busy,
              }),
            ),
              dispatch(breastfeedingChildDelete(childIdToDelete))
          })
        }
        statusAction={childDeleteStatus}
      />
    </View>
  )
}

export default BreastfeedStartBreastfeedingScreen
