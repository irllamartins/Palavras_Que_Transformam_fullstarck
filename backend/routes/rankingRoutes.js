const express = require('express')
const router = express.Router()
const cors = require('cors')
const { loadAnnualRanking } = require('../controllers/rankingControllers')

// middleware
router.use(
   cors({
      credentials: true,
      origin: "https://localhost:5173"
   })
)

router.get("/ranking/last-year", loadAnnualRanking)
router.get("/ranking/last-weekly", loadAnnualRanking)
router.get("/ranking/user", loadAnnualRanking)

module.exports = router
