import React, {useState, useEffect} from 'react'
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground,
} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'

import * as Analytics from 'expo-firebase-analytics'
import {useTheme} from 'styled-components'

import LogoSvg from '@/assets/logo3.svg'
import VideoVimeoComponent from '@/components/Video/index'
import {videosMock} from '@/mocks/videos'
import {
  Container,
  ScrollView,
  ContainerScrollView,
  ContentScrollView,
  Content,
  IconView,
  HeaderView,
  GoBackView,
  Title,
  VideoContainer,
  VideoContent,
  PlayDescription,
  MinutesText,
  VideoDescriptionView,
  VideoDescriptionText,
  ButtonPlayView,
} from '@/screens/Videos/VideosScreen.styles'
import {TStackNavigationProp} from '@/types/application/Navigation/NavigationApplication.types'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {FontAwesome} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'

export interface IVideosScreenParams {
  screen?: string
}

interface IVideoVimeoState {
  visible: boolean
  videoId: string
}
const VideosScreen: React.FC = () => {
  const theme = useTheme()
  const [showVideoVimeo, setShowVideoVimeo] = useState<IVideoVimeoState>({
    visible: false,
    videoId: '',
  })

  const navigation = useNavigation<TStackNavigationProp>()

  useEffect(() => {
    if (videosMock?.length > 0) {
      Analytics.logEvent('screen_view', {
        screen_name: `Tela Todos videos ${videosMock[0].situation}`,
      })
    }
  }, [])

  return (
    <>
      <Container>
        <Content>
          <HeaderView>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('Home')
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
                <IconView />
                <Title>Todos os Vídeos</Title>

                {videosMock?.map(video => (
                  <VideoContainer key={video.id}>
                    <ImageBackground
                      source={{uri: video.coverImagem}}
                      resizeMode="cover"
                      style={{flex: 1}}
                      imageStyle={{borderRadius: 10}}>
                      <VideoContent>
                        <PlayDescription>
                          <FontAwesome name="play" size={16} color="#fff" />

                          <MinutesText>{video.duration}</MinutesText>
                        </PlayDescription>

                        <TouchableOpacity
                          onPress={() =>
                            setShowVideoVimeo({
                              visible: true,
                              videoId: video.videoId,
                            })
                          }>
                          <VideoDescriptionView>
                            <VideoDescriptionText>
                              {video.title}
                            </VideoDescriptionText>

                            <ButtonPlayView>
                              <FontAwesome name="play" size={16} color="#fff" />
                            </ButtonPlayView>
                          </VideoDescriptionView>
                        </TouchableOpacity>
                      </VideoContent>
                    </ImageBackground>
                  </VideoContainer>
                ))}
              </ContentScrollView>
            </ScrollView>
          </ContainerScrollView>
        </Content>
      </Container>

      {showVideoVimeo.visible && (
        <VideoVimeoComponent
          videoId={showVideoVimeo.videoId}
          videoParams={'autoplay=true&title=false'}
          closeVideo={() =>
            setShowVideoVimeo({
              visible: false,
              videoId: '',
            })
          }
        />
      )}
    </>
  )
}

export default VideosScreen
