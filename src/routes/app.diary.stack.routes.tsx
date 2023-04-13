import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {useSelector} from 'react-redux'

import {
  getPregnantScreens,
  pregnantScreens,
  breastfeedingScreens,
  IDiaryScreenStack,
} from '@/routes/DiaryScreenStack'
import {
  selectUserChosenCurrentSituation,
  selectUserScreenInitialToMenuDiary,
} from '@/store/User/UserSelectors'
import {TSituation} from '@/types/entities/User/UserEntity.types'
import {createStackNavigator} from '@react-navigation/stack'
const {Navigator, Screen} = createStackNavigator()

export const AppDiaryStackRoutes = () => {
  const chosenCurrentSituation = useSelector(selectUserChosenCurrentSituation)

  const getComponentScreen = useCallback((screen: IDiaryScreenStack) => {
    return (
      <Screen
        key={screen.name}
        name={screen.name}
        component={screen.component}
        options={{
          headerShown: false,
        }}
      />
    )
  }, [])

  const screenNames = useMemo(() => {
    const getScreensBySituation: Record<TSituation, IDiaryScreenStack[]> = {
      getPregnant: getPregnantScreens,
      pregnant: pregnantScreens,
      breastfeeding: breastfeedingScreens,
      anotherResponsible: breastfeedingScreens,
    }
    return getScreensBySituation[chosenCurrentSituation]
  }, [chosenCurrentSituation])

  return (
    <Navigator initialRouteName={screenNames[0].name}>
      {screenNames?.map((screen: IDiaryScreenStack) =>
        getComponentScreen(screen),
      )}
    </Navigator>
  )
}
