'use strict'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import {limiter} from '../middlewares/rate.limit.js'
import authRoutes from '../src/auth/auth.routes.js'
import commnetRoutes from '../src/comment/comment.routes.js'
import postRoutes from '../src/post/post.routes.js'



const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended:false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
    app.use(limiter)
}

const routes = (app) => {
    app.use('/v1/auth', authRoutes)
    app.use('/v1/post',postRoutes)
    app.use('/v1/comment', commnetRoutes)
}

export const initServer = () => {
    const app = express()
    try{
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Servidor ejecutándose en el puerto ${process.env.PORT}`) 

    }catch (error){
        
        console.error('Error en el Servidor', error)
    }
}