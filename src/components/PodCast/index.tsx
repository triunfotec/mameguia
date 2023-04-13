import React, {useCallback, useEffect, useState} from 'react'
// import TrackPlayer, {
//   Capability,
//   Event,
//   RepeatMode,
//   State,
//   usePlaybackState,
//   useProgress,
//   useTrackPlayerEvents,
// } from 'react-native-track-player'

import {
  Container,
  ViewDuration,
  TextDuration,
  ViewDescription,
  Title,
  Author,
  ViewPlay,
} from '@/components/Podcast/styles'
import theme from '@/global/styles/theme'
import {IPodcast} from '@/types/entities/Podcast/PodcastEntity.types'
import {FontAwesome} from '@expo/vector-icons'
import Slider from '@react-native-community/slider'

interface IPodCastComponentProps {
  color: string
  podcast: IPodcast
  isAnotherResponsible: boolean
}

const setupIfNecessary = async () => {
  // if app was relaunched and music was already playing, we don't setup again.
  // const currentTrack = await TrackPlayer.getCurrentTrack()
  // if (currentTrack !== null) {
  //   return
  // }
  // await TrackPlayer.setupPlayer({})
  // await TrackPlayer.updateOptions({
  //   stopWithApp: false,
  //   capabilities: [
  //     Capability.Play,
  //     Capability.Pause,
  //     Capability.SkipToNext,
  //     Capability.SkipToPrevious,
  //     Capability.Stop,
  //   ],
  //   compactCapabilities: [Capability.Play, Capability.Pause],
  // })
  //TrackPlayer.setRepeatMode(RepeatMode.Queue)
}

const PodCastComponent: React.FC<IPodCastComponentProps> = ({
  color,
  podcast,
  isAnotherResponsible,
}) => {
  //const playbackState = usePlaybackState()

  // useEffect(() => {
  //   const addTrackPlayer = async (url: string) => {
  //     await TrackPlayer.add({
  //       url,
  //       title: 'Pure (Demo)',
  //       artist: 'David Chavez',
  //       artwork:
  //         'https://i.scdn.co/image/e5c7b168be89098eb686e02152aaee9d3a24e5b6',
  //       duration: 28,
  //     })
  //   }
  //   setupIfNecessary()
  //   addTrackPlayer(
  //     'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
  //   )
  // }, [podcast])

  // const togglePlayback = useCallback(async playbackState => {
  //   const currentTrack = await TrackPlayer.getCurrentTrack()
  //   if (currentTrack == null) {
  //     // TODO: Perhaps present an error or restart the playlist?
  //   } else {
  //     if (playbackState !== State.Playing) {
  //       await TrackPlayer.play()
  //     } else {
  //       await TrackPlayer.pause()
  //     }
  //   }
  // }, [])

  return (
    <Container isAnotherResponsible={isAnotherResponsible}>
      <ViewDuration>
        <TextDuration color={color} isAnotherResponsible={isAnotherResponsible}>
          {podcast?.duration}
        </TextDuration>
      </ViewDuration>

      <ViewDescription>
        <Title isAnotherResponsible={isAnotherResponsible}>
          {podcast?.title}
        </Title>
        <Author isAnotherResponsible={isAnotherResponsible}>
          {podcast?.author}
        </Author>
      </ViewDescription>

      <ViewPlay>
        <FontAwesome
          name="play-circle"
          size={44}
          color={isAnotherResponsible ? '#7F7F7F' : color}
          onPress={() => {}} //togglePlayback(playbackState)}
        />
      </ViewPlay>
    </Container>
  )
}

export default PodCastComponent
