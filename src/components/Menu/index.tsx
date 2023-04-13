import React, {memo} from 'react'
import {ImageBackground, TouchableOpacity, View} from 'react-native'

import {useTheme} from 'styled-components'

import backgroundGestante from '@/assets/menu/superior/gestante.png'
import backgroundLactante from '@/assets/menu/superior/lactante.png'
import backgroundOther from '@/assets/menu/superior/parceiro.png'
import backgroundTentante from '@/assets/menu/superior/tentante.png'
import {
  ContainerView,
  ContentView,
  MenuText,
  ButtonsView,
  MenuBoxView,
} from '@/components/Menu/styles'
import {TSituation} from '@/types/entities/User/UserEntity.types'

interface IMenuComponentProps {
  situation: TSituation
  callback: (situation: TSituation) => void
  closeMenu: () => void
}

const MenuComponent: React.FC<IMenuComponentProps> = ({
  situation,
  callback,
  closeMenu,
}) => {
  const theme = useTheme()

  return (
    <ContainerView>
      <ContentView>
        <ButtonsView>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => callback('getPregnant')}>
            <ImageBackground
              source={backgroundTentante}
              resizeMode="cover"
              style={{}}
              imageStyle={{
                borderRadius: 20,
                borderColor: theme.colors.blue,
                borderWidth: situation === 'getPregnant' ? 2 : 0,
              }}>
              <MenuBoxView>
                <MenuText color={theme.colors.text_dark}>
                  {' '}
                  Estou tentando engravidar
                </MenuText>
              </MenuBoxView>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => callback('pregnant')}>
            <ImageBackground
              source={backgroundGestante}
              resizeMode="cover"
              style={{marginTop: 10}}
              imageStyle={{
                borderRadius: 20,
                borderColor: theme.colors.blue,
                borderWidth: situation === 'pregnant' ? 2 : 0,
              }}>
              <MenuBoxView>
                <MenuText> Já estou grávida</MenuText>
              </MenuBoxView>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => callback('breastfeeding')}>
            <ImageBackground
              source={backgroundLactante}
              resizeMode="cover"
              style={{marginTop: 10}}
              imageStyle={{
                borderRadius: 20,
                borderColor: theme.colors.blue,
                borderWidth: situation === 'breastfeeding' ? 2 : 0,
              }}>
              <MenuBoxView>
                <MenuText> Estou amamentando</MenuText>
              </MenuBoxView>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => callback('anotherResponsible')}>
            <ImageBackground
              source={backgroundOther}
              resizeMode="cover"
              style={{marginTop: 10}}
              imageStyle={{
                borderRadius: 20,
                borderColor: theme.colors.blue,
                borderWidth: situation === 'anotherResponsible' ? 2 : 0,
              }}>
              <MenuBoxView>
                <MenuText color={theme.colors.text_dark}>
                  {' '}
                  Sou o(a) outro(a) parceiro
                </MenuText>
              </MenuBoxView>
            </ImageBackground>
          </TouchableOpacity>
        </ButtonsView>

        <TouchableOpacity activeOpacity={0.9} onPress={() => closeMenu()}>
          <View
            style={{
              width: '100%',
              height: '100%',
            }}></View>
        </TouchableOpacity>
      </ContentView>
    </ContainerView>
  )
}

export default memo(MenuComponent)
