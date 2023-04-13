export const maskHourMinutes = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1:$2')
    .replace(/(\d{2})(\d)/, '$1')
}
export const maskCPF = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
}

export const maskPhone = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})(\d+?)$/, '$1')
}

export const maskOnlyNumbers = (value: string) => {
  return value.replace(/\D/g, '')
}

export const maskDate = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1')
}

export const maskOnlyLetters = (value: string) => {
  return value.replace(/[0-9!@#¨$%^&*)(+=._-]+/g, '')
}

export const maskCEP = (value: string) => {
  return value.replace(/\D/g, '').replace(/^(\d{5})(\d{3})+?$/, '$1-$2')
}
