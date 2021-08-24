import express from 'express'
import listEndpoints from 'express-list-endpoints'
import cors from 'cors'
import mongoose from 'mongoose'
import { badRequestMiddleware, catchAllErrorsMiddleware, forbiddenHandler, notFoundMiddleware, unAuthenticatedHandler} from './errorMiddlewares.js'


const port = process.env.PORT || 3001

const server = express()

// ===================== MIDDLEWARES =============================
server.use(cors())
server.use(express.json())

// ===================== ROUTES  =================================

// ===================== ERROR HANDLERS ==========================
server.use(notFoundMiddleware)
server.use(unAuthenticatedHandler)
server.use(forbiddenHandler)
server.use(badRequestMiddleware)
server.use(catchAllErrorsMiddleware)
// ===============================================================

console.table(listEndpoints(server))

mongoose.connect(process.env.MONGO_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then(() => {
    server.listen(port, () => {
        console.log(" ✅  Server is running on port: " + port)
    })
    server.on('error', (error) => {
        console.log(" 🚫 Server crashed due to: ", error)
    })
})
.catch(err => console.log(err))
