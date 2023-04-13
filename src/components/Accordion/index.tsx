import React, {useState, memo, useCallback} from 'react'
import {View} from 'react-native'
import Accordion from 'react-native-collapsible/Accordion'

import {useTheme} from 'styled-components'

import {
  AccordionView,
  TitleAccordion,
  TextAccordion,
} from '@/components/Accordion/styles'
import {MaterialCommunityIcons} from '@expo/vector-icons'

interface ISection {
  question: string
  answer: string
}
interface IAccordionComponentProps {
  sections: ISection[]
}
const AccordionComponent: React.FC<IAccordionComponentProps> = ({sections}) => {
  const theme = useTheme()

  const [activeSection, setActiveSection] = useState([0])
  const handleChangeSection = useCallback((section: number[]) => {
    setActiveSection(section)
  }, [])

  const _renderHeader = useCallback(
    (content, _index, isActive, _sections) => {
      return (
        <AccordionView>
          <TitleAccordion>{content.question}</TitleAccordion>
          <View
            style={{
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              minWidth: 44,
              height: 44,
            }}>
            <MaterialCommunityIcons
              name={isActive ? 'chevron-up' : 'chevron-down'}
              size={32}
              color={theme.colors.blue}
            />
          </View>
        </AccordionView>
      )
    },
    [theme.colors.blue],
  )

  const _renderContent = useCallback((content: ISection) => {
    return <TextAccordion>{content.answer}</TextAccordion>
  }, [])

  return (
    <Accordion
      sections={sections}
      underlayColor="#fff"
      activeSections={activeSection}
      renderHeader={_renderHeader}
      renderContent={_renderContent}
      duration={400}
      onChange={handleChangeSection}
    />
  )
}

export default memo(AccordionComponent)
