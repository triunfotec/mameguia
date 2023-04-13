import React from 'react'

import ArticleItemsScreen from '@/screens/ArticleItems/ArticleItemsScreen'
import ArticlesScreen from '@/screens/Articles/ArticlesScreen'
import ChatScreen from '@/screens/Chat/ChatScreen'
import HomeScreen from '@/screens/Home/HomeScreen'
import QuizScreen from '@/screens/Quiz/QuizScreen'
import QuizResultScreen from '@/screens/QuizResult/QuizResultScreen'
import VideosScreen from '@/screens/Videos/VideosScreen'
import {createStackNavigator} from '@react-navigation/stack'

const {Navigator, Screen} = createStackNavigator()

export function AppHomeStackRoutes() {
  return (
    <Navigator initialRouteName="HomeScreen">
      <Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />

      <Screen
        name="Quiz"
        component={QuizScreen}
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

      <Screen
        name="Articles"
        component={ArticlesScreen}
        options={{
          headerShown: false,
        }}
      />

      <Screen
        name="ArticleItems"
        component={ArticleItemsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="Chat"
        component={ChatScreen}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="Videos"
        component={VideosScreen}
        options={{
          headerShown: false,
        }}
      />
    </Navigator>
  )
}
