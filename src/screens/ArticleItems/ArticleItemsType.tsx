import React from 'react'
import {Linking, TouchableOpacity, StyleSheet} from 'react-native'
import StyledText from 'react-native-styled-text'

import {
  ArticleItemSubtitleTypeText,
  ArticleItemTopicTypeText,
  ArticleItemUrlTypeText,
  ArticleItemTopicTypeContainerView,
  ArticleItemTopicTypeContentView,
  ArticleItemTopicTypeCircleView,
} from '@/screens/ArticleItems/ArticleItemsScreen.styles'

const openUrl = (url: string) => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url)
    }
  })
}

export const articleItemType = {
  load: (text: string) => {
    return {
      subtitle: (
        <ArticleItemSubtitleTypeText>{text}</ArticleItemSubtitleTypeText>
      ),
      text: <StyledText style={styles.paragraph}>{text}</StyledText>,
      topic: (
        <ArticleItemTopicTypeContainerView>
          {text.split(',').map((item, index) => (
            <ArticleItemTopicTypeContentView key={index}>
              <ArticleItemTopicTypeCircleView />
              <ArticleItemTopicTypeText>{item.trim()}</ArticleItemTopicTypeText>
            </ArticleItemTopicTypeContentView>
          ))}
        </ArticleItemTopicTypeContainerView>
      ),
      url: (
        <TouchableOpacity onPress={() => openUrl(text)}>
          <ArticleItemUrlTypeText>{text}</ArticleItemUrlTypeText>
        </TouchableOpacity>
      ),
    }
  },
}

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 16,
    color: '#000',
  },
})
