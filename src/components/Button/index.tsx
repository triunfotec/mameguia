import React from 'react'
import {GestureResponderEvent, ActivityIndicator} from 'react-native'

import {FontAwesome} from '@expo/vector-icons'

import {Button, View, Text} from './styles'

interface IButtonComponentProps {
  title: string
  onPress?: (event?: GestureResponderEvent) => void
  disabled?: boolean
  backgroundColor: string
  color: string
  nameIcon?: keyof typeof FontAwesome.glyphMap
  borderColor?: string
  isSocial?: boolean
  height?: number
  width?: number
  loading?: boolean
}

const ButtonComponent: React.FC<IButtonComponentProps> = ({
  title,
  onPress,
  disabled,
  color,
  backgroundColor,
  nameIcon,
  borderColor,
  isSocial,
  height,
  width,
  loading,
}) => {
  return (
    <Button onPress={onPress} disabled={disabled}>
      <View
        backgroundColor={backgroundColor}
        borderColor={borderColor ? borderColor : '#fff'}
        isSocial={isSocial}
        height={height}
        width={width}
        disabled={disabled}>
        {nameIcon && <FontAwesome name={nameIcon} size={16} color={color} />}

        {!loading && <Text color={color}>{title}</Text>}

        {loading && <ActivityIndicator color={color} />}
      </View>
    </Button>
  )
}

export default ButtonComponent
