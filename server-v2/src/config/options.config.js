import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL
const SECRET_KEY = process.env.SECRET_KEY

export const options = { 
    server:{
        port: PORT,
    },
    mongo:{
        url: MONGO_URL,
    },
    token:{
        secretKey: SECRET_KEY,
    }
}