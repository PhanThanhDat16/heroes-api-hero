import { Request, Response } from "express"
import { heroService } from "~/service/hero.service"
import { internalService } from "~/service/internal.service"
import { EHttpStatus } from "~/types/httpStatus"

export const internalController = {
  updateTagMultipleHeroes: async (req: Request, res: Response) => {
    const { tags, heroIds } = req.body

    try {
      const hero = await heroService.findManyHeroById(heroIds)
      if (!hero) {
        res.status(EHttpStatus.NOT_FOUND).json({
          message: 'Hero not found'
        })
        return
      }

      const result = await internalService.updateTagByManyHeroes(heroIds, tags)
      if (!result) {
        res.status(EHttpStatus.BAD_REQUEST).json({ message: 'Tags already exist' })
        return
      }

      res.status(EHttpStatus.OK).json({
        message: 'Tags added successfully',
        result
      })
    } catch (error) {
      res.status(EHttpStatus.INTERNAL_SERVER_ERROR).json({
        message: `Internal server error: ${error}`
      })
    }
  },

  deleteTagMultipleHeroes: async (req: Request, res: Response) => {
    const { tags, heroIds } = req.body

    try {
      const updatedHeroes = await internalService.deleteTagByManyHeroes(heroIds, tags)

      res.status(EHttpStatus.OK).json({
        message: 'Tags removed from heroes successfully',
        updatedHeroes
      })
    } catch (error) {
      res.status(EHttpStatus.INTERNAL_SERVER_ERROR).json({
        message: `Internal server error: ${error}`
      })
    }
  }
}
