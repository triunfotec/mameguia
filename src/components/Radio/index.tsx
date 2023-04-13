import React from 'react'
import {TouchableOpacity} from 'react-native-gesture-handler'

import {useTheme} from 'styled-components'

import {Container, RadioText} from '@/components/Radio/styles'
import {MaterialCommunityIcons} from '@expo/vector-icons'

interface IRadioComponent {
  text: string
  selected: boolean
  onPress: () => void
  color?: string
  fontFamily?: string
}

const RadioComponent: React.FC<IRadioComponent> = ({
  text,
  selected,
  onPress,
  color,
  fontFamily,
}) => {
  const theme = useTheme()

  return (
    <TouchableOpacity onPress={onPress}>
      <Container backgroundColor={theme.colors.text_light}>
        <MaterialCommunityIcons
          name={selected ? 'radiobox-marked' : 'radiobox-blank'}
          size={32}
          color={color || theme.colors.secondary}
        />
        <RadioText
          color={color || theme.colors.secondary}
          fontFamily={fontFamily}>
          {text}
        </RadioText>
      </Container>
    </TouchableOpacity>
  )
}

export default RadioComponent
