export const hoursMinutesSecondsBetweenTwoDates = (
  endDate: string,
  startDate: string,
) => {
  if (endDate && startDate) {
    let diffInMilliSeconds =
      Math.abs(new Date(endDate).getTime() - new Date(startDate).getTime()) /
      1000

    const days = Math.floor(diffInMilliSeconds / 86400)
    diffInMilliSeconds -= days * 86400

    const hours = Math.floor(diffInMilliSeconds / 3600) % 24
    diffInMilliSeconds -= hours * 3600

    const minutes = Math.floor(diffInMilliSeconds / 60) % 60
    diffInMilliSeconds -= minutes * 60

    const seconds = Math.floor(diffInMilliSeconds)

    const duration = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

    return duration
  }
  return '00:00:00'
}

export const periodHoursMinutesBetweenTwoDates = (
  endDate: string,
  startDate: string,
) => {
  const options: any = {
    hour: 'numeric',
    minute: 'numeric',
    dayPeriod: 'short',
    // timeZone: 'UTC',
  }

  const hourMinutesInitial = new Intl.DateTimeFormat('pt-BR', options)
    .format(new Date(startDate))
    .padStart(5, '0')

  const hourMinutesEnd = new Intl.DateTimeFormat('pt-BR', options)
    .format(new Date(endDate))
    .padStart(5, '0')

  return `das ${hourMinutesInitial} às ${hourMinutesEnd} `
}

export const getHoursMinutes = (date: string) => {
  const options: any = {
    hour: 'numeric',
    minute: 'numeric',
    dayPeriod: 'short',
    //timeZone: 'UTC',
  }
  return new Intl.DateTimeFormat('pt-BR', options)
    .format(new Date(date))
    .padStart(5, '0')
}

export const getDateFormatISO = (date: string) => {
  const dateTimeZoneLocal = new Date(date)

  const year = dateTimeZoneLocal.getFullYear()
  const month = (dateTimeZoneLocal.getMonth() + 1).toString().padStart(2, '0')
  const day = dateTimeZoneLocal.getDate().toString().padStart(2, '0')

  return `${year}-${month}-${day}`
}
