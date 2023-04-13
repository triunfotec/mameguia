import React, {useCallback} from 'react'
import {TouchableWithoutFeedback, ImageBackground} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'
import {useDispatch, useSelector} from 'react-redux'

import {useTheme} from 'styled-components'

import BackgroundTentante from '@/assets/backgroundHome/background_tentante.png'
import LogoSvg5 from '@/assets/logos/Logo-5.svg'
import IconDiaryPurple from '@/assets/menu/icon_diary_azul.svg'
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
  ButtonView,
  PlusText,
  HistoricView,
  BoxFertileCycleView,
  FertileCycleText,
} from '@/screens/FertileDigitalTableHistoric/FertileDigitalTableHistoricScreen.styles'
import {fertileCycleMenstruationDate} from '@/store/FertileCycle/FertileCycleCreators'
import {selectFertileCycles} from '@/store/FertileCycle/FertileCycleSelectors'
import {TStackNavigationProp} from '@/types/application/Navigation/NavigationApplication.types'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {useFocusEffect, useNavigation} from '@react-navigation/native'

const FertileDigitalTableHistoric: React.FC = () => {
  const navigation = useNavigation<TStackNavigationProp>()
  const theme = useTheme()
  const dispatch = useDispatch()

  const fertileCycles = useSelector(selectFertileCycles)

  const calculeFertileCycle = useCallback(
    (menstruationDate: Date, menstrualCycleDaysToAverage: number) => {
      const dataFertile: number = menstruationDate.setDate(
        menstruationDate.getDate() + menstrualCycleDaysToAverage - 14,
      )

      const initialFertile: number = menstruationDate.setDate(
        new Date(dataFertile).getDate() - 3,
      )
      const endFertile: number = menstruationDate.setDate(
        new Date(menstruationDate).getDate() + 6,
      )

      return {
        initialFertile: new Date(initialFertile),
        endFertile: new Date(endFertile),
      }
    },
    [],
  )

  const formateDateFertilePeriod = useCallback(
    (initialFertile: Date, endFertile: Date) => {
      const options: Intl.DateTimeFormatOptions = {
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
      }
      const initialFertileFormat = new Intl.DateTimeFormat(
        'pt-BR',
        options,
      ).format(initialFertile)

      const endFertileFormat = new Intl.DateTimeFormat('pt-BR', options).format(
        endFertile,
      )
      return `de ${initialFertileFormat} a ${endFertileFormat}`
    },
    [],
  )

  const getFertilePeriod = useCallback(
    (menstruationDate: Date, menstrualCycleDaysToAverage: number) => {
      const {initialFertile, endFertile} = calculeFertileCycle(
        menstruationDate,
        menstrualCycleDaysToAverage,
      )

      return formateDateFertilePeriod(initialFertile, endFertile)
    },
    [calculeFertileCycle, formateDateFertilePeriod],
  )

  useFocusEffect(
    React.useCallback(() => {
      if (fertileCycles?.length === 0) {
        navigation.navigate('FertileDigitalTableChooseDate')
      }

      return () => {}
    }, [fertileCycles?.length, navigation]),
  )

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

                  <Title>Histórico de ciclos férteis</Title>
                </TitleView>

                <TouchableWithoutFeedback
                  onPress={() =>
                    navigation.navigate('FertileDigitalTableChooseDate')
                  }>
                  <ButtonView>
                    <PlusText>Adicionar novo ciclo</PlusText>
                    <MaterialCommunityIcons
                      name="plus"
                      size={32}
                      color={theme.colors.text_light}
                    />
                  </ButtonView>
                </TouchableWithoutFeedback>

                <HistoricView>
                  {fertileCycles.map((cycle, index) => (
                    <TouchableWithoutFeedback
                      onPress={() => {
                        dispatch(
                          fertileCycleMenstruationDate({
                            menstruationDate: new Date(cycle.menstruationDate),
                            menstrualCycleDaysToAverage:
                              cycle.menstrualCycleDaysToAverage,
                          }),
                        )
                        navigation.navigate('FertileDigitalTable', {
                          isMenstruationDateSave: true,
                          fertileCycleId: cycle.id,
                        })
                      }}
                      key={index}>
                      <BoxFertileCycleView>
                        <FertileCycleText>
                          {getFertilePeriod(
                            new Date(cycle.menstruationDate + 'T00:00:00'),
                            cycle.menstrualCycleDaysToAverage,
                          )}
                        </FertileCycleText>

                        <MaterialCommunityIcons
                          name="chevron-right"
                          size={32}
                          color={theme.colors.primary}
                        />
                      </BoxFertileCycleView>
                    </TouchableWithoutFeedback>
                  ))}
                </HistoricView>
              </ContentScrollView>
            </ScrollView>
          </ContainerScrollView>
        </Content>
      </ImageBackground>
    </Container>
  )
}

export default FertileDigitalTableHistoric
