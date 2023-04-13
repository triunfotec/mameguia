import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {
  ImageBackground,
  TouchableNativeFeedback,
  View,
  ActivityIndicator,
} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'
import {useDispatch, useSelector} from 'react-redux'

import * as Analytics from 'expo-firebase-analytics'

import IconTestGray from '@/assets/icons_home/tests/icon_test_gray.svg'
import IconTestPurple from '@/assets/icons_home/tests/icon_test_purple.svg'
import IconTestWhite from '@/assets/icons_home/tests/icon_test_white.svg'
import IconTestBlue from '@/assets/icons_home/tests/icon_teste_azul.svg'
import LogoSvg1 from '@/assets/logos/Logo-1.svg'
import LogoSvg2 from '@/assets/logos/Logo-2.svg'
import LogoSvg4 from '@/assets/logos/Logo-4.svg'
import LogoSvg6 from '@/assets/logos/Logo6.svg'
import ButtonComponent from '@/components/Button'
import {getLayoutQuiz} from '@/screens/Quiz/QuizScreen.data'
import {
  ScrollView,
  Container,
  HeaderView,
  ButtonCloseView,
  TitleView,
  TitleText,
  QuestionView,
  QuestionActualNumber,
  QuestionText,
  AnswerView,
} from '@/screens/Quiz/QuizScreen.styles'
import {
  quizQuestionAnswerChosen,
  quizRequest,
  quizReset,
} from '@/store/Quiz/QuizCreators'
import {selectQuestions} from '@/store/Quiz/QuizSelectors'
import {selectUserChosenCurrentSituation} from '@/store/User/UserSelectors'
import {
  TStackNavigationProp,
  TStackScreenParam,
} from '@/types/application/Navigation/NavigationApplication.types'
import {TSituation} from '@/types/entities/User/UserEntity.types'
import {ESituation} from '@/types/entities/User/UserEntity.types'
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native'

export interface IQuizScreenParams {
  stepNumber: number
  situation: TSituation
}
const INITIAL_STEP = 1

const QuizScreen: React.FC = () => {
  const {params} = useRoute<RouteProp<TStackScreenParam, 'Quiz'>>()

  const [stepActual, setStepActual] = useState(INITIAL_STEP)

  const dispatch = useDispatch()
  const navigation = useNavigation<TStackNavigationProp>()

  const questions = useSelector(selectQuestions)
  const chosenCurrentSituation = useSelector(selectUserChosenCurrentSituation)

  const situationStatus = useMemo(() => {
    return {
      isGetPregnant: chosenCurrentSituation === 'getPregnant',
      isPregnant: chosenCurrentSituation === 'pregnant',
      isBreastfeeding: chosenCurrentSituation === 'breastfeeding',
      isAnotherResponsible: chosenCurrentSituation === 'anotherResponsible',
    }
  }, [chosenCurrentSituation])

  const quizData = useMemo(() => {
    return getLayoutQuiz(chosenCurrentSituation)
  }, [chosenCurrentSituation])

  const question = useMemo(() => {
    const step = stepActual

    return questions[step - 1]
  }, [questions, stepActual])

  const isLastQuestion = useMemo(() => {
    return stepActual >= questions?.length
  }, [questions?.length, stepActual])

  const handleResetQuizState = useCallback(() => {
    dispatch(quizReset())
    navigation.reset({
      routes: [{name: 'Quiz', params: {stepNumber: INITIAL_STEP}}],
    })
  }, [dispatch, navigation])

  useEffect(() => {
    setStepActual(INITIAL_STEP)
    dispatch(quizRequest(chosenCurrentSituation))

    Analytics.logEvent('screen_view', {
      screen_name: `Tela Teste ${ESituation[chosenCurrentSituation]}`,
    })
  }, [dispatch, chosenCurrentSituation, handleResetQuizState])

  useEffect(() => {
    if (params?.stepNumber) {
      setStepActual(params.stepNumber)
    }
  }, [params?.stepNumber])

  return (
    <View style={{flex: 1}}>
      {quizData && questions.length > 0 && (
        <ImageBackground
          resizeMode="cover"
          source={quizData?.backgroundImage}
          style={{
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}>
          <ScrollView>
            <Container>
              <HeaderView>
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
                <TouchableNativeFeedback onPress={() => {}}>
                  <ButtonCloseView>
                    <></>
                  </ButtonCloseView>
                </TouchableNativeFeedback>
              </HeaderView>
              {question ? (
                <>
                  <TitleView>
                    {situationStatus.isGetPregnant && <IconTestPurple />}
                    {situationStatus.isPregnant && <IconTestWhite />}
                    {situationStatus.isBreastfeeding && <IconTestGray />}
                    {situationStatus.isAnotherResponsible && <IconTestBlue />}
                    <TitleText color={quizData.title}>
                      Quiz: {ESituation[chosenCurrentSituation]}
                    </TitleText>
                  </TitleView>

                  <QuestionView
                    backgroundColor={quizData.questionViewBackgroundColor}>
                    <QuestionActualNumber
                      color={quizData.questionTextBackgroundColor}>
                      {stepActual} de {questions?.length}
                    </QuestionActualNumber>

                    <QuestionText color={quizData.questionTextBackgroundColor}>
                      {question?.title}
                    </QuestionText>
                  </QuestionView>

                  {question?.answers &&
                    question?.answers?.map((answer, index) => (
                      <AnswerView key={index}>
                        <ButtonComponent
                          title={answer.answer}
                          backgroundColor={quizData.answerBackgroundColor}
                          color={quizData.answerTextColor}
                          borderColor={quizData.answerBorderColor}
                          onPress={() => {
                            dispatch(
                              quizQuestionAnswerChosen(question.id, answer.id),
                            )
                            navigation.navigate('QuizAnswer', {
                              stepNumber: stepActual,
                              goToQuizResult: isLastQuestion,
                              questionId: question.id,
                              situation: chosenCurrentSituation,
                            })
                          }}
                          height={56}
                        />
                      </AnswerView>
                    ))}
                </>
              ) : (
                <View style={{marginTop: 20}}>
                  <ActivityIndicator size="small" color={quizData.title} />
                </View>
              )}
            </Container>
          </ScrollView>
        </ImageBackground>
      )}
    </View>
  )
}

export default QuizScreen
