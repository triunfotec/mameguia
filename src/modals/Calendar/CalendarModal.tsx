import React, {useCallback, useMemo, useState} from 'react'
import {Modal, TouchableNativeFeedback} from 'react-native'
import {Calendar, CalendarProps} from 'react-native-calendars'

import {useTheme} from 'styled-components'

import ButtonComponent from '@/components/Button'
import {
  Container,
  CalendarView,
  ButtonCloseView,
  View,
  Text,
} from '@/modals/Calendar/CalendarModal.styles'
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons'
export interface ICalendarModal {
  visible: boolean
  startTime?: string
  handleModalVisible: (visible: boolean) => void
  setDateChanged: (date: string) => void
}
const CalendarModal: React.FC<ICalendarModal> = ({
  visible,
  startTime,
  handleModalVisible,
  setDateChanged,
}) => {
  const theme = useTheme()
  const [dateSelected, setDateSelected] = useState<string>(startTime || '')

  const onDayPress: CalendarProps['onDayPress'] = useCallback(day => {
    setDateSelected(day.dateString)
  }, [])

  const marked = useMemo(() => {
    return {
      [dateSelected]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: theme.colors.blue,
        selectedTextColor: '#fff',
      },
    }
  }, [dateSelected, theme])

  return (
    <Modal visible={visible} transparent={true}>
      <Container>
        <TouchableNativeFeedback
          onPress={() => {
            handleModalVisible(false)
          }}>
          <ButtonCloseView>
            <MaterialCommunityIcons
              name="close"
              size={22}
              color={theme.colors.text_light}
            />
          </ButtonCloseView>
        </TouchableNativeFeedback>
        <CalendarView>
          <Calendar
            current={dateSelected}
            initialDate={dateSelected}
            onDayPress={onDayPress}
            markedDates={marked}
            disabledDaysIndexes={[0, 6]}
            theme={{
              calendarBackground: theme.colors.secondary,
              monthTextColor: theme.colors.text_light,
              dayTextColor: theme.colors.text_light,
              textColor: theme.colors.text_light,
              textSectionTitleDisabledColor: theme.colors.text_light,
              textSectionTitleColor: theme.colors.text_light,
              arrowColor: theme.colors.text_light,
              todayTextColor: theme.colors.text_light,
              todayBackgroundColor: theme.colors.secondary_light,
              textDayFontFamily: theme.fonts.bold,
              textMonthFontFamily: theme.fonts.bold,
              textDayHeaderFontFamily: theme.fonts.bold,
            }}
          />
        </CalendarView>

        <TouchableNativeFeedback
          onPress={() => {
            setDateChanged(dateSelected)
            handleModalVisible(false)
          }}>
          <View
            backgroundColor={theme.colors.blue}
            color={theme.colors.text_light}
            borderColor={theme.colors.blue}
            height={56}>
            <Text color={theme.colors.text_light}>Confirmar</Text>
          </View>
        </TouchableNativeFeedback>
        {/* <ButtonComponent
          title="Confirmar"
          backgroundColor={theme.colors.blue}
          color={theme.colors.text_light}
          borderColor={theme.colors.blue}
          onPress={() => {
            console.log('dateSelected', dateSelected)
            setDateChanged(dateSelected)
            handleModalVisible(false)
          }}
          height={56}
        /> */}
      </Container>
    </Modal>
  )
}

export default CalendarModal
