import React from 'react'
import {Image} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'

import {LinearGradient} from 'expo-linear-gradient'
import {useTheme} from 'styled-components'

import LogoSvg from '@/assets/logo.svg'
import ButtonComponent from '@/components/Button'
import {
  Container,
  Header,
  Footer,
  Text,
  Description,
  ViewButton,
  ViewText,
} from '@/screens/Introduction/IntroductionScreen.styles'
import {TStackNavigationProp} from '@/types/application/Navigation/NavigationApplication.types'
import {useNavigation} from '@react-navigation/native'

const IntroductionScreen: React.FC = () => {
  const theme = useTheme()
  const navigation = useNavigation<TStackNavigationProp>()

  return (
    <Container>
      <Header>
        <Image
          style={{
            resizeMode: 'contain',
            height: '100%',
            width: '100%',
          }}
          source={require('@/assets/mame_01.png')}
        />
      </Header>

      <Footer>
        <LinearGradient
          colors={['#AD9BE6', '#EB1B63']}
          style={{
            // height: '64%',
            borderRadius: 24,
            paddingHorizontal: 20,
            paddingVertical: 20,
            paddingBottom: 45,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          end={{x: 0.5, y: 1}}
          locations={[0.2, 0.9]}>
          <LogoSvg width={RFValue(180)} height={RFValue(70)} />

          <ViewText>
            <Text isBold>A sua incrível jornada</Text>
            <Description>
              O Mameguia é o app que acompanha você desde a ideia de engravidar
              até o desmame!
            </Description>
          </ViewText>

          <ViewButton>
            <ButtonComponent
              title="Iniciar minha jornada"
              backgroundColor="#fff"
              color={theme.colors.secondary}
              onPress={() => {
                navigation.reset({
                  routes: [{name: 'Terms'}],
                })
              }}
              height={56}
            />
          </ViewButton>
        </LinearGradient>
      </Footer>
    </Container>
  )
}

export default IntroductionScreen
