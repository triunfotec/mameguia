/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-empty-interface */
import 'styled-components'
import theme from './theme'

declare module 'styled-components' {
  type TThemeType = typeof theme

  // eslint-disable-next-line @typescript-eslint/naming-convention

  // export interface DefaultTheme {
  //   title: string

  //   colors: {
  //     primary: string
  //     primary_2: string
  //     secondary: string
  //     tertiary: string

  //     white: string
  //     white_2: string
  //     black: string
  //     gray: string

  //     success: string
  //     info: string
  //     warning: string
  //   }
  // }

  export interface DefaultTheme extends TThemeType {}
}
