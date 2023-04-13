import BackgroundPregnant from '@/assets/backgroundHome/background_gestante.png'
import BackgroundBreastfeeding from '@/assets/backgroundHome/background_lactante.png'
import BackgroundResponsible from '@/assets/backgroundHome/background_responsible.png'
import BackgroundGetPregnant from '@/assets/backgroundHome/background_tentante.png'
import theme from '@/global/styles/theme'
import {TSituation} from '@/types/entities/User/UserEntity.types'

const quizResult: any = {
  getPregnant: {
    backgroundImage: BackgroundGetPregnant,
    primaryColor: theme.colors.primary,
    secondaryColor: theme.colors.secondary_light,
    boxResponseBackground: theme.colors.primary,
    questionColor: theme.colors.text_light,
    answerColor: theme.colors.text_light,
    iconErrorColor: theme.colors.attention,
    iconSuccessColor: theme.colors.success,
  },
  pregnant: {
    backgroundImage: BackgroundPregnant,
    primaryColor: theme.colors.secondary_light,
    secondaryColor: theme.colors.primary,
    boxResponseBackground: theme.colors.secondary_light,
    questionColor: theme.colors.primary,
    answerColor: theme.colors.primary,
    iconErrorColor: theme.colors.attention,
    iconSuccessColor: theme.colors.success,
  },
  breastfeeding: {
    backgroundImage: BackgroundBreastfeeding,
    primaryColor: theme.colors.text_light,
    secondaryColor: theme.colors.text_light,
    boxResponseBackground: theme.colors.blue,
    questionColor: theme.colors.text_light,
    answerColor: theme.colors.text_light,
    iconErrorColor: theme.colors.attention,
    iconSuccessColor: theme.colors.success,
  },
  anotherResponsible: {
    backgroundImage: BackgroundResponsible,
    primaryColor: theme.colors.blue,
    secondaryColor: theme.colors.text_light,
    boxResponseBackground: theme.colors.secondary,
    questionColor: theme.colors.text_light,
    answerColor: theme.colors.text_light,
    iconErrorColor: theme.colors.attention,
    iconSuccessColor: theme.colors.success,
  },
}

export const getLayoutQuizResult = (situation: TSituation) => {
  return quizResult[situation]
}
