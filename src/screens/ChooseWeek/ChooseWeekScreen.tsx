import React, {useCallback, useState, useEffect} from 'react'
import {View, ImageBackground} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'
import SmoothPicker from 'react-native-smooth-picker'

import {useTheme} from 'styled-components'

import BackgroundPregnant from '@/assets/backgroundHome/background_gestante.png'
import IconDiaryWhite from '@/assets/diary/icon_diary_white.svg'
import LogoSvg1 from '@/assets/logos/Logo-1.svg'
import ButtonComponent from '@/components/Button'
import {
  Container,
  HeaderSimpleView,
  TitleView,
  Title,
  BoxView,
  BoxText,
  PickerNumberView,
  PickerNumberWrapperVerticalView,
  PickerNumberOptionWrapperView,
  PickerNumber,
} from '@/screens/ChooseWeek/ChooseWeekScreen.styles'
import {weekNumber} from '@/screens/Week/weekScreen.data'
import {weekInitialDateUserRequestStatus} from '@/store/Week/WeekCreators'
import {EActionTypeStatus} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {TStackNavigationProp} from '@/types/application/Navigation/NavigationApplication.types'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'

interface IItem {
  opacity: any
  selected: any
  vertical: any
  fontSize: any
  name: any
}

interface IItemToRender {
  item: any
  index: any
}

const Item: any = React.memo(({opacity, selected, fontSize, name}: IItem) => {
  return (
    <PickerNumberOptionWrapperView opacity={opacity} selected={selected}>
      <PickerNumber fontSize={fontSize}>{name}</PickerNumber>
    </PickerNumberOptionWrapperView>
  )
})

const ChooseWeekScreen: React.FC = () => {
  const theme = useTheme()
  const navigation = useNavigation<TStackNavigationProp>()

  const [selected, setSelected] = useState(0)

  const handleChange = useCallback((index: number) => {
    setSelected(index)
  }, [])

  const ItemToRender: any = useCallback(
    ({item, index}: IItemToRender, indexSelected: any) => {
      const selected = index === indexSelected
      const gap = Math.abs(index - indexSelected)

      const opacities: any = {
        0: 1,
        1: 1,
        2: 0.6,
        3: 0.3,
        4: 0.1,
      }

      const sizeText: any = {
        0: 28,
        1: 23,
        2: 18,
      }

      let opacity = opacities[gap]
      if (gap > 3) {
        opacity = opacities[4]
      }
      let fontSize = sizeText[gap]
      if (gap > 1) {
        fontSize = sizeText[2]
      }

      return (
        <Item
          opacity={opacity}
          selected={selected}
          fontSize={fontSize}
          name={item}
        />
      )
    },
    [],
  )

  useEffect(() => {
    weekInitialDateUserRequestStatus({
      status: EActionTypeStatus.Waiting,
      message: '',
    })
  }, [])

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        resizeMode="cover"
        source={BackgroundPregnant}
        style={{
          justifyContent: 'flex-start',
          flex: 1,
        }}>
        <Container>
          <HeaderSimpleView>
            <LogoSvg1 width={RFValue(200)} height={RFValue(44)} />
          </HeaderSimpleView>

          <TitleView>
            <IconDiaryWhite />

            <Title>Semana a semana</Title>
          </TitleView>

          <BoxView backgroundColor={theme.colors.secondary_light}>
            <BoxText color={theme.colors.primary}>
              Aproximadamente, quantas semanas tem a sua gravidez?
            </BoxText>
          </BoxView>

          <PickerNumberView>
            <PickerNumberWrapperVerticalView>
              <SmoothPicker
                initialScrollToIndex={selected}
                onScrollToIndexFailed={() => {}}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                data={weekNumber}
                scrollAnimation
                onSelected={({index}) => handleChange(index)}
                renderItem={option => ItemToRender(option, selected)}
                magnet
                selectOnPress
              />
            </PickerNumberWrapperVerticalView>
          </PickerNumberView>

          <View style={{width: '100%', marginBottom: 16}}>
            <ButtonComponent
              title="Próximo"
              backgroundColor={theme.colors.text_light}
              color={theme.colors.primary}
              onPress={() => {
                navigation.navigate('ChooseWeekInitialDate', {
                  weekNumber: selected + 1,
                })
              }}
              loading={false}
            />
          </View>
        </Container>
      </ImageBackground>
    </View>
  )
}

export default ChooseWeekScreen
