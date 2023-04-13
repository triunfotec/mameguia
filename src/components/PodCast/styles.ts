import {RFValue} from 'react-native-responsive-fontsize'

import styled from 'styled-components/native'

interface IPodcastProps {
  color?: string
  isAnotherResponsible?: boolean
}

export const Container = styled.View<IPodcastProps>`
  flex: 1;
  height: ${RFValue(72)}px;
  background: ${({color, isAnotherResponsible}) =>
    isAnotherResponsible ? '#535353' : '#f6f6f6'};
  border-radius: ${RFValue(16)}px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: ${RFValue(10)}px 0;
  padding: 0 ${RFValue(10)}px;
`

export const ViewDuration = styled.View`
  width: ${RFValue(56)}px;
  height: ${RFValue(56)}px;
  background: #ffffff;
  border-radius: ${RFValue(8)}px;
  justify-content: center;
  align-items: center;
`
export const TextDuration = styled.Text<IPodcastProps>`
  color: ${({color, isAnotherResponsible}) =>
    isAnotherResponsible ? '#7F7F7F' : color};
  font-weight: bold;
`
export const ViewDescription = styled.View`
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  flex: 1;
  padding: 0 ${RFValue(10)}px;
`
export const Title = styled.Text<IPodcastProps>`
  color: ${({isAnotherResponsible}) =>
    isAnotherResponsible ? '#fff' : '#535353'};
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.extra_bold};
  font-weight: 800;
`
export const Author = styled.Text<IPodcastProps>`
  color: ${({isAnotherResponsible}) =>
    isAnotherResponsible ? '#fff' : '#7f7f7f'};
  font-size: ${RFValue(12)}px;
  font-family: ${({theme}) => theme.fonts.regular};
`
export const ViewPlay = styled.View`
  justify-content: center;
  align-items: center;
`
