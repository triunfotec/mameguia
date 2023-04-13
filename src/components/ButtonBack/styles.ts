import {TouchableOpacity} from 'react-native-gesture-handler'
import {RFValue} from 'react-native-responsive-fontsize'

import styled from 'styled-components/native'

interface IContainerProps {
  color?: string
  backgroundColor?: string
}

export const ViewButton = styled.View`
  width: ${RFValue(40)}px;
  height: ${RFValue(40)}px;
  border: solid 1px rgba(235, 27, 99, 0.3);
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`

export const Button = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
})`
  width: ${RFValue(44)}px;
  height: ${RFValue(44)}px;
  justify-content: center;
  align-items: center;
`
