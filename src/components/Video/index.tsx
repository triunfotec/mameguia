import React from 'react'
import {View} from 'react-native'
import {Vimeo} from 'react-native-vimeo-iframe'

interface IVideo {
  videoId: string
  videoParams: string
  closeVideo: Function
}

const VideoVimeoComponent: React.FC<IVideo> = ({
  videoId,
  videoParams,
  closeVideo,
}) => {
  const videoCallbacks = {
    play: (data: any) => console.log('play: ', data),
    pause: (data: any) => {
      console.log('pause: ', data)
      closeVideo()
    },
    ended: (data: any) => closeVideo(),
  }

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#000',
        position: 'absolute',
      }}>
      <Vimeo
        videoId={videoId}
        params={videoParams}
        handlers={videoCallbacks}
        controls={false}
        style={{borderRadius: 10, backgroundColor: '#000', flex: 1}}
      />
    </View>
  )
}

export default VideoVimeoComponent
