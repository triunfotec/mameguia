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

export const ViewModal = styled.View`
  width: 100%;
  height: 100%;
`
export const Container = styled.View`
  flex: 1;

  justify-content: center;
  padding: 0 ${RFValue(20)}px;
  border-radius: 10px;
  margin-top: 20px;

  background-color: rgba(0, 0, 0, 0.8);
`
export const ButtonCloseView = styled.View`
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  padding: 10px 0;
`
export const CalendarView = styled.View`
  margin: ${RFValue(20)}px 0;
`

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
