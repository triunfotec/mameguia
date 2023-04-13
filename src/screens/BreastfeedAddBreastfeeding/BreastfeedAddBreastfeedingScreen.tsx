import React from 'react'
import {ImageBackground, View, TouchableWithoutFeedback} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'
import {useSelector} from 'react-redux'

import {useTheme} from 'styled-components'

import BackgroundBreastfeed from '@/assets/backgroundHome/background_lactante.png'
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
  SubTitle,
  ButtonView,
  PlusText,
  ButtonNewChildView,
  ViewButton,
} from '@/screens/BreastfeedAddBreastfeeding/BreastfeedAddBreastfeedingScreen.styles'
import {selectBreastfeedingBreastfeed} from '@/store/Breastfeeding/BreastfeedingSelectors'
import {TStackNavigationProp} from '@/types/application/Navigation/NavigationApplication.types'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
export interface IBreastfeedAddBreastfeedingScreenParams {
  screen?: string
}
const BreastfeedAddBreastfeedingScreen: React.FC = () => {
  const theme = useTheme()

  const breastfeeds = useSelector(selectBreastfeedingBreastfeed)
  const navigation = useNavigation<TStackNavigationProp>()

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
            <HeaderView hasBreastfeeds={breastfeeds?.length > 0}>
              {breastfeeds?.length > 0 && (
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.navigate('BreastfeedHistory', {update: false})
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
              {breastfeeds?.length > 0 && (
                <TouchableWithoutFeedback onPress={() => {}}>
                  <GoBackView>
                    <></>
                  </GoBackView>
                </TouchableWithoutFeedback>
              )}
            </HeaderView>

            <TitleView>
              <IconDiaryWhite />

              <Title>Amamentação</Title>
            </TitleView>

            <SubTitle>Registrar uma amamentação no Diário</SubTitle>

            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate('BreastfeedStartBreastfeeding')
              }>
              <ButtonView>
                <MaterialCommunityIcons
                  name="plus"
                  size={28}
                  color={theme.colors.secondary}
                />
              </ButtonView>
            </TouchableWithoutFeedback>
            <PlusText>Adicionar Amamentação</PlusText>

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
            <ButtonNewChildView>
              <ButtonComponent
                title="Cadastrar uma nova criança"
                backgroundColor={theme.colors.text_light}
                color={theme.colors.dark_grey}
                onPress={() => {
                  navigation.navigate('BreastfeedGetNameGenre')
                }}
                loading={false}
              />
            </ButtonNewChildView>
          </Container>
        </ScrollView>
      </ImageBackground>
    </View>
  )
}

export default BreastfeedAddBreastfeedingScreen
