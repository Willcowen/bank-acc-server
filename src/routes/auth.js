const { Router } = require('express')
const { Login } = require('../controllers/auth')

const router = Router()

router.post('/login', Login)

export default router