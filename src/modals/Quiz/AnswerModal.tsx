import React, {useMemo} from 'react'
import {Modal} from 'react-native'
import {useDispatch} from 'react-redux'

import {useTheme} from 'styled-components'

import ButtonComponent from '@/components/Button'
import {
  Container,
  CorrectView,
  CorrectText,
  QuestionText,
  AnswerText,
} from '@/modals/Quiz/AnswerModal.styles'
import {quizShowAnswerModal} from '@/store/Quiz/QuizCreators'
import {
  TStackNavigationProp,
  TStackScreenParam,
} from '@/types/application/Navigation/NavigationApplication.types'
import {IQuizQuestion} from '@/types/entities/Quiz/QuizQuestionEntity.type'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'

export interface IAnswerModal {
  visible: boolean
  question: IQuizQuestion
  goToQuizResult: boolean
  questionIndex: number
}
const AnswerModal: React.FC<IAnswerModal> = ({
  visible,
  question,
  goToQuizResult,
  questionIndex,
}) => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const navigation = useNavigation<TStackNavigationProp>()

  const answerChosen = useMemo(() => {
    const {answers} = question

    return answers.find(answer => answer.selected)
  }, [question])

  const isChosenAnswerCorrect = useMemo(() => {
    const {answers} = question

    let isCorrect = false

    answers.forEach(answer => {
      if (answer.correct && answer?.selected) {
        isCorrect = true
      }
    })

    return isCorrect
  }, [question])

  return (
    <Modal visible={visible} transparent={true}>
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

        <QuestionText>{question.title}</QuestionText>

        <AnswerText>{`Resposta: ${question.explanation} `}</AnswerText>

        <ButtonComponent
          title="Próxima"
          backgroundColor={theme.colors.secondary_light}
          color={theme.colors.primary}
          borderColor={theme.colors.secondary_light}
          onPress={() => {
            dispatch(quizShowAnswerModal(false))

            if (goToQuizResult) {
              navigation.reset({
                routes: [{name: 'QuizResult'}],
              })
              return
            }

            navigation.reset({
              routes: [{name: 'Quiz', params: {stepNumber: questionIndex + 1}}],
            })
          }}
          height={56}
        />
      </Container>
    </Modal>
  )
}

export default AnswerModal
