
const User = require("../models/user")
const { comparePassword, hashPassword } = require('../helpers/auth')
const jwt = require('jsonwebtoken')

const test = (req, res) => {
    res.json("test is working")
}

// registrar novo usuario
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        // console.log("backend",req.body)
        // verifica existencia de nome
        if (!name) {
            return res.json({
                error: "name is required"
            })
        }
        // verifica existencia de email
        if (!email) {
            return res.json({
                error: "Email is required"
            })
        }
        // verifica existencia de senha
        if (!password || password.length < 3) {
            return res.json({
                error: "Password is required and should be at least 3 characters long"
            })
        }
        //verifica se ja existe um email cadastrado
        const exist = await User.findOne({ email })
        if (exist) {
            return res.json({
                error: "Email is taken already"
            })
        }

        // cria usuario no banco de dados
        const hashedPassword = await hashPassword(password)
        const user = await User.create({
            name, email, password: hashedPassword
        })
        return res.json(user)
    } catch (error) {
        console.log("auth creater: ", error)
    }
}

// fazer o login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        // checar se o usuario existe
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(404).json({
                error: "No user found"
            })
        }

        //checar se as senhas são iguais
        const match = await comparePassword(password, user.password)
        if (match) {
            const token = jwt.sign({ email: user.email, id: user._id, name: user.name }, process.env.JWT_SECRET)
            res.json({ user: user, token: token })
        }
        if (!match) {
            res.json("password not match")
        }

    } catch (error) {
        console.log(error)
    }
}

const validateToken = async (req, res) => {
    try {
        const token = req.body.token
        const validaded = jwt.verify(token, process.env.JWT_SECRET, (err, code) => {
            if (err) { return "" }
            return code.id
        })
        if (validaded) {
            // checar se o usuario existe
            const user = await User.findOne({ _id: validaded }).populate('achievements')
            if (!user) {
                return res.json({
                    error: "No user found"
                })
            }
            res.json({
                id: user._id,
                name: user.name,
                email: user.email,
                goal: user.goal,
                point: user.point,
                achievements: user.achievements,
                type: user.type
            })

        }
    } catch (err) {
        console.log('Token validation failed:', err);
        return ""
    }
}


const findUser = async (req, res) => {
    try {
        const { id } = req.params
        // checar se o usuario existe
        // const user = await User.findOne({ _id:id})
        const user = await User.findById(req.params.userId).populate('achievements')
        if (!user) {
            return res.json({
                error: "No user found"
            })
        }
        res.json(user)
    } catch (error) {
        console.log(error)
    }

}
module.exports = {
    test,
    registerUser,
    loginUser,
    validateToken,
    findUser
}