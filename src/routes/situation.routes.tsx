import React from 'react'

import ChooseCategoryScreen from '@/screens/ChooseCategory/ChooseCategoryScreen'
import {createStackNavigator} from '@react-navigation/stack'

const {Navigator, Screen} = createStackNavigator()

export function SituationRoutes() {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="ChooseCategory" component={ChooseCategoryScreen} />
    </Navigator>
  )
}
