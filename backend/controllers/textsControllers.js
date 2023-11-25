
const moment = require("moment/moment")
const Text = require("../models/text")
const User = require("../models/user")

const COUNT = 10
const test = (req, res) => {
    res.json("texts is working")
}

// vizualizar todos textos
const viewTexts = async (req, res) => {
    try {
        const { user_id } = req.params

        // checar se o usuario existe
        const text = await Text.find({ user_id: user_id })
        if (!text) {
            return res.json({
                error: "No text found"
            })
        }
        return res.json(text)
    } catch (error) {
        console.log(error)
    }
}

// registrar novo texto
const registerText = async (req, res) => {
    try {
        const { user_id } = req.params
        const { title, body, goal } = req.body

        let validateGoal = false
        // verifica existencia de titulo
        if (!title) {
            return res.json({
                error: "tiltle is required"
            })
        }

        // verifica existencia de texto
        if (!body) {
            return res.json({
                error: "Body is required"
            })
        }
        const user = await User.findOne({ _id: user_id })
        if (user.goal <= goal) {
            validateGoal = true
        }
        // cria texto no banco de dados
        const text = await Text.create({
            title,
            body,
            user_id: user_id,
            goal: validateGoal,
            created_at: moment().toISOString(),
            update_at: moment().toISOString()
        })
        return res.json(text)
    } catch (error) {
        console.log("textcreater: ", error)
    }
}

// vizualizar um texto especifico
const findText = async (req, res) => {
    try {
        const id = req.params.id
        // checar se o o text existe
        const text = await Text.findOne({ _id: id })
        if (!text) {
            return res.json({
                error: "No text found"
            })
        }
        return res.json(text)
    } catch (error) {
        console.log(error)
    }
}

// alterar um texto especifico
const updateText = async (req, res) => {
    try {
        const newText = req.body
        const { user_id, id } = req.params
        let validateGoal = false

        let user = await User.findOne({ _id: user_id })
        const textTest = await Text.findOne({ _id: id })

        if ( newText.number_words >= user.goal ) {
            validateGoal = true
            if (textTest.goal !== newText.goal) {
                user = await User.updateOne({ _id: user_id  }, { point: (user.point||0)+ COUNT })
            }
        }

        const date = moment().toISOString()

        const text = await Text.findOneAndUpdate({ _id: id },
            { ...newText, goal: validateGoal, update_at: date })

        if (!text) {
            return res.json({
                error: "No text found"
            })
        }
        return res.json(text)
    } catch (error) {
        console.log(error)
    }
}

// alterar um texto especifico
const removeText = async (req, res) => {
    try {
        const id = req.params.id
        // checar se o usuario existe
        const text = await Text.deleteOne({ _id: id })
        if (!text) {
            return res.json({
                error: "No text found"
            })
        }
        return res.json(text)
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    test,
    viewTexts,
    registerText,
    findText,
    updateText,
    removeText
}