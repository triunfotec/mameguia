import {
  Action,
  applyMiddleware,
  combineReducers,
  createStore,
  Store,
} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {persistReducer, persistStore} from 'redux-persist'
import createSagaMiddleware from 'redux-saga'

import ApplicationStore from 'ApplicationStore'

import {ServiceConfig} from '@/services/ServiceConfig'
import ArticleReducer from '@/store/Article/ArticleCreators'
import BreastfeedingReducer from '@/store/Breastfeeding/BreastfeedingCreators'
import FertileCycleReducer from '@/store/FertileCycle/FertileCycleCreators'
import FrequentAskReducer from '@/store/FrequentAsk/FrequentAskCreators'
import PolicyReducer from '@/store/Policy/PolicyCreators'
import QuizReducer from '@/store/Quiz/QuizCreators'
import SagaConfig from '@/store/SagaConfig'
import TermReducer from '@/store/Term/TermCreators'
import UserReducer from '@/store/User/UserCreators'
import VideoReducer from '@/store/Video/VideoCreators'
import WeekReducer from '@/store/Week/WeekCreators'
import AsyncStorage from '@react-native-async-storage/async-storage'

const PERSIST_CONFIG = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [
    'quiz',
    'week',
    'breastfeeding',
    'article',
    'fertileCycle',
    'policy',
    'term',
    'user',
    'video',
  ],
}

const ReducerConfig = combineReducers({
  quiz: QuizReducer,
  week: WeekReducer,
  breastfeeding: BreastfeedingReducer,
  article: ArticleReducer,
  fertileCycle: FertileCycleReducer,
  frequentAsk: FrequentAskReducer,
  policy: PolicyReducer,
  term: TermReducer,
  user: UserReducer,
  video: VideoReducer,
})

export const PersistedReducer = persistReducer(PERSIST_CONFIG, ReducerConfig)

const RootReducer = (state: any, action: Action) => {
  return PersistedReducer(state, action)
}

export const SagaMiddleware = createSagaMiddleware()
const middleware = [SagaMiddleware]

// if (__DEV__ && !process.env.JEST_WORKER_ID) {
//   const createDebugger = require('redux-flipper').default
//   middleware.push(createDebugger())
// }

const store: Store<ApplicationStore.State> = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(...middleware)),
)

SagaMiddleware.run(SagaConfig)
const serviceConfig = new ServiceConfig()
serviceConfig.applyInterceptors(store)

export default () => {
  const persistor = persistStore(store)
  return {store, persistor}
}
