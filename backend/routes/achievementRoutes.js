const express = require('express')
const router = express.Router()
const cors = require('cors')
const { grant } = require('../controllers/achievementController')

// middleware
router.use(
   cors({
      credentials: true,
      origin: "https://localhost:5173"
   })
)
// caso for necessario manualmente
router.post("/users/:user_id/grant", grant)

module.exports = router
    