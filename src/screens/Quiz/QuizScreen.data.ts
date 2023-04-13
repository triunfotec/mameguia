import BackgroundPregnant from '@/assets/backgroundHome/background_gestante.png'
import BackgroundBreastfeeding from '@/assets/backgroundHome/background_lactante.png'
import BackgroundResponsible from '@/assets/backgroundHome/background_responsible.png'
import BackgroundGetPregnant from '@/assets/backgroundHome/background_tentante.png'
import theme from '@/global/styles/theme'
import {TSituation} from '@/types/entities/User/UserEntity.types'

const quiz: any = {
  getPregnant: {
    backgroundImage: BackgroundGetPregnant,
    title: theme.colors.primary,
    questionViewBackgroundColor: theme.colors.primary,
    questionTextBackgroundColor: theme.colors.text_light,
    answerBackgroundColor: theme.colors.secondary_light,
    answerTextColor: theme.colors.primary,
    answerBorderColor: theme.colors.text_light,
  },
  pregnant: {
    backgroundImage: BackgroundPregnant,
    title: theme.colors.text_light,
    questionViewBackgroundColor: theme.colors.secondary_light,
    questionTextBackgroundColor: theme.colors.primary,
    answerBackgroundColor: theme.colors.primary,
    answerTextColor: theme.colors.secondary_light,
    answerBorderColor: theme.colors.text_light,
  },
  breastfeeding: {
    backgroundImage: BackgroundBreastfeeding,
    title: theme.colors.text_light,
    questionViewBackgroundColor: theme.colors.blue,
    questionTextBackgroundColor: theme.colors.text_light,
    answerBackgroundColor: theme.colors.secondary,
    answerTextColor: theme.colors.text_light,
    answerBorderColor: theme.colors.text_light,
  },
  anotherResponsible: {
    backgroundImage: BackgroundResponsible,
    title: theme.colors.blue,
    questionViewBackgroundColor: theme.colors.secondary,
    questionTextBackgroundColor: theme.colors.text_light,
    answerBackgroundColor: theme.colors.others,
    answerTextColor: theme.colors.blue,
    answerBorderColor: theme.colors.text_light,
  },
}

export const getLayoutQuiz = (situation: TSituation) => {
  return quiz[situation]
}
