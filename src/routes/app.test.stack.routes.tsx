import React from 'react'

import QuizScreen from '@/screens/Quiz/QuizScreen'
import QuizAnswerScreen from '@/screens/QuizAnswer/QuizAnswerScreen'
import QuizResultScreen from '@/screens/QuizResult/QuizResultScreen'
import {createStackNavigator} from '@react-navigation/stack'

const {Navigator, Screen} = createStackNavigator()

export function AppTestStackRoutes() {
  return (
    <Navigator initialRouteName="Quiz">
      <Screen
        name="Quiz"
        component={QuizScreen}
        options={{
          headerShown: false,
        }}
      />

      <Screen
        name="QuizAnswer"
        component={QuizAnswerScreen}
        options={{
          headerShown: false,
        }}
      />

      <Screen
        name="QuizResult"
        component={QuizResultScreen}
        options={{
          headerShown: false,
        }}
      />
    </Navigator>
  )
}
