import React, {useEffect, useState} from 'react'
import {TouchableNativeFeedback} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'

import {LinearGradient} from 'expo-linear-gradient'
import {useTheme} from 'styled-components'

import LogoSvg from '@/assets/logo.svg'
import ButtonComponent from '@/components/Button'
import {
  Container,
  ScrollView,
  ViewHeader,
  SubTitle,
  ViewFooter,
  ViewCheckbox,
  AgreeText,
  AgreeTextLink,
} from '@/screens/Terms/TermsScreen.styles'
import {
  TStackNavigationProp,
  TStackScreenParam,
} from '@/types/application/Navigation/NavigationApplication.types'
import CheckBox from '@react-native-community/checkbox'
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native'

export interface ITermsScreenParams {
  agree?: boolean
}
const TermsScreen: React.FC = () => {
  const {params} = useRoute<RouteProp<TStackScreenParam, 'Terms'>>()

  const [toggleCheckBox, setToggleCheckBox] = useState(__DEV__)

  const theme = useTheme()

  const navigation = useNavigation<TStackNavigationProp>()

  useEffect(() => {
    if (params?.agree) {
      setToggleCheckBox(true)
    }
  }, [params])

  return (
    <Container>
      <LinearGradient
        colors={['#AD9BE6', '#EB1B63']}
        style={{
          width: '100%',
          height: '100%',
          paddingHorizontal: 5,
          alignItems: 'center',
        }}
        end={{x: 0.5, y: 1}}
        locations={[0.2, 0.9]}>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 0,
          }}>
          <ViewHeader>
            <LogoSvg
              width={RFValue(180)}
              height={RFValue(70)}
              style={{marginBottom: '5%', marginTop: '5%'}}
            />

            <SubTitle>
              Para garantir uma experiência personalizada e podermos salvar seus
              dados e histórico para consultas futuras, de acordo com a Lei
              Geral de Proteção de Dados, precisamos que você concorde com isso:
            </SubTitle>
          </ViewHeader>

          <ViewFooter>
            <ViewCheckbox>
              {!__DEV__ && (
                <CheckBox
                  disabled={false}
                  value={toggleCheckBox}
                  onValueChange={newValue => setToggleCheckBox(newValue)}
                  tintColor={theme.colors.text_light}
                  onCheckColor={theme.colors.text_dark}
                  onTintColor={theme.colors.text_light}
                  boxType="square"
                  onFillColor={theme.colors.text_light}
                  tintColors={{
                    true: theme.colors.text_light,
                    false: theme.colors.text_light,
                  }}
                />
              )}

              <AgreeText>
                Sou maior de 18 e concordo com os{' '}
                <TouchableNativeFeedback
                  onPress={() => navigation.push('PrivacyPolicy')}>
                  <AgreeTextLink>
                    Termos de Uso e a Política de Privacidade{' '}
                  </AgreeTextLink>
                </TouchableNativeFeedback>
                do app e aceito a gravação dos meus dados
              </AgreeText>
            </ViewCheckbox>

            <ButtonComponent
              title="Concordo, continuar"
              backgroundColor={theme.colors.background}
              color="#EB1B63"
              onPress={() => {
                navigation.push('SignUp')
              }}
              disabled={!toggleCheckBox}
            />
          </ViewFooter>
        </ScrollView>
      </LinearGradient>
    </Container>
  )
}

export default TermsScreen
