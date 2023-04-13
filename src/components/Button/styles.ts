import {TouchableOpacity} from 'react-native-gesture-handler'
import {RFValue} from 'react-native-responsive-fontsize'

import styled from 'styled-components/native'

interface IContainerProps {
  color?: string
  backgroundColor?: string
  borderColor?: string
  isSocial?: boolean
  height?: number
  width?: number
  disabled?: boolean
}

export const Button = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
})``

export const View = styled.View<IContainerProps>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${props => (props?.width ? props?.width + '%' : '100%')};

  background-color: ${({backgroundColor}) => backgroundColor};
  border: solid 1px ${({borderColor}) => borderColor || 'transparent'};

  ${props =>
    props.isSocial &&
    `
    border: solid 1px rgba(235, 27, 99, 0.3);
    margin-bottom: 20px;
  `}

  ${props =>
    props.disabled &&
    `
    opacity: 0.5
  `}
  border-radius: 29px;
  height: ${props => (props?.height ? RFValue(props?.height) : RFValue(56))}px;
`
export const Text = styled.Text<IContainerProps>`
  text-align: center;
  padding: 0 10px;

  color: ${({color}) => color};

  font-family: ${({theme}) => theme.fonts.extra_bold};
  font-size: ${RFValue(14)}px;
`
