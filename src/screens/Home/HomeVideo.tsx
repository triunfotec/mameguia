import React, {useState} from 'react'

import ButtonComponent from '@/components/Button'
import PagerComponent from '@/components/Pager'
import VideoVimeoComponent from '@/components/Video/index'
import {
  ContainerView,
  TitleText,
  SubTitleText,
  ButtonView,
} from '@/screens/Home/HomeVideo.styles'
import {IVideo} from '@/types/entities/Video/VideoEntity.types'

interface IHomeVideo {
  homeDataStyle: any
  theme: any
  isAnotherResponsible: boolean
  navigation: any
  videos: IVideo[]
}
interface IVideoVimeoState {
  visible: boolean
  videoId: string
}

const HomeVideoScreen: React.FC<IHomeVideo> = ({
  homeDataStyle,
  theme,
  isAnotherResponsible,
  navigation,
  videos,
}) => {
  const [showVideoVimeo, setShowVideoVimeo] = useState<IVideoVimeoState>({
    visible: false,
    videoId: '',
  })
  return (
    <>
      <ContainerView backgroundColor={homeDataStyle.videoBackgroundColor}>
        <TitleText color={homeDataStyle.videoTitleColor}>Videos</TitleText>
        <SubTitleText color={homeDataStyle.videoSubTitleColor}>
          Lorem ipsum
        </SubTitleText>
        <PagerComponent
          isAnotherResponsible={isAnotherResponsible}
          color={homeDataStyle.videoTitleColor}
          videos={videos}
          buttonPlay={(videoId: string) =>
            setShowVideoVimeo({
              visible: true,
              videoId,
            })
          }
        />

        <ButtonView>
          <ButtonComponent
            title="Ver todos os videos"
            backgroundColor={
              isAnotherResponsible
                ? theme.colors.dark_grey
                : theme.colors.text_light
            }
            color={homeDataStyle.buttonDefaultColor}
            borderColor={theme.colors.secondary_light}
            onPress={() => navigation.navigate('Videos')}
            height={56}
          />
        </ButtonView>
      </ContainerView>

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
export default HomeVideoScreen
