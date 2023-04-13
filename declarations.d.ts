/* eslint-disable @typescript-eslint/naming-convention */
declare module '*.svg' {
  import React from 'react'
  import { SvgProps } from 'react-native-svg'
  const content: React.FC<SvgProps>
  export default content
}

declare module '*.png' {
  const content: any
  export default content
}

declare module '*.jpg' {
  const content: any
  export default content
}

declare module 'react-native-config' {
  export type TBuildTypeConfig = 'debug' | 'staging' | 'release'

  export interface NativeConfig {
    API_BASE_URL: string
    BUILD_TYPE?: TBuildTypeConfig
    DEBUG?: boolean
    APPLICATION_ID?: string
    VERSION_CODE?: number
    VERSION_NAME?: string
    DEV_MODE: boolean
  }

  export const Config: NativeConfig
  export default Config
}
