import React from 'react'

import FrequentAskScreen from '@/screens/FrequentAsk/FrequentAskScreen'
import PerfilScreen from '@/screens/Perfil/PerfilScreen'
import PolicyScreen from '@/screens/Policy/PolicyScreen'
import TermConditionScreen from '@/screens/TermCondition/TermConditionScreen'
import UpdateUserScreen from '@/screens/UpdateUser/UpdateUserScreen'
import {createStackNavigator} from '@react-navigation/stack'

const {Navigator, Screen} = createStackNavigator()

export function AppPerfilStackRoutes() {
  return (
    <Navigator initialRouteName="PerfilScreen">
      <Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="FrequentAsk"
        component={FrequentAskScreen}
        options={{
          headerShown: false,
        }}
      />

      <Screen
        name="Policy"
        component={PolicyScreen}
        options={{
          headerShown: false,
        }}
      />

      <Screen
        name="TermCondition"
        component={TermConditionScreen}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="UpdateUser"
        component={UpdateUserScreen}
        options={{
          headerShown: false,
        }}
      />
    </Navigator>
  )
}
