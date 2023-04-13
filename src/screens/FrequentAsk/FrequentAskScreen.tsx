import React, {useRef} from 'react'
import {TouchableWithoutFeedback} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'
import {useSelector} from 'react-redux'

import {useTheme} from 'styled-components'

import LogoSvg from '@/assets/logo3.svg'
import AccordionComponent from '@/components/Accordion'
import ButtonComponent from '@/components/Button'
import {
  Container,
  ScrollView,
  ContainerScrollView,
  ContentScrollView,
  Content,
  HeaderView,
  GoBackView,
  Title,
  ButtonView,
} from '@/screens/FrequentAsk/FrequentAskScreen.styles'
import {selectFrequentAsks} from '@/store/FrequentAsk/FrequentAskSelectors'
import {TStackNavigationProp} from '@/types/application/Navigation/NavigationApplication.types'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'

const FrequentAskScreen: React.FC = () => {
  const theme = useTheme()

  const navigation = useNavigation<TStackNavigationProp>()
  const frequentAsks = useSelector(selectFrequentAsks)

  return (
    <Container>
      <Content>
        <HeaderView>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.goBack()
            }}>
            <GoBackView>
              <MaterialCommunityIcons
                name="chevron-left"
                size={32}
                color={theme.colors.primary}
              />
            </GoBackView>
          </TouchableWithoutFeedback>
          <LogoSvg width={RFValue(200)} height={RFValue(44)} />

          <TouchableWithoutFeedback onPress={() => {}}>
            <GoBackView>
              <MaterialCommunityIcons
                name="chevron-right"
                size={32}
                color={theme.colors.primary}
                style={{opacity: 0}}
              />
            </GoBackView>
          </TouchableWithoutFeedback>
        </HeaderView>

        <ContainerScrollView>
          <ScrollView>
            <ContentScrollView>
              <Title>Perguntas frequentes</Title>

              <AccordionComponent sections={frequentAsks} />

              <ButtonView>
                <ButtonComponent
                  title="Voltar"
                  backgroundColor={theme.colors.text_light}
                  borderColor={theme.colors.primary}
                  color={theme.colors.primary}
                  onPress={() => navigation.goBack()}
                  height={50}
                />
              </ButtonView>
            </ContentScrollView>
          </ScrollView>
        </ContainerScrollView>
      </Content>
    </Container>
  )
}

export default FrequentAskScreen
