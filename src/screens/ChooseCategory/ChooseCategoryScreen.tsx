import React, {useCallback, useState} from 'react'
import {View} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'

import {useTheme} from 'styled-components'

import LogoSvg from '@/assets/logo3.svg'
import ButtonComponent from '@/components/Button'
import {useAuth} from '@/hooks/auth'
import {
  Container,
  ScrollView,
  Header,
  Description,
  ViewBoxOr,
  OrText2,
  Error,
} from '@/screens/ChooseCategory/ChooseCategoryScreen.styles'
import {api} from '@/services/api'
import {ESituation, IUser} from '@/types/entities/User/UserEntity.types'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ChooseCategoryScreen: React.FC = () => {
  const theme = useTheme()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const {loadStoredUser} = useAuth()

  const handleAddSituationUser = useCallback(
    async (situation: string) => {
      const userStorageKey = '@mameguia:user'
      const storedUser = await AsyncStorage.getItem(userStorageKey)

      if (storedUser) {
        const userLogged = JSON.parse(storedUser) as IUser

        setLoading(true)
        try {
          const response = await api.put(`api/users/${userLogged.id}`, {
            situation,
          })

          const userUpdate = response?.data

          await AsyncStorage.setItem(
            '@mameguia:user',
            JSON.stringify({...userUpdate, situation}),
          )

          setLoading(false)
          setError('Situação cadastrada!')
          loadStoredUser()
        } catch (error) {
          setError('Houve um erro ao tentar se logar. Tente novamente.')

          setLoading(false)
        }
      }
    },
    [loadStoredUser],
  )

  return (
    <Container>
      <ScrollView>
        <View style={{flexDirection: 'column', width: '100%'}}>
          <Header>
            <LogoSvg width={RFValue(200)} height={RFValue(68)} />
          </Header>

          <Description>
            Olá. É muito bom estarmos juntos na jornada da maternidade. Para que
            a sua experiência no Mameguia seja completa, precisamos saber um
            pouquinho mais sobre você.
          </Description>

          <ViewBoxOr>
            <OrText2>Em qual dessas fases você se encaixa atualmente?</OrText2>
          </ViewBoxOr>

          <ButtonComponent
            title="Estou planejando engravidar"
            backgroundColor={theme.colors.text_light}
            borderColor={theme.colors.secondary}
            color={theme.colors.primary}
            onPress={() => handleAddSituationUser(ESituation.getPregnant)}
            disabled={false}
            height={40}
            isSocial={true}
          />

          <ButtonComponent
            title="Já estou grávida"
            backgroundColor={theme.colors.text_light}
            borderColor={theme.colors.secondary}
            color={theme.colors.primary}
            onPress={() => handleAddSituationUser(ESituation.pregnant)}
            disabled={false}
            height={40}
            isSocial={true}
          />

          <ButtonComponent
            title="Estou amamentando"
            backgroundColor={theme.colors.text_light}
            borderColor={theme.colors.secondary}
            color={theme.colors.primary}
            onPress={() => handleAddSituationUser(ESituation.breastfeeding)}
            disabled={false}
            height={40}
            isSocial={true}
          />

          <ButtonComponent
            title="Sou o(a) outro(a) responsável"
            backgroundColor={theme.colors.text_light}
            borderColor={theme.colors.secondary}
            color={theme.colors.primary}
            onPress={() =>
              handleAddSituationUser(ESituation.anotherResponsible)
            }
            disabled={false}
            height={40}
            isSocial={true}
          />

          {!!error && <Error>{error}</Error>}

          {loading && <Error>Cadastrando...</Error>}
        </View>
      </ScrollView>
    </Container>
  )
}

export default ChooseCategoryScreen
