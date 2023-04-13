import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {ImageBackground, View, TouchableNativeFeedback} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'
import {useDispatch, useSelector} from 'react-redux'

import IconCorrect from '@/assets/icons_home/btn-correto.svg'
import IconError from '@/assets/icons_home/btn-errado.svg'
import LogoSvg1 from '@/assets/logos/Logo-1.svg'
import LogoSvg2 from '@/assets/logos/Logo-2.svg'
import LogoSvg4 from '@/assets/logos/Logo-4.svg'
import LogoSvg6 from '@/assets/logos/Logo6.svg'
import {getLayoutQuizResult} from '@/screens/QuizResult/QuizResultScreen.data'
import {
  ScrollView,
  Container,
  HeaderView,
  ButtonCloseView,
  SituationText,
  ClassificationText,
  PercentView,
  PercentBoxView,
  PercentText,
  PercentSymbolText,
  QuantityText,
  RetakeText,
  YourResponseText,
  BoxResponseView,
  QuestionText,
  AnswerText,
  ButtonsView,
  ButtonText,
} from '@/screens/QuizResult/QuizResultScreen.styles'
import {quizReset} from '@/store/Quiz/QuizCreators'
import {selectQuestions} from '@/store/Quiz/QuizSelectors'
import {selectUserChosenCurrentSituation} from '@/store/User/UserSelectors'
import {
  TStackNavigationProp,
  TStackScreenParam,
} from '@/types/application/Navigation/NavigationApplication.types'
import {TSituation} from '@/types/entities/User/UserEntity.types'
import {ESituation} from '@/types/entities/User/UserEntity.types'
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native'

export interface IQuizResultScreenParams {
  situation: TSituation
}
interface IShowQuestion {
  id: number
  show: boolean
}

const QuizResultScreen: React.FC = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation<TStackNavigationProp>()
  const {params} = useRoute<RouteProp<TStackScreenParam, 'QuizResult'>>()

  const {situation}: IQuizResultScreenParams = params
  const chosenCurrentSituation = useSelector(selectUserChosenCurrentSituation)

  const [questionsShow, setQuestionShow] = useState<IShowQuestion[]>()

  const situationStatus = useMemo(() => {
    return {
      isGetPregnant: situation === 'getPregnant',
      isPregnant: situation === 'pregnant',
      isBreastfeeding: situation === 'breastfeeding',
      isAnotherResponsible: situation === 'anotherResponsible',
    }
  }, [situation])

  const scrollRef = useRef<any>()

  const questions = useSelector(selectQuestions)

  const quizResultData = getLayoutQuizResult(situation)

  const sumQuantityResponseCorrect = useMemo(() => {
    return questions?.reduce((total, question) => {
      return total + (question?.userResponseIsCorrect ? 1 : 0)
    }, 0)
  }, [questions])

  const percentageNumber = useMemo(() => {
    return (
      Math.round((sumQuantityResponseCorrect / questions.length) * 100) || 0
    )
  }, [questions.length, sumQuantityResponseCorrect])

  const textPercentageRule = useMemo(() => {
    if (percentageNumber <= 25) {
      return 'Faça novamente!'
    }

    if (percentageNumber <= 50) {
      return 'Quase lá!'
    }

    if (percentageNumber <= 75) {
      return 'Muito bem!'
    }

    return 'Parabéns:)'
  }, [percentageNumber])

  const canShowAnswer = useCallback(
    (questionId: number) => {
      const question = questionsShow?.find(
        question => question.id === questionId,
      )
      return question?.show || false
    },
    [questionsShow],
  )

  const handleResetQuizState = useCallback(() => {
    dispatch(quizReset())
    navigation.reset({
      routes: [{name: 'Quiz', params: {stepNumber: 1, situation}}],
    })
  }, [dispatch, navigation, situation])

  useEffect(() => {
    const a = questions.map(question => ({
      id: question.id,
      show: false,
    }))

    setQuestionShow(a)
  }, [questions])

  useEffect(() => {
    if (chosenCurrentSituation !== situation) {
      handleResetQuizState()
    }
  }, [chosenCurrentSituation, handleResetQuizState, situation])

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        resizeMode="cover"
        source={quizResultData.backgroundImage}
        style={{
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}>
        <ScrollView ref={scrollRef}>
          <Container>
            <HeaderView>
              {situationStatus.isGetPregnant && (
                <LogoSvg4 width={RFValue(200)} height={RFValue(44)} />
              )}
              {situationStatus.isPregnant && (
                <LogoSvg1 width={RFValue(200)} height={RFValue(44)} />
              )}
              {situationStatus.isBreastfeeding && (
                <LogoSvg2 width={RFValue(200)} height={RFValue(44)} />
              )}
              {situationStatus.isAnotherResponsible && (
                <LogoSvg6 width={RFValue(200)} height={RFValue(44)} />
              )}

              <TouchableNativeFeedback onPress={() => {}}>
                <ButtonCloseView>
                  <></>
                </ButtonCloseView>
              </TouchableNativeFeedback>
            </HeaderView>

            <SituationText color={quizResultData.primaryColor}>
              {ESituation[situation]}
            </SituationText>

            <ClassificationText color={quizResultData.primaryColor}>
              {textPercentageRule}
            </ClassificationText>

            <PercentView borderColor={quizResultData.primaryColor}>
              <PercentBoxView>
                <PercentText color={quizResultData.primaryColor}>
                  {percentageNumber}
                </PercentText>
                <PercentSymbolText color={quizResultData.primaryColor}>
                  %
                </PercentSymbolText>
              </PercentBoxView>

              <QuantityText color={quizResultData.primaryColor}>
                {sumQuantityResponseCorrect} / {questions.length}
              </QuantityText>
            </PercentView>

            <TouchableNativeFeedback
              onPress={() => {
                handleResetQuizState()
              }}>
              <RetakeText color={quizResultData.primaryColor}>
                Refazer o quiz
              </RetakeText>
            </TouchableNativeFeedback>

            <YourResponseText color={quizResultData.primaryColor}>
              Suas Respostas:
            </YourResponseText>

            {questions.length > 0 &&
              questions.map(question => (
                <BoxResponseView
                  key={question.id}
                  backgroundColor={quizResultData.boxResponseBackground}>
                  {question.userResponseIsCorrect ? (
                    <IconCorrect width={RFValue(32)} height={RFValue(32)} />
                  ) : (
                    <IconError width={RFValue(32)} height={RFValue(32)} />
                  )}

                  <QuestionText color={quizResultData.questionColor}>
                    {question.title}
                  </QuestionText>

                  {canShowAnswer(question.id) && (
                    <AnswerText color={quizResultData.answerColor}>
                      {question.explanation}
                    </AnswerText>
                  )}

                  <TouchableNativeFeedback
                    onPress={() => {
                      const b = questionsShow?.map(q => ({
                        ...q,
                        show: q.id === question.id ? !q.show : q.show,
                      }))

                      setQuestionShow(b)
                    }}>
                    <ButtonsView>
                      <ButtonText color={quizResultData.secondaryColor}>
                        {canShowAnswer(question.id)
                          ? 'Fechar resposta'
                          : 'Ver resposta'}
                      </ButtonText>
                    </ButtonsView>
                  </TouchableNativeFeedback>
                </BoxResponseView>
              ))}
          </Container>
        </ScrollView>
      </ImageBackground>
    </View>
  )
}

export default QuizResultScreen
