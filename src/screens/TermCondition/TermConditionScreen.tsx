import React, {useEffect} from 'react'
import {TouchableWithoutFeedback, View} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'
import {useDispatch, useSelector} from 'react-redux'

import {useTheme} from 'styled-components'

import LogoSvg from '@/assets/logo3.svg'
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
} from '@/screens/TermCondition/TermConditionScreen.styles'
import {termGet} from '@/store/Term/TermCreators'
import {selectTermPrivacy} from '@/store/Term/TermSelectors'
import {TStackNavigationProp} from '@/types/application/Navigation/NavigationApplication.types'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'

import {articleItemType} from '../ArticleItems/ArticleItemsType'

const TermConditionScreen: React.FC = () => {
  const theme = useTheme()
  const dispatch = useDispatch()

  const navigation = useNavigation<TStackNavigationProp>()
  const terms = useSelector(selectTermPrivacy)

  useEffect(() => {
    if (terms.length === 0) {
      dispatch(termGet())
    }
  }, [dispatch, terms.length])

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
              <Title>Termos de Uso do Aplicativo Mameguia</Title>

              {terms.map(item => (
                <View key={item.id} style={{marginVertical: 5}}>
                  {articleItemType['load'](item.text)[item.type]}
                </View>
              ))}

              <ButtonView>
                <ButtonComponent
                  title="Voltar para o perfil"
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

export default TermConditionScreen
