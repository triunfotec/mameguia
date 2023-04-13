export type TSituation =
  | 'getPregnant'
  | 'pregnant'
  | 'breastfeeding'
  | 'anotherResponsible'

export type TProvider = 'padrão' | 'google' | 'apple' | 'facebook'

export type TSituations =
  | 'Tentante'
  | 'Gestante'
  | 'Lactante'
  | 'Parceiro(a)'
  | undefined

export enum ESituation {
  getPregnant = 'Tentante',
  pregnant = 'Gestante',
  breastfeeding = 'Lactante',
  anotherResponsible = 'Parceiro(a)',
}

export const SituationType: {
  [situation: string]: TSituation
} = Object.freeze({
  'planejando engravidar': 'getPregnant',
  grávida: 'pregnant',
  amamentando: 'breastfeeding',
  'outro responsável': 'anotherResponsible',
  Tentante: 'getPregnant',
  Gestante: 'pregnant',
  Lactante: 'breastfeeding',
  'Parceiro(a)': 'anotherResponsible',
})

export enum ESituationP {
  'planejando engravidar' = 'getPregnant',
  'grávida' = 'pregnant',
  'amamentando' = 'breastfeeding',
  'outro responsável' = 'anotherResponsible',
}

export enum EProvider {
  Default = 'padrão',
  Google = 'google',
  Apple = 'apple',
  Facebook = 'facebook',
}

export interface IUser {
  id: number
  username?: string
  email: string
  password?: string
  situation?: TSituations
  providerAccess?: TProvider
  confirmed?: boolean
  blocked?: boolean
  telephone?: string
  createdAt?: string
  updatedAt?: string
  credential?: string
}
