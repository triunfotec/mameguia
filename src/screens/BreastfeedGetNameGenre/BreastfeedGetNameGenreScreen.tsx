import React, {useState, useCallback, useEffect} from 'react'
import {ImageBackground, View, TouchableWithoutFeedback} from 'react-native'
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group'
import {RFValue} from 'react-native-responsive-fontsize'
import {useDispatch, useSelector} from 'react-redux'

import {useTheme} from 'styled-components'

import BackgroundBreastfeed from '@/assets/backgroundHome/background_lactante.png'
import IconDiaryWhite from '@/assets/diary/icon_diary_white.svg'
import LogoSvg2 from '@/assets/logos/Logo-2.svg'
import ButtonComponent from '@/components/Button'
import {useAuth} from '@/hooks/auth'
import {
  Container,
  HeaderView,
  GoBackView,
  TitleView,
  Title,
  BoxView,
  BoxNumberText,
  BoxText,
  ButtonView,
  NameBabyTextInput,
} from '@/screens/BreastfeedGetNameGenre/BreastfeedGetNameGenreScreen.styles'
import {breastfeedingSetChildDraft} from '@/store/Breastfeeding/BreastfeedingCreators'
import {selectBreastfeedingChildren} from '@/store/Breastfeeding/BreastfeedingSelectors'
import {frequentAskGet} from '@/store/FrequentAsk/FrequentAskCreators'
import {TStackNavigationProp} from '@/types/application/Navigation/NavigationApplication.types'
import {EGenre, TGenre} from '@/types/entities/Child/ChildEntity.types'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
export interface IBreastfeedGetNameGenreScreenParams {
  screen?: string
}

const radioButtonsData: RadioButtonProps[] = [
  {
    id: '1',
    label: 'Menina',
    value: 'menina',
    color: '#fff',
    labelStyle: {
      color: '#fff',
    },
    selected: true,
  },
  {
    id: '2',
    label: 'Menino',
    value: 'menino',
    color: '#fff',
    labelStyle: {
      color: '#fff',
    },
    selected: false,
  },
]

const BreastfeedGetNameGenreScreen: React.FC = () => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const {user} = useAuth()

  const navigation = useNavigation<TStackNavigationProp>()

  const [radioButtons, setRadioButtons] =
    useState<RadioButtonProps[]>(radioButtonsData)

  const [textNameBaby, onChangeTextNameBaby] = React.useState('')

  const children = useSelector(selectBreastfeedingChildren)

  const onPressRadioButton = useCallback(
    (radioButtonsArray: RadioButtonProps[]) => {
      setRadioButtons(radioButtonsArray)
    },
    [],
  )

  useEffect(() => {
    dispatch(frequentAskGet())
  }, [dispatch])

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
          <HeaderView hasChild={children?.length > 0}>
            {children?.length > 0 && (
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
            )}

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
          <BoxView>
            <BoxNumberText> 01 de 02</BoxNumberText>
            <BoxText>Qual é o nome da criança?</BoxText>
            <View style={{marginTop: 20}}>
              <NameBabyTextInput
                onChangeText={onChangeTextNameBaby}
                value={textNameBaby}
                placeholder="Nome do Bebê"
                keyboardType="default"
              />
              <RadioGroup
                radioButtons={radioButtons}
                onPress={onPressRadioButton}
                layout="row"
                containerStyle={{
                  marginTop: 15,
                }}
              />
            </View>
          </BoxView>

          <ButtonView>
            <ButtonComponent
              title="Próximo"
              backgroundColor={theme.colors.text_light}
              color={theme.colors.secondary}
              onPress={() => {
                dispatch(
                  breastfeedingSetChildDraft({
                    name: textNameBaby,
                    genre:
                      (radioButtons.find(radio => radio.selected)
                        ?.value as TGenre) || EGenre.Menina,
                    userId: user.id,
                  }),
                )
                navigation.navigate('BreastfeedGetAgeMonths')
              }}
              loading={false}
              disabled={!(textNameBaby.length > 1)}
            />
          </ButtonView>
        </Container>
      </ImageBackground>
    </View>
  )
}

export default BreastfeedGetNameGenreScreen
