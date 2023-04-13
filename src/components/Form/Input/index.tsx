import React from 'react'
import {TextInputMaskProps} from 'react-native-masked-text'

import {Container, ContainerMask} from './styles'

type TProps = TextInputMaskProps

export function Input({...rest}: TProps) {
  return <Container placeholderTextColor="#7F7F7F" {...rest} />
}

export function InputMask({...rest}: TProps) {
  return <ContainerMask placeholderTextColor="#7F7F7F" {...rest} />
}
