type TPolicyType = 'subtitle' | 'text' | 'topic' | 'url'

export interface IPolicy {
  id: number
  text: string
  type: TPolicyType
  order: number
}
