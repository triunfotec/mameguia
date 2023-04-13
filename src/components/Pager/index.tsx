import React, {useState, useCallback, useRef} from 'react'
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native'
import Carousel from 'react-native-snap-carousel'

import {IVideo} from '@/types/entities/Video/VideoEntity.types'
import {FontAwesome} from '@expo/vector-icons'

interface ICustomCarouselProps {
  teste?: string
  isAnotherResponsible?: boolean
  color: string
  buttonPlay: Function
  videos: IVideo[]
}
interface IRenderItemProps {
  item: IVideo
  index: number
}

const PagerComponent: React.FC<ICustomCarouselProps> = ({
  isAnotherResponsible,
  color,
  buttonPlay,
  videos,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const ref = useRef(null)
  console.log('videos', videos)
  const background = isAnotherResponsible ? '#3B3B3B' : '#fff'

  const renderItem = useCallback(
    ({item, index}: IRenderItemProps) => {
      console.log('item', item)
      return (
        <View
          key={index}
          style={{
            backgroundColor: background,
            borderRadius: 20,
            height: 150,
            padding: 0,
            marginLeft: 5,
            marginRight: 5,
          }}>
          <ImageBackground
            source={{uri: item.coverImagem}}
            resizeMode="cover"
            style={{flex: 1}}
            imageStyle={{borderRadius: 10}}>
            <View
              style={{marginBottom: 10, justifyContent: 'flex-end', flex: 1}}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#fff',
                  marginLeft: 10,
                  marginBottom: 10,
                }}>
                {item.title}
              </Text>

              <TouchableOpacity onPress={() => buttonPlay(item.videoId)}>
                <View
                  style={{
                    backgroundColor: color,
                    width: '40%',
                    height: 32,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 10,
                    paddingHorizontal: 8,
                    borderRadius: 8,
                    marginBottom: 10,
                  }}>
                  <FontAwesome name="play" size={16} color="#fff" />

                  <Text
                    style={{
                      fontFamily: 'AccordAlternateBold',
                      fontSize: 14,
                      color: '#fff',
                      width: '100%',
                      marginLeft: 8,
                    }}>
                    {item.duration}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      )
    },
    [background, buttonPlay, color],
  )

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: background, paddingTop: 0}}>
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
        <Carousel
          layout={'default'}
          ref={ref}
          data={videos}
          sliderWidth={220}
          itemWidth={220}
          renderItem={renderItem}
          onSnapToItem={(index: number) => setActiveIndex(index)}
        />
      </View>
    </SafeAreaView>
  )
}

export default PagerComponent
