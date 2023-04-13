import 'react-native-gesture-handler'
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import React, {useEffect} from 'react'
import {SafeAreaView, StatusBar} from 'react-native'

import {useFonts} from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import {ThemeProvider} from 'styled-components'

import theme from './src/global/styles/theme'
import {AuthProvider, useAuth} from './src/hooks/auth'
import Routes from './src/routes'

const App = () => {
  const [fontsLoaded] = useFonts({
    AccordAlternateBold: require('@/assets/fonts/AccordAlternate-Bold.ttf'),
    AccordAlternateExtraBold: require('@/assets/fonts/AccordAlternate-ExtraBold.ttf'),
    AccordAlternateMedium: require('@/assets/fonts/AccordAlternate-Medium.ttf'),
    AccordAlternateRegular: require('@/assets/fonts/AccordAlternate-Regular.ttf'),
  })

  const {userStorageIsLoading} = useAuth()

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync()
      } finally {
        await SplashScreen.hideAsync()
      }
    }
    prepare()
  }, [])

  if (!fontsLoaded || userStorageIsLoading) {
    return null
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
        translucent
      />
      <AuthProvider>
        <SafeAreaView style={{flex: 1, paddingTop: 30}}>
          <Routes />
        </SafeAreaView>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
