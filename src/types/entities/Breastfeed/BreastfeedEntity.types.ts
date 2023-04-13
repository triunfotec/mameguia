export interface IBreastfeed {
  id: number
  childId: number
  childName: string
  leftBreast: boolean
  rightBreast: boolean
  startTime: string
  endTime: string
  withPainBreast: boolean
  groupDate?: string
  dateFormatISO?: string
}
