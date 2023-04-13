import React from 'react'
import {TouchableOpacity} from 'react-native'
import {useSelector} from 'react-redux'

import DiaryHoverSvg from '@/assets/menu/hover/icon_diario_hover.svg'
import HomeHoverSvg from '@/assets/menu/hover/icon_home_hover.svg'
import PerfilHoverSvg from '@/assets/menu/hover/icon_perfil_hover.svg'
import TesteHoverSvg from '@/assets/menu/hover/icon_teste_hover.svg'
import DiarySvg from '@/assets/menu/icon_diary_azul.svg'
import HomeSvg from '@/assets/menu/icon_home_azul.svg'
import PerfilSvg from '@/assets/menu/icon_perfil_azul.svg'
import TesteSvg from '@/assets/menu/icon_teste_azul.svg'
import {AppDiaryStackRoutes} from '@/routes/app.diary.stack.routes'
import {selectUserChosenCurrentSituation} from '@/store/User/UserSelectors'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import {AppHomeStackRoutes} from './app.home.stack.routes'
import {AppPerfilStackRoutes} from './app.perfil.stack.routes'
import {AppTestStackRoutes} from './app.test.stack.routes'

const Tab = createBottomTabNavigator()
interface ITabRoutes {
  withoutTabBar: boolean
}

const AppTabRoutes: React.FC<ITabRoutes> = ({withoutTabBar}) => {
  const chosenCurrentSituation = useSelector(selectUserChosenCurrentSituation)

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 10,
          display: withoutTabBar ? 'none' : 'flex',
        },
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="TabHome"
        component={AppHomeStackRoutes}
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? (
              <HomeHoverSvg width={24} height={24} />
            ) : (
              <HomeSvg width={24} height={24} />
            )
          },
          headerTitle: '',
          tabBarLabel: 'Home',
          tabBarActiveTintColor: '#000000',
        }}
      />
      <Tab.Screen
        name="Testes"
        component={AppTestStackRoutes}
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? (
              <TesteHoverSvg width={24} height={24} />
            ) : (
              <TesteSvg width={24} height={24} />
            )
          },
          headerTitle: 'Quiz',
          tabBarLabel: 'Quiz',
          tabBarActiveTintColor: '#000000',
        }}
      />

      <Tab.Screen
        name="Diary"
        component={AppDiaryStackRoutes}
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? (
              <DiaryHoverSvg width={24} height={24} />
            ) : (
              <DiarySvg
                width={24}
                height={24}
                fillOpacity={
                  chosenCurrentSituation === 'anotherResponsible' ? 0.2 : 1
                }
              />
            )
          },
          unmountOnBlur: false,
          headerTitle: 'Diário',
          tabBarLabel: 'Diário',
          tabBarActiveTintColor: '#000000',
          tabBarButton: props => (
            <TouchableOpacity
              {...props}
              disabled={chosenCurrentSituation === 'anotherResponsible'}
              activeOpacity={0.5}
            />
          ),
        }}
      />

      <Tab.Screen
        name="PerfilMenu"
        component={AppPerfilStackRoutes}
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? (
              <PerfilHoverSvg width={24} height={24} />
            ) : (
              <PerfilSvg width={24} height={24} />
            )
          },
          headerTitle: 'Perfil',
          tabBarLabel: 'Perfil',
          tabBarActiveTintColor: '#000000',
        }}
      />
    </Tab.Navigator>
  )
}
export default AppTabRoutes
