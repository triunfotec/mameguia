type TTermType = 'subtitle' | 'text' | 'topic' | 'url'

export interface ITerm {
  id: number
  text: string
  type: TTermType
  order: number
}
