const express = require('express')
const router = express.Router()
const cors = require('cors')
const { test, registerUser, loginUser, validateToken,findUser} = require('../controllers/authControllers')

// middleware
router.use(
   cors({
      credentials: true,
      origin: "https://localhost:5173"
   })
)

router.get("/", test)
router.get("/users/:id",findUser)
router.post("/validate", validateToken)
router.post("/users", registerUser)
router.post("/signin", loginUser)

module.exports = router
