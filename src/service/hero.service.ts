import { Hero } from "~/model/hero.model"
import { IHero } from '../types/hero'

export const heroService = {
  create: async (data: IHero) => {
    const existingHero = await Hero.findOne({ mail: data.mail }).lean()
    if (existingHero) return null
    return await Hero.create(data)
  },

  getAllByUserId: async (userId: string) => {
    const heroes = await Hero.find({ userId }).lean()
    return heroes
  },

  getAll: async () => {
    const heroes = await Hero.find().lean()
    return heroes
  },

  getById: async (id: string) => {
    const hero = await Hero.findById(id).lean()
    if (!hero) return null
    return hero
  },

  updateById: async (id: string, data: IHero) => {
    const existingHero = await Hero.findById(id)
    if (existingHero) {
      if (existingHero.mail === data.mail) {
        const hero = await Hero.findByIdAndUpdate(id, data, { new: true })
        return hero
      } else {
        const existingEmailHero = await Hero.findOne({ mail: data.mail }).lean()
        if (existingEmailHero) return null
        const hero = await Hero.findByIdAndUpdate(id, data, { new: true })
        return hero
      }
    }
  },

  delete: async (id: string) => {
    const hero = await Hero.findByIdAndDelete(id)
    if (!hero) return null
    return hero
  },

  findEmail: async (mail: string) => {
    const hero = await Hero.findOne({ mail }).lean()
    if (!hero) return null
    return hero
  },

  deleteMany: async (listHeroes: string[]) => {
    return await Hero.deleteMany({ _id: { $in: listHeroes } })
  },

  findHeroById: async (heroId: string) => {
    const hero = await Hero.findById(heroId)
    if (!hero) {
      return null
    }
    return hero
  },

  findManyHeroById: async (heroIds: string[]) => {
    const heroes = await Hero.find({ _id: { $in: heroIds } })
    if (!heroes) return null
    return heroes
  },

  updateTagByManyHeroes: async (heroIds: string[], tags: string[]) => {
    // console.log(tags)
    const heroes = await Hero.find({ _id: { $in: heroIds } })
    const updatedHeroes = await Promise.all(
      heroes.map(async (hero) => {
        hero.tags = tags
        await hero.save()
        return hero
      })
    )

    return updatedHeroes
  },

  deleteTagByManyHeroes: async (heroIds: string[], tags: string[]) => {
    const heroes = await Hero.find({ _id: { $in: heroIds } })
    const updatedHeroes = await Promise.all(
      heroes.map(async (hero) => {
        const hasAnyTag = tags.some((tag) => hero.tags.includes(tag))
        if (hasAnyTag) {
          hero.tags = hero.tags.filter((tag) => !tags.includes(tag))
          await hero.save()
          return hero
        }
        return null
      })
    )

    return updatedHeroes.filter(Boolean)
  }
}
