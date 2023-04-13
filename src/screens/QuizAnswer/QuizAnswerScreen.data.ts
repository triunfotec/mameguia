import BackgroundPregnant from '@/assets/backgroundHome/background_gestante.png'
import BackgroundBreastfeeding from '@/assets/backgroundHome/background_lactante.png'
import BackgroundResponsible from '@/assets/backgroundHome/background_responsible.png'
import BackgroundGetPregnant from '@/assets/backgroundHome/background_tentante.png'
import theme from '@/global/styles/theme'
import {TSituation} from '@/types/entities/User/UserEntity.types'

const quizAnswer: any = {
  getPregnant: {
    backgroundImage: BackgroundGetPregnant,
    nextButtonBackgroundColor: theme.colors.primary,
    nextButtonTextColor: theme.colors.text_light,
  },
  pregnant: {
    backgroundImage: BackgroundPregnant,
    nextButtonBackgroundColor: theme.colors.secondary_light,
    nextButtonTextColor: theme.colors.primary,
  },
  breastfeeding: {
    backgroundImage: BackgroundBreastfeeding,
    nextButtonBackgroundColor: theme.colors.blue,
    nextButtonTextColor: theme.colors.text_light,
  },
  anotherResponsible: {
    backgroundImage: BackgroundResponsible,
    nextButtonBackgroundColor: theme.colors.secondary,
    nextButtonTextColor: theme.colors.text_light,
  },
}

export const getLayoutQuizAnswer = (situation: TSituation) => {
  return quizAnswer[situation]
}
