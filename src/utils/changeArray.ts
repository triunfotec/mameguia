export const groupBy = (array: any[], key: string | number) => {
  return array.reduce((result, currentValue) => {
    ;(result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue,
    )

    return result
  }, {})
}

export const selectItemArrayRandom = (items: any[]) => {
  return items[Math.floor(Math.random() * items.length)]
}
