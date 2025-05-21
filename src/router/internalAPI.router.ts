import express from 'express'
import { internalController } from '~/controller/internal.controller'
const router = express.Router()


router.put('/heroes/tags', internalController.updateTagMultipleHeroes)
router.delete('/heroes/tags', internalController.deleteTagMultipleHeroes)

export const routerInternal = router