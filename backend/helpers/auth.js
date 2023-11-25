const bcrypt = require('bcrypt')

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        // criptografa em hash de 12 
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                reject(err)
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err)
                }
                resolve(hash)
            })
        })
    })
}

// comparar senhas para efetuar login
const comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed)
}

module.exports = {
    hashPassword,
    comparePassword
}