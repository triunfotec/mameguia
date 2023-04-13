import React from 'react'

import {useTheme} from 'styled-components'

import {TStackNavigationProp} from '@/types/application/Navigation/NavigationApplication.types'
import {Ionicons} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'

import {Button, ViewButton} from './styles'

const ButtonBackComponent: React.FC = () => {
  const navigation = useNavigation<TStackNavigationProp>()
  const theme = useTheme()
  return (
    <ViewButton>
      <Button onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={32} color={theme.colors.primary} />
      </Button>
    </ViewButton>
  )
}

export default ButtonBackComponent
