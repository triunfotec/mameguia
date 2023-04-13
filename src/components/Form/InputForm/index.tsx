import React from 'react'
import {Control, Controller} from 'react-hook-form'
import {TextInputProps} from 'react-native'

import {ISignUpFormData} from '@/screens/SignUp/SignUpScreen'

import {Input, InputMask} from '../Input'
import {Container, Error} from './styles'

interface IProps extends TextInputProps {
  control: Control<any>
  name: string
  error: string | undefined
  mask?: string
}

export function InputForm({control, name, error, mask, ...rest}: IProps) {
  return (
    <Container>
      {error && <Error>{error}</Error>}
      <Controller
        control={control}
        render={({field: {onChange, value}}) => {
          if (mask)
            return (
              <InputMask
                type="cel-phone"
                onChangeText={onChange}
                value={value}
                {...rest}
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) ',
                }}
              />
            )

          return (
            <Input
              type="custom"
              onChangeText={onChange}
              value={value}
              {...rest}
            />
          )
        }}
        name={name}
      />
    </Container>
  )
}
