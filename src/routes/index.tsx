import React, {useCallback, useEffect, useState} from 'react'
import {Provider} from 'react-redux'

import {PersistGate} from 'redux-persist/integration/react'

import * as Analytics from 'expo-firebase-analytics'

import {useAuth} from '@/hooks/auth'
import {SituationRoutes} from '@/routes/situation.routes'
import StoreConfig from '@/store/StoreConfig'
import {TStackResourcesParam} from '@/types/application/Navigation/NavigationApplication.types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {NavigationContainer, NavigationState} from '@react-navigation/native'

import AppTabRoutes from './app.tab.routes'
import AuthRoutes from './auth.routes'
import {nameScreenAnalytics} from './nameScreenAnalytics'
const {store, persistor} = StoreConfig()

const Routes: React.FC = () => {
  const {user, loggedOut} = useAuth()
  const [hasSignOut, setHasSignOut] = useState(false)
  const [withoutTabBar, setWithoutTabBar] = useState(false)

  async function handleInitialRoute() {
    const logout = (await AsyncStorage.getItem('@mameguia:signOut')) || ''

    setHasSignOut(!!logout || false)
  }

  const getActiveRouteName = useCallback((navigationState: NavigationState) => {
    if (!navigationState) return null
    const route = navigationState.routes[navigationState.index]

    if (route?.state?.routes && route?.state?.index) {
      const screenName = route.state.routes[route.state.index]
        .name as keyof TStackResourcesParam

      return nameScreenAnalytics[screenName]
    }

    return route.state?.routes[route?.state?.index || 0].name || 'Home'
  }, [])

  useEffect(() => {
    handleInitialRoute()
  }, [user, loggedOut])

  return (
    <NavigationContainer
      onStateChange={async state => {
        if (state) {
          const currentScreen: string | null = getActiveRouteName(state)

          setWithoutTabBar(currentScreen === 'Chat')

          if (
            currentScreen === 'Home' ||
            currentScreen === 'Testes' ||
            currentScreen === 'Quiz'
          ) {
            return
          }

          if (currentScreen) {
            await Analytics.logEvent('screen_view', {
              screen_name: `Tela ${currentScreen}`,
            })
          }
        }
      }}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          {user.id ? (
            user?.situation ? (
              <AppTabRoutes withoutTabBar={withoutTabBar} />
            ) : (
              <SituationRoutes />
            )
          ) : (
            <AuthRoutes isSignOut={hasSignOut} />
          )}
        </PersistGate>
      </Provider>
    </NavigationContainer>
  )
}

export default Routes
