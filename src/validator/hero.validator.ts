import { IHero } from '~/types/hero'

export const categoryValidator = (data: IHero) => {
  let error = {}
  if (!data.name || data.name.trim() === '') {
    error = 'name is required'
  }

  if (!data.mail || data.mail.trim() === '') {
    error = 'mail is required'
  }

  if (!data.address || data.address.trim() === '') {
    error = 'address is required'
  }

  return error
}
