import React, {useEffect, useRef} from 'react'
import {View} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'
import {useDispatch, useSelector} from 'react-redux'

import {useTheme} from 'styled-components'

import IconTestPurple from '@/assets/icons_home/tests/icon_test_purple.svg'
import LogoSvg from '@/assets/logo3.svg'
import ButtonComponent from '@/components/Button'
import {useAuth} from '@/hooks/auth'
import {
  ScrollView,
  Container,
  ViewLogo,
  Title,
  Box,
  BoxTitle,
  BoxDescription,
} from '@/screens/Test/TestScreen.styles'
import {quizRequest, quizReset} from '@/store/Quiz/QuizCreators'
import {selectQuestions} from '@/store/Quiz/QuizSelectors'
import {TStackNavigationProp} from '@/types/application/Navigation/NavigationApplication.types'
import {TSituation} from '@/types/entities/User/UserEntity.types'
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native'

interface IScreenParams {
  stepNumber: number
  situation: TSituation
}
export interface ITextScreenParams {
  params: IScreenParams
  screen: string
}
const TestScreen: React.FC = () => {
  const {user} = useAuth()
  const dispatch = useDispatch()

  const scrollRef = useRef<any>()
  const theme = useTheme()

  const navigation = useNavigation<TStackNavigationProp>()
  useEffect(() => {
    dispatch(quizReset())
  }, [dispatch])

  return (
    <View style={{flex: 1}}>
      <ScrollView ref={scrollRef}>
        <Container>
          <ViewLogo>
            <LogoSvg width={RFValue(200)} height={RFValue(68)} />
          </ViewLogo>

          {/* <IconTestPurple /> */}

          <Title>Teste seus conhecimentos</Title>

          <Box backgroundColor={theme.colors.secondary_light}>
            <BoxTitle color={theme.colors.primary}>Tentante</BoxTitle>

            <BoxDescription color={theme.colors.primary}>
              Aquela fase cheia de descobertas e expectativas.
            </BoxDescription>

            <ButtonComponent
              title="Quero fazer o quiz"
              backgroundColor={theme.colors.secondary_light}
              color={theme.colors.primary}
              borderColor={theme.colors.text_light}
              onPress={() =>
                navigation.navigate('Quiz', {
                  stepNumber: 1,
                  situation: 'getPregnant',
                })
              }
              height={56}
            />
          </Box>

          <Box backgroundColor={theme.colors.primary}>
            <BoxTitle color={theme.colors.text_light}>Gestante</BoxTitle>

            <BoxDescription color={theme.colors.text_light}>
              Aquela fase onde o amor só cresce.
            </BoxDescription>

            <ButtonComponent
              title="Quero fazer o quiz"
              backgroundColor={theme.colors.primary}
              color={theme.colors.secondary_light}
              borderColor={theme.colors.text_light}
              onPress={() =>
                navigation.navigate('Quiz', {
                  stepNumber: 1,
                  situation: 'pregnant',
                })
              }
              height={56}
            />
          </Box>

          <Box backgroundColor={theme.colors.secondary}>
            <BoxTitle color={theme.colors.text_light}>Lactante</BoxTitle>

            <BoxDescription color={theme.colors.text_light}>
              Uma fase em que a amamentação alimenta o futuro.
            </BoxDescription>

            <ButtonComponent
              title="Quero fazer o quiz"
              backgroundColor={theme.colors.secondary}
              color={theme.colors.text_light}
              borderColor={theme.colors.text_light}
              onPress={() =>
                navigation.navigate('Quiz', {
                  stepNumber: 1,
                  situation: 'breastfeeding',
                })
              }
              height={56}
            />
          </Box>

          <Box backgroundColor={theme.colors.others}>
            <BoxTitle color={theme.colors.blue}>Parceiro</BoxTitle>

            <BoxDescription color={theme.colors.blue}>
              É quem fica do lado durante toda jornada, dividindo
              responsabilidades e multiplicando os cuidados.
            </BoxDescription>

            <ButtonComponent
              title="Quero fazer o quiz"
              backgroundColor={theme.colors.others}
              color={theme.colors.primary}
              borderColor={theme.colors.text_light}
              onPress={() =>
                navigation.navigate('Quiz', {
                  stepNumber: 1,
                  situation: 'anotherResponsible',
                })
              }
              height={56}
            />
          </Box>
        </Container>
      </ScrollView>
    </View>
  )
}

export default TestScreen
