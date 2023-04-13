import React, {memo} from 'react'
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'

import {
  Container,
  ViewArticles,
  Title,
  Text,
  Read,
} from '@/components/ArticlesInterviews/styles'
import {IArticle} from '@/types/entities/Article/ArticleEntity.types'

interface IArticleComponentProps {
  color: string
  article: IArticle
  isAnotherResponsible: boolean
  onPress: Function
  loading: boolean
}

const ArticlesInterviewsComponent: React.FC<IArticleComponentProps> = ({
  article,
  isAnotherResponsible,
  onPress,
  loading,
}) => (
  <TouchableWithoutFeedback onPress={() => onPress()}>
    <Container isAnotherResponsible={isAnotherResponsible}>
      <ViewArticles>
        <Title isAnotherResponsible={isAnotherResponsible}>
          {article?.title}
        </Title>

        <Text isAnotherResponsible={isAnotherResponsible}>
          {article?.shortText}
        </Text>

        <Read>Ler artigo</Read>
        {loading && <ActivityIndicator color="#AD9BE6" size="large" />}
      </ViewArticles>
    </Container>
  </TouchableWithoutFeedback>
)

export default memo(ArticlesInterviewsComponent)
