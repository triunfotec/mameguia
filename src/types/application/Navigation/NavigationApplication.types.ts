import {IArticleItemsScreenParams} from '@/screens/ArticleItems/ArticleItemsScreen'
import {IBreastfeedHistoryEditScreenParams} from '@/screens/BreastfeedHistory/BreastfeedHistoryEditScreen'
import {IBreastfeedHistoryScreenParams} from '@/screens/BreastfeedHistory/BreastfeedHistoryScreen'
import {IChooseWeekInitialDateParams} from '@/screens/ChooseWeek/ChooseWeekInitialDateScreen'
import {IDiaryScreenParams} from '@/screens/Diary/DiaryScreen'
import {IFertileDigitalTableScreenParam} from '@/screens/FertileDigitalTable/FertileDigitalTableScreen'
import {IQuizScreenParams} from '@/screens/Quiz/QuizScreen'
import {IQuizAnswerScreenParams} from '@/screens/QuizAnswer/QuizAnswerScreen'
import {IQuizResultScreenParams} from '@/screens/QuizResult/QuizResultScreen'
import {ISmsScreenParams} from '@/screens/Sms/SmsScreen'
import {ITermsScreenParams} from '@/screens/Terms/TermsScreen'
import {ITextScreenParams} from '@/screens/Test/TestScreen'
import {IWeekDescriptionScreenParams} from '@/screens/WeekDescription/WeekDescriptionScreen'
import {StackNavigationProp} from '@react-navigation/stack'

export type TStackScreenParam = {
  Articles: undefined
  ArticleItems: IArticleItemsScreenParams
  BreastfeedAddBreastfeeding: undefined
  BreastfeedBabyWasBorn: undefined
  BreastfeedEndBreastfeeding: undefined
  BreastfeedGetAgeMonths: undefined
  BreastfeedGetAmountSupplementation: undefined
  BreastfeedGetHowToFeed: undefined
  BreastfeedGetNameGenre: undefined
  BreastfeedHistory: IBreastfeedHistoryScreenParams
  BreastfeedHistoryEdit: IBreastfeedHistoryEditScreenParams
  BreastfeedSaveDiaryBreastfeeding: undefined
  BreastfeedStartBreastfeeding: undefined
  Chat: undefined
  ChooseCategory: undefined
  ChooseWeek: undefined
  ChooseWeekInitialDate: IChooseWeekInitialDateParams
  Diary: IDiaryScreenParams
  DiaryScreen: undefined
  FertileDigitalTable: IFertileDigitalTableScreenParam
  FertileDigitalTableChooseDate: undefined
  FertileDigitalTableHistoric: undefined
  ForgotMyPassword: undefined
  FrequentAsk: undefined
  Home: undefined
  Introduction: undefined
  Perfil: undefined
  PerfilMenu: undefined
  Policy: undefined
  PrivacyPolicy: undefined
  Quiz: IQuizScreenParams
  QuizAnswer: IQuizAnswerScreenParams
  QuizResult: IQuizResultScreenParams
  SignIn: undefined
  SignUp: undefined
  Sms: ISmsScreenParams
  TabHome: undefined
  Terms: ITermsScreenParams
  TermCondition: undefined
  Test: undefined
  Testes: ITextScreenParams
  UpdateUser: undefined
  Week: undefined
  WeekDescription: IWeekDescriptionScreenParams
  Videos: undefined
}

export type TStackResourcesParam = TStackScreenParam

export type TStackNavigationProp = StackNavigationProp<TStackResourcesParam>

export interface IScreen {
  name: keyof TStackResourcesParam
  component: React.ComponentType<any>
  options?: any
}

export interface INavigationScreen {
  navigate?: INavigate
  history: Array<{
    screen: keyof TStackResourcesParam
    params?: object
  }>
}

export interface INavigate {
  screen: keyof TStackResourcesParam
  params?: any
}
