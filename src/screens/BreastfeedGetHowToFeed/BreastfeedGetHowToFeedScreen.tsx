import React, {useEffect} from 'react'
import {ImageBackground, View, TouchableWithoutFeedback} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'
import {batch, useDispatch, useSelector} from 'react-redux'

import {useTheme} from 'styled-components'

import BackgroundBreastfeed from '@/assets/backgroundHome/background_lactante.png'
import IconDiaryWhite from '@/assets/diary/icon_diary_white.svg'
import LogoSvg2 from '@/assets/logos/Logo-2.svg'
import ButtonComponent from '@/components/Button'
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
} from '@/screens/BreastfeedGetHowToFeed/BreastfeedGetHowToFeedScreen.styles'
import {
  breastfeedingChildCreateRequest,
  breastfeedingChildCreateRequestStatus,
  breastfeedingSetChildDraft,
} from '@/store/Breastfeeding/BreastfeedingCreators'
import {selectBreastfeedingChildCreateStatus} from '@/store/Breastfeeding/BreastfeedingSelectors'
import {EActionTypeStatus} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {TStackNavigationProp} from '@/types/application/Navigation/NavigationApplication.types'
import {ETypeFood} from '@/types/entities/Child/ChildEntity.types'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'

export interface IBreastfeedGetHowToFeedScreenParams {
  screen?: string
}
const BreastfeedGetHowToFeedScreen: React.FC = () => {
  const theme = useTheme()
  const dispatch = useDispatch()

  const navigation = useNavigation<TStackNavigationProp>()

  const childCreateStatus = useSelector(selectBreastfeedingChildCreateStatus)

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
            <BoxNumberText> 04 de 05</BoxNumberText>
            <BoxText>Como o seu bebê se alimenta?</BoxText>
          </BoxView>

          <ButtonView>
            <ButtonComponent
              title="Leite materno exclusivo"
              backgroundColor={theme.colors.secondary}
              color={theme.colors.text_light}
              onPress={() => {
                batch(() => {
                  dispatch(
                    breastfeedingSetChildDraft({
                      typeFood: ETypeFood.Maternal,
                    }),
                  )
                  dispatch(breastfeedingChildCreateRequest())
                })
              }}
              loading={childCreateStatus.status === EActionTypeStatus.Busy}
            />
          </ButtonView>

          {/* <ButtonView>
            <ButtonComponent
              title="Leite materno + suplementação"
              backgroundColor={theme.colors.secondary}
              color={theme.colors.text_light}
              onPress={() => {
                dispatch(
                  breastfeedingSetChildDraft({
                    typeFood: ETypeFood.MaternalSupplementation,
                  }),
                )
                navigation.navigate('BreastfeedGetAmountSupplementation')
              }}
              loading={false}
            />
          </ButtonView> */}

          {/* <ButtonView>
            <ButtonComponent
              title="Suplementação"
              backgroundColor={theme.colors.secondary}
              color={theme.colors.text_light}
              onPress={() => {
                dispatch(
                  breastfeedingSetChildDraft({
                    typeFood: ETypeFood.Supplementation,
                  }),
                )
                navigation.navigate('BreastfeedGetAmountSupplementation')
              }}
              loading={false}
            />
          </ButtonView> */}
        </Container>
      </ImageBackground>
    </View>
  )
}

export default BreastfeedGetHowToFeedScreen
