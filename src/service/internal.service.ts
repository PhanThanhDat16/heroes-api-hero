import { Hero } from '~/model/hero.model'
import { ITag } from '~/types/tag'

export const internalService = {
  updateTagByManyHeroes: async (heroIds: string[], tags: ITag[]) => {
    const heroes = await Hero.find({ _id: { $in: heroIds } })
    const updatedHeroes = await Promise.all(
      heroes.map(async (hero) => {
        hero.set('tags', tags)
        await hero.save()
        return hero
      })
    )
    return updatedHeroes
  },

  deleteTagByManyHeroes: async (heroIds: string[], tags: ITag[]) => {
    const heroes = await Hero.find({ _id: { $in: heroIds } })
    const updatedHeroes = await Promise.all(
      heroes.map(async (hero) => {
        const tagIds = tags.map((tag) => tag._id?.toString())
        const heroTagIds = hero.tags.map((tag: any) => tag.id?.toString() || tag._id?.toString())
        const hasAnyTag = heroTagIds.some((id: string) => tagIds.includes(id))

        if (hasAnyTag) {
          const filteredTags = hero.tags.filter((tag: any) => {
            const tagId = tag.id?.toString() || tag._id?.toString()
            return !tagIds.includes(tagId)
          })
          hero.set('tags', filteredTags)
          await hero.save()
          return hero
        }
        return null
      })
    )
    return updatedHeroes.filter(Boolean)
  }
}
