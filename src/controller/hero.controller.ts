import { Request, Response } from 'express'
import { heroService } from '~/service/hero.service'

import { categoryValidator } from '~/validator/hero.validator'
import { EHttpStatus } from '~/types/httpStatus'

import axios from 'axios'
const URL_USER = 'http://localhost:3001/internal'

export const heroController = {
  createHeroes: async (req: Request, res: Response) => {
    const data = req.body
    try {
      const validator = categoryValidator(data)
      if (Object.keys(validator).length > 0) {
        res.status(EHttpStatus.BAD_REQUEST).json({
          message: `Validator error ${validator}`
        })
        return
      }

      const hero = await heroService.create(data)
      if (!hero) {
        res.status(EHttpStatus.BAD_REQUEST).json({
          message: 'Email already exists'
        })
        return
      }

      res.status(EHttpStatus.OK).json({
        message: 'create successfully',
        data: hero
      })
    } catch (error) {
      res.status(EHttpStatus.INTERNAL_SERVER_ERROR).json({
        message: `Internal server error: ${error}`
      })
    }
  },

  getHeroesDetail: async (req: Request, res: Response) => {
    const heroId = req.params.id
    try {
      const hero = await heroService.getById(heroId)
      if (!hero) {
        res.status(EHttpStatus.NOT_FOUND).json({
          message: 'Hero not exists'
        })
        return
      }

      if (hero.tags.length > 0) {
        try {
          const response = await axios.post(`${URL_USER}/tags`, { tags: hero.tags })
          hero.tags = response.data.data
        } catch (error) {
          res.status(EHttpStatus.INTERNAL_SERVER_ERROR).json({
            message: `Internal server error: ${error}`
          })
          return
        }
      }

      res.status(EHttpStatus.OK).json({
        message: 'successfully',
        data: hero
      })
    } catch (error) {
      res.status(EHttpStatus.INTERNAL_SERVER_ERROR).json({
        message: `Internal server error: ${error}`
      })
    }
  },

  getHeroesByUserId: async (req: Request, res: Response) => {
    const userId = req.params.id
    try {
      const heroes = await heroService.getAllByUserId(userId)

      for (const hero of heroes) {
        if (hero.tags && hero.tags.length > 0) {
          try {
            const response = await axios.post(`${URL_USER}/tags`, { tags: hero.tags })
            hero.tags = response.data.data
          } catch (error) {
            res.status(EHttpStatus.INTERNAL_SERVER_ERROR).json({
              message: `Internal server error: ${error}`
            })
            return
          }
        }
      }

      res.status(EHttpStatus.OK).json({
        message: 'successfully',
        data: heroes
      })
    } catch (error) {
      res.status(EHttpStatus.INTERNAL_SERVER_ERROR).json({
        message: `Internal server error: ${error}`
      })
    }
  },

  getHeroes: async (req: Request, res: Response) => {
    try {
      const heroes = await heroService.getAll()

      for (const hero of heroes) {
        if (hero.tags && hero.tags.length > 0) {
          try {
            const response = await axios.post(`${URL_USER}/tags`, { tags: hero.tags })
            hero.tags = response.data.data
          } catch (error) {
            res.status(EHttpStatus.INTERNAL_SERVER_ERROR).json({
              message: `Internal server error: ${error}`
            })
            return
          }
        }
      }

      res.status(EHttpStatus.OK).json({
        message: 'successfully',
        data: heroes
      })
    } catch (error) {
      res.status(EHttpStatus.INTERNAL_SERVER_ERROR).json({
        message: `Internal server error: ${error}`
      })
    }
  },

  updateHeroes: async (req: Request, res: Response) => {
    const heroId = req.params.id
    const data = req.body
    try {
      const validator = categoryValidator(data)
      if (Object.keys(validator).length > 0) {
        res.status(EHttpStatus.BAD_REQUEST).json({
          message: `Validator error ${validator}`
        })
        return
      }

      const hero = await heroService.updateById(heroId, data)
      if (!hero) {
        res.status(EHttpStatus.BAD_REQUEST).json({
          message: 'Email already exists'
        })
        return
      }

      res.status(EHttpStatus.OK).json({ message: 'updated successfully', data: hero })
    } catch (error) {
      res.status(EHttpStatus.INTERNAL_SERVER_ERROR).json({
        message: `Internal server error: ${error}`
      })
    }
  },

  deleteHeroes: async (req: Request, res: Response) => {
    const heroId = req.params.id
    try {
      const hero = heroService.delete(heroId)
      if (!hero) {
        res.status(EHttpStatus.NOT_FOUND).json({
          message: 'Hero not exists'
        })
        return
      }

      res.status(EHttpStatus.OK).json({ message: 'deleted successfully' })
    } catch (error) {
      res.status(EHttpStatus.INTERNAL_SERVER_ERROR).json({
        message: `Internal server error: ${error}`
      })
    }
  },

  deleteHeroesMany: async (req: Request, res: Response) => {
    const data = req.body
    try {
      if (data.length === 0) {
        res.status(EHttpStatus.BAD_REQUEST).json({ message: 'Invalid or empty ids array' })
        return
      }

      const result = await heroService.deleteMany(data)
      res.status(EHttpStatus.OK).json({ message: 'Deleted successfully' })
    } catch (error) {
      res.status(EHttpStatus.INTERNAL_SERVER_ERROR).json({
        message: `Internal server error: ${error}`
      })
    }
  }
}
