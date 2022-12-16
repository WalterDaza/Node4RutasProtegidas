const JwtStrategy = require('passport-jwt').Strategy 
// passport tiene diferentes estrategias para manejar logins(JWT, facebook, google). esa linea selecciona el JWT
const ExtractJwt = require('passport-jwt').ExtractJwt // extrae el token del header de la petición
const passport = require('passport') // se importa la libreria para modificar su configuración y proteger la ruta
const jwtSecret = require('../../config').api.jwtSecret // importación de la palabra secreta JWT_SECRET
const {findUserById} = require('../users/users.controllers') // se importa el controlador que busca todos los usuarios por id

    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'), // revisa los header y si inicia con jwt, extrae el token
        secretOrKey: jwtSecret // asignación de palabra secreta
    }
    passport.use( // configuraciones internas del middleware
        new JwtStrategy(options, async(tokenDecoded, done) => { // se le asignan las options ya definidas
            // tokenDecoded = el token decodificado por passport
            // done = indica la finalización de la función; recibe 2 parametros (error, tokenDecoded)
            try{
                const user = await findUserById(tokenDecoded.id) // busca el user que tenga el id del tokenDecoded
                if(!user){ // si el user no existe
                    return done(null, false) // no existe un error pero tampoco existe el user
                } else { // si existe el user
                    return done (null, tokenDecoded)  // no existe un error pero si existe el user
                }
            } catch (error) {
                return done(error, false) // si existe un erro, pero no un user
            } 
        })
    )


module.exports = passport