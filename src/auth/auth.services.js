const checkUserCredential = require ('./auth.controller') // controlador
const jwt = require('jsonwebtoken') // jsonwebtoken (creación de token)
const jwtSecret = require('../../config').api.jwtSecret // importación de palabra secreta

const postLogin = (req, res) => {
    const {email, password} = req.body // se obtienen los valores que necesita el checkUserCredential
    if (email && password) { // solo si recibe los dos parametros
        checkUserCredential(email, password)// ejecutamos con los dos parametros
            .then((data) => { //si se reciben los dos parametros la función del controller puede retornar user o null
                if(data){ // si se recibe el usuario
                    const token = jwt.sign({ // de la librería jsonwebtoken obtenemos un token para guardar nuestra información 
                        id: data.id,
                        email: data.email,
                        role: data.role
                    }, jwtSecret) // se le asigna la palabra secreta, para dar seguridad al token
                    res.status(200).json({
                        message: 'Correct Credentials', 
                        token: token
                    })
                } else { // si se recibe el null
                    res.status(401).json({message: 'Invalid Credentials'})
                }
            })
            .catch((err) => {
                res.status(400).json({message: err.message})
            })
    } else {
        res.status(400).json({message: 'Missing data', fields:{
            email: 'example@example.com',
            password: 'string'
        }})
    }
}
module.exports = {
    postLogin
} 