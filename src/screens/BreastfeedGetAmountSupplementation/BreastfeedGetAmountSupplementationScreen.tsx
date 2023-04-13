import React, {useEffect, useMemo} from 'react'
import {
  ImageBackground,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'
import {batch, useDispatch, useSelector} from 'react-redux'

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
  QuantityView,
  QuantityTextInput,
  QuantityText,
  EachText,
} from '@/screens/BreastfeedGetAmountSupplementation/BreastfeedGetAmountSupplementationScreen.styles'
import {
  breastfeedingChildCreateRequest,
  breastfeedingChildCreateRequestStatus,
  breastfeedingSetChildDraft,
} from '@/store/Breastfeeding/BreastfeedingCreators'
import {selectBreastfeedingChildCreateStatus} from '@/store/Breastfeeding/BreastfeedingSelectors'
import {EActionTypeStatus} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {TStackNavigationProp} from '@/types/application/Navigation/NavigationApplication.types'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'

export interface IBreastfeedGetAmountSupplementationScreenParams {
  screen?: string
}

const DismissKeyboard = ({children}: any) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
)

const BreastfeedGetAmountSupplementationScreen: React.FC = () => {
  const theme = useTheme()
  const {user} = useAuth()
  const dispatch = useDispatch()

  const navigation = useNavigation<TStackNavigationProp>()
  const [textMililitros, onChangeTextMililitros] = React.useState('')
  const [textMinutes, onChangeTextMinutes] = React.useState('')

  const childCreateStatus = useSelector(selectBreastfeedingChildCreateStatus)

  const disableNextButton = useMemo(() => {
    return !textMililitros || !textMinutes
  }, [textMililitros, textMinutes])

  useEffect(() => {
    if (childCreateStatus.status === EActionTypeStatus.Success) {
      dispatch(
        breastfeedingChildCreateRequestStatus({
          status: EActionTypeStatus.Waiting,
          message: '',
        }),
      )
      navigation.navigate('BreastfeedAddBreastfeeding')
    }
  }, [childCreateStatus, dispatch, navigation])

  return (
    <DismissKeyboard>
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

            <TitleView>
              <IconDiaryWhite />

              <Title>Amamentação</Title>
            </TitleView>

            <BoxView>
              <BoxNumberText> 05 de 05</BoxNumberText>
              <BoxText>
                Informe a quantidade e frequência da suplementação
              </BoxText>

              <QuantityView>
                <QuantityTextInput
                  onChangeText={onChangeTextMililitros}
                  value={textMililitros}
                  placeholder="0"
                  keyboardType="numeric"
                  onSubmitEditing={Keyboard.dismiss}
                />
                <QuantityText>Mililitros</QuantityText>
              </QuantityView>

              <EachText>A cada</EachText>
              <QuantityView>
                <QuantityTextInput
                  onChangeText={onChangeTextMinutes}
                  value={textMinutes}
                  placeholder="0"
                  keyboardType="numeric"
                  onSubmitEditing={Keyboard.dismiss}
                />
                <QuantityText>Minutos</QuantityText>
              </QuantityView>
            </BoxView>

            <ButtonView>
              <ButtonComponent
                title="Proximo"
                backgroundColor={theme.colors.text_light}
                color={theme.colors.secondary}
                onPress={() => {
                  batch(() => {
                    dispatch(
                      breastfeedingSetChildDraft({
                        quantityMillilitersSupplementation:
                          Number(textMililitros),
                        minutesSupplementation: Number(textMinutes),
                      }),
                    )
                    dispatch(breastfeedingChildCreateRequest())
                  })
                }}
                loading={childCreateStatus.status === EActionTypeStatus.Busy}
                disabled={disableNextButton}
              />
            </ButtonView>
          </Container>
        </ImageBackground>
      </View>
    </DismissKeyboard>
  )
}

export default BreastfeedGetAmountSupplementationScreen
