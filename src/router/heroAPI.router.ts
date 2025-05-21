import express from 'express'
import { heroController } from '~/controller/hero.controller'
import { requireAuth } from '~/middleware/auth.middleware'
const router = express.Router()

router.get('/heroes', requireAuth, heroController.getHeroes)
router.get('/users/:id/heroes', requireAuth, heroController.getHeroesByUserId)
router.get('/heroes/:id', requireAuth, heroController.getHeroesDetail)
router.post('/heroes', requireAuth, heroController.createHeroes)
router.put('/heroes/:id', requireAuth, heroController.updateHeroes)
router.delete('/heroes/:id', requireAuth, heroController.deleteHeroes)
router.delete('/users/:id/heroes', requireAuth, heroController.deleteHeroesMany)

// 
// router.put('/users/:userId/heroes/tags', heroController.updateTagMultipleHeroes)
// router.delete('/users/:id/heroes/tags', heroController.deleteTagMultipleHeroes)

export const routerHero = router
