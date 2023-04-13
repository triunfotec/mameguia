import {AccessToken, LoginManager} from 'react-native-fbsdk-next'

interface IUserFacebook {
  email: string
  username: string
}
export interface IResponseLoginFacebook {
  success: boolean
  text?: string
  userFacebook: IUserFacebook
}

const getFacebookData = async (token: string) => {
  const fetchResult = await fetch(
    'https://graph.facebook.com/v13.0/me?fields=email,name,friends&access_token=' +
      token,
  )
  return await fetchResult.json()
}

export const loginFacebook = async (): Promise<IResponseLoginFacebook> => {
  const userFacebook = {email: '', username: ''}

  const response: IResponseLoginFacebook =
    await LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      async function (result) {
        if (result.isCancelled) {
          return {
            success: false,
            text: 'Acesso pelo Facebook foi cancelado.',
            userFacebook,
          }
        }

        const tokenData = await AccessToken.getCurrentAccessToken()
        if (!tokenData?.accessToken) {
          return {
            success: false,
            text: 'Houve um erro ao logar com o Facebook.',
            userFacebook,
          }
        }

        const userInfo = await getFacebookData(tokenData.accessToken)
        return {
          success: true,
          userFacebook: {
            email: userInfo.email,
            username: userInfo.name,
          },
        }
      },
      function (error) {
        return {
          success: false,
          text: `Houve um erro ao acessar o Facebook: ${error?.message}`,
          userFacebook,
        }
      },
    )
  return response
}
