import {api} from '@/services/api'

interface IResponseVerifyEmailPhone {
  haveRegister: boolean
  message: string
}

export const verifyEmailAndPhoneAreRegistered = async (
  email: string,
  telephone: string,
): Promise<IResponseVerifyEmailPhone> => {
  try {
    const telephoneNotFormat = telephone.replace(/[^0-9]/g, '')

    return await api
      .get(`api/users/findOne?email=${email}&telephone=${telephoneNotFormat}`)
      .then(function (_response) {
        return {
          haveRegister: false,
          message: 'e-mail e telefone ainda não registrado',
        }
      })
      .catch(error => {
        return {
          haveRegister: true,
          message:
            error?.response?.data?.error?.message ||
            'Houve um erro com um de nossos servidores. Tente novamente mais tarde!',
        }
      })
  } catch {
    return {
      haveRegister: true,
      message:
        'Houve um erro com um de nossos servidores. Tente novamente mais tarde!',
    }
  }
}
