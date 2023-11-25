const express = require('express')
const router = express.Router()
const cors = require('cors')
const { viewTexts, registerText, findText, updateText, removeText } = require('../controllers/textsControllers')

// middleware
router.use(
   cors({
      credentials: true,
      origin: "https://localhost:5173"
   })
)

router.get("/users/:user_id/texts", viewTexts)
router.get("/texts/:id", findText)
router.post("/users/:user_id/texts", registerText)
router.put("/users/:user_id/texts/:id", updateText)
router.delete("/texts/:id", removeText)

module.exports = router
    