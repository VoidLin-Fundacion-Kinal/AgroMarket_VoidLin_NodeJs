'use strict'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import {limiter} from '../middlewares/rate.limit.js'
import authRoutes from '../src/auth/auth.routes.js'
import userRoutes from '../src/user/user.routes.js'
import providerRoutes from '../src/provider/provider.routes.js'
import categoryRouter from './../src/category/category.routes.js'
import postRouter from './../src/post/post.routes.js'
import commentRoutes from './../src/comment/comment.routes.js'
import productRoutes from './../src/product/product.routes.js'
import inventoryMoventRoutes from '../src/inventoryMovement/inventoryMovement.routes.js'
import cartRoutes from '../src/cart/cart.routes.js'
import billRoutes from './../src/bill/bill.routes.js'
import path from 'path'
import { fileURLToPath } from 'url'

const configs = (app) => {
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cors({
        origin: 'http://localhost:3000/', // la URL de tu frontend
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    }));

    app.use(helmet({
        crossOriginResourcePolicy: { policy: "cross-origin" }
    }))

    app.use(morgan('dev'))

    const filename = fileURLToPath(import.meta.url)
    const dirname = path.dirname(filename)
    app.use('/images', express.static(path.join(dirname, '../images')))
}

const routes = (app) => {
    app.use('/v1/auth', authRoutes)
    app.use('/v1/user', userRoutes)
    app.use('/v1/provider', providerRoutes)
    app.use('/v1/category',categoryRouter)
    app.use('/v1/post', postRouter)
    app.use('/v1/comment', commentRoutes)
    app.use('/v1/product', productRoutes)
    app.use('/v1/inventory', inventoryMoventRoutes)
    app.use('/v1/cart', cartRoutes)
    app.use('/v1/bill', billRoutes)
    

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
