import {spawn, all, call} from 'redux-saga/effects'

import ArticleSagas from '@/store/Article/ArticleSagas'
import BreastfeedingSagas from '@/store/Breastfeeding/BreastfeedingSagas'
import FertileCycleSagas from '@/store/FertileCycle/FertileCycleSagas'
import FrequentAskSagas from '@/store/FrequentAsk/FrequentAskSagas'
import PolicySagas from '@/store/Policy/PolicySagas'
import QuizSagas from '@/store/Quiz/QuizSagas'
import TermSagas from '@/store/Term/TermSagas'
import UserSagas from '@/store/User/UserSagas'
import VideoSagas from '@/store/Video/VideoSagas'
import WeekSagas from '@/store/Week/WeekSagas'

const sagas = [
  ArticleSagas,
  BreastfeedingSagas,
  FertileCycleSagas,
  FrequentAskSagas,
  PolicySagas,
  QuizSagas,
  TermSagas,
  WeekSagas,
  UserSagas,
  VideoSagas,
]

export default function* SagaConfig() {
  yield all(
    sagas.map(saga =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga)
            break
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error)
          }
        }
      }),
    ),
  )
}
