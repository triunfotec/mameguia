export type TParagraphType = 'text' | 'subtitle' | 'image'

export interface IWeek {
  id: number
  weekNumber: number
  paragraph: string
  type: TParagraphType
  order: number
  imageUrl: string
}
