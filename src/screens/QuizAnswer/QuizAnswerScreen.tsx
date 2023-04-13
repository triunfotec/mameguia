import React, {useCallback, useEffect, useMemo} from 'react'
import {View, ImageBackground} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'
import {useDispatch, useSelector} from 'react-redux'

import {useTheme} from 'styled-components'

import LogoSvg1 from '@/assets/logos/Logo-1.svg'
import LogoSvg2 from '@/assets/logos/Logo-2.svg'
import LogoSvg4 from '@/assets/logos/Logo-4.svg'
import LogoSvg6 from '@/assets/logos/Logo6.svg'
import ButtonComponent from '@/components/Button'
import {getLayoutQuizAnswer} from '@/screens/QuizAnswer/QuizAnswerScreen.data'
import {
  Container,
  ScrollView,
  CorrectView,
  CorrectText,
  QuestionText,
  AnswerText,
} from '@/screens/QuizAnswer/QuizAnswerScreen.styles'
import {quizReset, quizShowAnswerModal} from '@/store/Quiz/QuizCreators'
import {selectQuestion} from '@/store/Quiz/QuizSelectors'
import {selectUserChosenCurrentSituation} from '@/store/User/UserSelectors'
import {
  TStackNavigationProp,
  TStackScreenParam,
} from '@/types/application/Navigation/NavigationApplication.types'
import {IQuizAnswer} from '@/types/entities/Quiz/QuizAnswerEntity.type'
import {TSituation} from '@/types/entities/User/UserEntity.types'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native'

export interface IQuizAnswerScreenParams {
  questionId: number
  stepNumber: number
  goToQuizResult: boolean
  situation: TSituation
}

const QuizAnswerScreen: React.FC = () => {
  const theme = useTheme()

  const dispatch = useDispatch()
  const navigation = useNavigation<TStackNavigationProp>()
  const {params} = useRoute<RouteProp<TStackScreenParam, 'QuizAnswer'>>()

  const {goToQuizResult, stepNumber, questionId, situation} = params

  const situationStatus = useMemo(() => {
    return {
      isGetPregnant: situation === 'getPregnant',
      isPregnant: situation === 'pregnant',
      isBreastfeeding: situation === 'breastfeeding',
      isAnotherResponsible: situation === 'anotherResponsible',
    }
  }, [situation])

  const question = useSelector(selectQuestion(questionId))
  const chosenCurrentSituation = useSelector(selectUserChosenCurrentSituation)

  const answerChosen = useMemo(() => {
    if (!question) {
      return {} as IQuizAnswer
    }
    const {answers} = question

    return answers.find(answer => answer.selected)
  }, [question])

  const isChosenAnswerCorrect = useMemo(() => {
    if (!question) {
      return {} as IQuizAnswer
    }
    const {answers} = question

    let isCorrect = false

    answers.forEach(answer => {
      if (answer.correct && answer?.selected) {
        isCorrect = true
      }
    })

    return isCorrect
  }, [question])

  const quizAnswerData = useMemo(() => {
    return getLayoutQuizAnswer(situation)
  }, [situation])

  const handleResetQuizState = useCallback(() => {
    dispatch(quizReset())
    navigation.reset({
      routes: [{name: 'Quiz', params: {stepNumber: 1, situation}}],
    })
  }, [dispatch, navigation, situation])

  useEffect(() => {
    if (chosenCurrentSituation !== situation) {
      handleResetQuizState()
    }
  }, [chosenCurrentSituation, handleResetQuizState, situation])

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        resizeMode="cover"
        source={quizAnswerData.backgroundImage}
        style={{
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            marginTop: 24,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {situationStatus.isPregnant && (
            <LogoSvg1 width={RFValue(200)} height={RFValue(44)} />
          )}
          {situationStatus.isBreastfeeding && (
            <LogoSvg2 width={RFValue(200)} height={RFValue(44)} />
          )}
          {situationStatus.isAnotherResponsible && (
            <LogoSvg6 width={RFValue(200)} height={RFValue(44)} />
          )}
          {situationStatus.isGetPregnant && (
            <LogoSvg4 width={RFValue(200)} height={RFValue(44)} />
          )}
        </View>
        <Container>
          <CorrectView>
            {!isChosenAnswerCorrect && (
              <MaterialCommunityIcons
                name="close-circle"
                size={32}
                color={theme.colors.attention}
              />
            )}
            {isChosenAnswerCorrect && (
              <MaterialCommunityIcons
                name="checkbox-marked-circle"
                size={32}
                color={theme.colors.success}
              />
            )}

            <CorrectText>
              {isChosenAnswerCorrect ? 'Correto!' : 'Incorreto!'}
            </CorrectText>
          </CorrectView>

          <ButtonComponent
            title={answerChosen?.answer || ''}
            backgroundColor={
              isChosenAnswerCorrect
                ? theme.colors.success
                : theme.colors.attention
            }
            color={theme.colors.text_light}
            borderColor={theme.colors.text_light}
            onPress={() => {}}
            height={56}
          />

          <QuestionText>{question?.title?.toString()?.trim()}</QuestionText>
          <ScrollView>
            <AnswerText>{`Resposta: ${question?.explanation} `}</AnswerText>
          </ScrollView>

          <ButtonComponent
            title="Próxima"
            backgroundColor={quizAnswerData.nextButtonBackgroundColor}
            color={quizAnswerData.nextButtonTextColor}
            onPress={() => {
              dispatch(quizShowAnswerModal(false))

              if (goToQuizResult) {
                navigation.navigate('QuizResult', {
                  situation,
                })
                return
              }

              navigation.navigate('Quiz', {
                stepNumber: stepNumber + 1,
                situation,
              })
            }}
            height={56}
          />
        </Container>
      </ImageBackground>
    </View>
  )
}

export default QuizAnswerScreen
