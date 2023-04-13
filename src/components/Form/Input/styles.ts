import {TextInput} from 'react-native'
import {TextInputMask} from 'react-native-masked-text'
import {RFValue} from 'react-native-responsive-fontsize'

import styled from 'styled-components/native'

export const Container = styled(TextInput)`
  width: 100%;
  padding: 16px 18px;

  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  background-color: ${({theme}) => theme.colors.background};
  color: ${({theme}) => theme.colors.text};

  border-radius: 5px;
  margin-bottom: 8px;
`

export const ContainerMask = styled<any>(TextInputMask)`
  width: 100%;
  padding: 16px 18px;

  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  background-color: ${({theme}) => theme.colors.background};
  color: ${({theme}) => theme.colors.text};

  border-radius: 5px;
  margin-bottom: 8px;
`
