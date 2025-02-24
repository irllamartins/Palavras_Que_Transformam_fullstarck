
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
        const text = await Text.find({ user_id: user_id }).sort({ update_at: -1 })
        if (!text) {
            return res.json({
                error: "No text found"
            })
        }
        const list = text.map((item) => ({
            id: item._id,
            title: item.title,
            body: item.body,
            created_at: item.created_at,
            update_at: item.update_at,
            achieved_goal: item.achieved_goal,
            number_words: item.number_words,
            user_id: item.user_id
        }));
        return res.json(list)
    } catch (error) {
        console.log(error)
    }
}

// registrar novo texto
const registerText = async (req, res) => {
    try {
        const { user_id } = req.params
        const { title, body } = req.body

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
        if (user.goal <= number_words) {
            validateGoal = true
        }
        // cria texto no banco de dados
        const text = await Text.create({
            title,
            body,
            user_id: user_id,
            achieved_goal: validateGoal,
            created_at: moment().toISOString(),
            update_at: moment().toISOString()
        })
        return res.status(201).json({
            id: text._id,
            title:text.title,
            body:text.body,
            user_id: text.user_id,
            achieved_goal: text.validateGoal,
            created_at: text.created_at,
            update_at: text.update_at
        })
    } catch (error) {
        console.log("textcreater: ", error)
        return res.status(400)
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

        return res.status(200).json({
            id: text._id,
            title: text.title,
            body: text.body,
            created_at: text.created_at,
            update_at: text.update_at,
            achieved_goal: text.goal,
            number_words: text.number_words,
            user_id: text.user_id
        })
    } catch (error) {
        console.log(error)
        return res.status(404)
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

        if (newText.number_words >= user.goal) {
            validateGoal = true
            if (textTest.goal !== newText.goal) {
                user = await User.updateOne({ _id: user_id }, { point: (user.point || 0) + COUNT })
            }
        }

        const date = moment().toISOString()

        const text = await Text.findOneAndUpdate({ _id: id },
            {
                ...newText,
                achieved_goal: validateGoal,
                update_at: date,
             //   id: _id
            },
            { new: true })

        if (!text) {
            return res.status(404).json({
                error: "No text found"
            })
        }
        return res.status(200).json({
            id: text._id,
            title: text.title,
            body: text.body,
            created_at: text.created_at,
            update_at: text.update_at,
            achieved_goal: text.achieved_goal,
            number_words: text.number_words,
            user_id: text.user_id
        })
    } catch (error) {
        console.log(error)
    }
}

// alterar um texto especifico
const removeText = async (req, res) => {
    try {
        const id = req.params.id
        // checar se o usuario existe
        const text = await Text.deleteOne({ _id: id }).sort({ update_at: -1 })
        if (!text) {
            return res.status(404).json({ mensagem: 'Item não encontrado' });
        }
        return res.status(200).json(text)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Erro ao deletar o item' });
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