const dotenv=require('dotenv')

dotenv.config()

const {  SECRET_KEY, SECRET_IV, ECNRYPTION_METHOD } = process.env

module.exports= {
  secret_key: SECRET_KEY,
  secret_iv: SECRET_IV,
  ecnryption_method: ECNRYPTION_METHOD,
}