import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT
const MONGODB = process.env.MONGODB

export const options = {
    server: {
        port: PORT 
    },
    db:{
        url: MONGODB
    }
}