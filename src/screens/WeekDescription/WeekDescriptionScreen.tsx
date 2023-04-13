import React, {useState, useEffect} from 'react'
import {
  View,
  ImageBackground,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'
import {useDispatch, useSelector} from 'react-redux'

import {useTheme} from 'styled-components'

import BackgroundPregnant from '@/assets/backgroundHome/background_gestante.png'
import IconDiaryWhite from '@/assets/diary/icon_diary_white.svg'
import LogoSvg1 from '@/assets/logos/Logo-1.svg'
import {
  ContainerScrollView,
  ScrollView,
  ContentScrollView,
  Container,
  HeaderView,
  GoBackView,
  TitleView,
  Title,
  BoxWeekView,
  WeekText,
  WeekSubtitleText,
  WeekParagraphText,
  ImageView,
  WeekImage,
} from '@/screens/WeekDescription/WeekDescriptionScreen.styles'
import {weekDetailsRequest} from '@/store/Week/WeekCreators'
import {selectWeeks} from '@/store/Week/WeekSelectors'
import {
  TStackNavigationProp,
  TStackScreenParam,
} from '@/types/application/Navigation/NavigationApplication.types'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native'

export interface IWeekDescriptionScreenParams {
  weekNumber: number
}

const WeekDescriptionScreen: React.FC = () => {
  const theme = useTheme()
  const navigation = useNavigation<TStackNavigationProp>()
  const [loading, setLoading] = useState(true)

  const {params} = useRoute<RouteProp<TStackScreenParam, 'WeekDescription'>>()
  const dispatch = useDispatch()

  const weeks = useSelector(selectWeeks)

  useEffect(() => {
    const weekNumber = params.weekNumber

    dispatch(weekDetailsRequest(weekNumber))
  }, [dispatch, params.weekNumber])

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        resizeMode="cover"
        source={BackgroundPregnant}
        style={{
          justifyContent: 'flex-start',
          flex: 1,
        }}>
        <Container>
          <HeaderView>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('Week')
              }}>
              <GoBackView>
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={32}
                  color={theme.colors.primary}
                />
              </GoBackView>
            </TouchableWithoutFeedback>
            <LogoSvg1 width={RFValue(200)} height={RFValue(44)} />

            <TouchableWithoutFeedback onPress={() => {}}>
              <MaterialCommunityIcons
                name="chevron-left"
                size={32}
                color={theme.colors.primary}
              />
            </TouchableWithoutFeedback>
          </HeaderView>

          <ContainerScrollView>
            <ScrollView>
              <ContentScrollView>
                <TitleView>
                  <IconDiaryWhite />

                  <Title>Semana a semana</Title>
                </TitleView>
                <BoxWeekView>
                  <WeekText> {params.weekNumber}ª semana</WeekText>

                  {weeks?.map(week => {
                    if (week.type === 'image') {
                      return (
                        <View key={week.id}>
                          {loading && (
                            <ImageView>
                              <ActivityIndicator
                                color={theme.colors.primary}
                                size="large"
                              />
                            </ImageView>
                          )}
                          <WeekImage
                            source={{
                              uri: week.imageUrl,
                            }}
                            onLoadEnd={() => setLoading(false)}
                          />
                        </View>
                      )
                    }
                    if (week.type === 'subtitle') {
                      return (
                        <WeekSubtitleText key={week.id}>
                          {week.paragraph}
                        </WeekSubtitleText>
                      )
                    }

                    if (week.type === 'text') {
                      return (
                        <WeekParagraphText key={week.id}>
                          {week.paragraph}
                        </WeekParagraphText>
                      )
                    }
                  })}
                </BoxWeekView>
              </ContentScrollView>
            </ScrollView>
          </ContainerScrollView>
        </Container>
      </ImageBackground>
    </View>
  )
}

export default WeekDescriptionScreen
