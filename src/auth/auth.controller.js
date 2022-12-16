const {findUserByEmail} = require('../users/users.controllers')
const {comparePassword} = require('../utils/crypto')

const checkUserCredential = async (email, password) => {
    try{
        const user = await findUserByEmail(email) // se recibe el usuarios completo 
        const verifyPassword = comparePassword(password, user.password) /* se recibe la contraseña en texto plano 
        e incriptada(la incriptada se obetiene del user de la db que se genera al crear un usuario) */
        if (verifyPassword){ // comparePassword da como resultado un boolean
            return user // si es true que retorne el usuario
        } else {
            return null // si es false que retorne null
        }
    }catch (error) {
        return null 
    }
}
module.exports = checkUserCredential