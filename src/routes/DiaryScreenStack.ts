import BreastfeedAddBreastfeedingScreen from '@/screens/BreastfeedAddBreastfeeding/BreastfeedAddBreastfeedingScreen'
import BreastfeedEndBreastfeedingScreen from '@/screens/BreastfeedEndBreastfeeding/BreastfeedEndBreastfeedingScreen'
import BreastfeedGetAgeMonthsScreen from '@/screens/BreastfeedGetAgeMonths/BreastfeedGetAgeMonthsScreen'
import BreastfeedGetAmountSupplementationScreen from '@/screens/BreastfeedGetAmountSupplementation/BreastfeedGetAmountSupplementationScreen'
import BreastfeedGetHowToFeedScreen from '@/screens/BreastfeedGetHowToFeed/BreastfeedGetHowToFeedScreen'
import BreastfeedGetNameGenreScreen from '@/screens/BreastfeedGetNameGenre/BreastfeedGetNameGenreScreen'
import BreastfeedHistoryEditScreen from '@/screens/BreastfeedHistory/BreastfeedHistoryEditScreen'
import BreastfeedHistoryScreen from '@/screens/BreastfeedHistory/BreastfeedHistoryScreen'
import BreastfeedSaveDiaryBreastfeedingScreen from '@/screens/BreastfeedSaveDiaryBreastfeeding/BreastfeedSaveDiaryBreastfeedingScreen'
import BreastfeedStartBreastfeedingScreen from '@/screens/BreastfeedStartBreastfeeding/BreastfeedStartBreastfeedingScreen'
import ChatScreen from '@/screens/Chat/ChatScreen'
import ChooseWeekInitialDate from '@/screens/ChooseWeek/ChooseWeekInitialDateScreen'
import ChooseWeek from '@/screens/ChooseWeek/ChooseWeekScreen'
import FertileDigitalTableScreen from '@/screens/FertileDigitalTable/FertileDigitalTableScreen'
import FertileDigitalTableChooseDateScreen from '@/screens/FertileDigitalTableChooseDate/FertileDigitalTableChooseDateScreen'
import FertileDigitalTableHistoricScreen from '@/screens/FertileDigitalTableHistoric/FertileDigitalTableHistoricScreen'
import FrequentAskScreen from '@/screens/FrequentAsk/FrequentAskScreen'
import Week from '@/screens/Week/WeekScreen'
import WeekDescription from '@/screens/WeekDescription/WeekDescriptionScreen'

export interface IDiaryScreenStack {
  name: string
  component: React.FC<{}>
}

export const getPregnantScreens: IDiaryScreenStack[] = [
  {
    name: 'FertileDigitalTableHistoric',
    component: FertileDigitalTableHistoricScreen,
  },
  {
    name: 'FertileDigitalTableChooseDate',
    component: FertileDigitalTableChooseDateScreen,
  },
  {
    name: 'FertileDigitalTable',
    component: FertileDigitalTableScreen,
  },
]

export const pregnantScreens: IDiaryScreenStack[] = [
  {name: 'Week', component: Week},
  {name: 'ChooseWeek', component: ChooseWeek},
  {name: 'ChooseWeekInitialDate', component: ChooseWeekInitialDate},
  {name: 'WeekDescription', component: WeekDescription},
]

export const breastfeedingScreens: IDiaryScreenStack[] = [
  {name: 'BreastfeedHistory', component: BreastfeedHistoryScreen},
  {name: 'BreastfeedHistoryEdit', component: BreastfeedHistoryEditScreen},
  {
    name: 'BreastfeedAddBreastfeeding',
    component: BreastfeedAddBreastfeedingScreen,
  },
  {
    name: 'BreastfeedEndBreastfeeding',
    component: BreastfeedEndBreastfeedingScreen,
  },
  {name: 'BreastfeedGetAgeMonths', component: BreastfeedGetAgeMonthsScreen},
  {
    name: 'BreastfeedGetAmountSupplementation',
    component: BreastfeedGetAmountSupplementationScreen,
  },
  {name: 'BreastfeedGetHowToFeed', component: BreastfeedGetHowToFeedScreen},
  {name: 'BreastfeedGetNameGenre', component: BreastfeedGetNameGenreScreen},

  {
    name: 'BreastfeedSaveDiaryBreastfeeding',
    component: BreastfeedSaveDiaryBreastfeedingScreen,
  },
  {
    name: 'BreastfeedStartBreastfeeding',
    component: BreastfeedStartBreastfeedingScreen,
  },
  {name: 'Chat', component: ChatScreen},
  {name: 'FrequentAsk', component: FrequentAskScreen},
]
