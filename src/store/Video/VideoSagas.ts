import {call, put, takeLatest} from 'redux-saga/effects'

import {baseURLMain} from '@/services/api'
import {ServiceConfig} from '@/services/ServiceConfig'
import {THttpResponse} from '@/services/ServiceConfig.types'
import VideoService from '@/services/Video/VideoService'
import {IData, IResponse} from '@/store/Store.types'
import {
  videoRequest,
  videoRequestStatus,
  videoSet,
} from '@/store/Video/VideoCreators'
import {EVideoActionTypes} from '@/store/Video/VideoCreators.types'
import {EActionTypeStatus} from '@/types/application/ActionStatus/ActionStatusApplication.types'
import {ISagaDependenciesApplication} from '@/types/application/SagaDependencies/SagaDependenciesApplication.types'
import {IVideo} from '@/types/entities/Video/VideoEntity.types'

export function* VideoRequestSaga(
  dependencies: ISagaDependenciesApplication,
  action: ReturnType<typeof videoRequest>,
) {
  try {
    const {situation} = action.payload

    if (!situation) return
    const {getVideos} = new VideoService(dependencies.httpClient)

    const queryString = `populate[image][fields][0]=url&filters[situation][$eq]=${situation}&sort[0]=createdAt%3Adesc`

    const res: THttpResponse = yield call(getVideos, queryString)

    const {data}: IResponse = res.data || {data: [] as IData[]}

    const articlesResponse: IVideo[] = data?.map(item => ({
      id: item.id,
      ...item.attributes,
      imageUrl: baseURLMain + item.attributes.image.data.attributes.url,
    }))

    yield put(videoSet(articlesResponse))
  } catch {
    yield put(
      videoRequestStatus({
        status: EActionTypeStatus.Error,
        message: 'Houve um erro ao buscar os videos. Tente novamente',
      }),
    )
  }
}

export default function* () {
  yield takeLatest(EVideoActionTypes.VIDEO_REQUEST, VideoRequestSaga, {
    httpClient: new ServiceConfig(),
  })
}
