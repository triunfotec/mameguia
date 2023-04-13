export type TGenre = 'menino' | 'menina'

export enum EGenre {
  Menino = 'menino',
  Menina = 'menina',
}

export type TTypeFood =
  | 'leite materno exclusivo'
  | 'leite materno + suplementação'
  | 'suplementação'

export enum ETypeFood {
  Maternal = 'leite materno exclusivo',
  MaternalSupplementation = 'leite materno + suplementação',
  Supplementation = 'suplementação',
}

export interface IChild {
  id: number
  wasBorn: boolean
  name: string
  genre: TGenre
  ageMonths: number
  typeFood: TTypeFood
  userId: number
  quantityMillilitersSupplementation?: number
  minutesSupplementation?: number
}
