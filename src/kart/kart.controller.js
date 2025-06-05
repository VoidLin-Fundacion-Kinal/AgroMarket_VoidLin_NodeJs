'use strict'
import Cart from './kart.model.js'
import Product from '../product/'

export const addCart = async(req,res,next)=>{
    try {
        let {user}= req
        let cartexist = await Cart.findOne({user: user.id})
        if(cartexist) return next()

        let cart = new Cart()
        cart.user = user.id
        await cart.save()
        return res.status(200).send(
            {
                success: true,
                message: 'Cart craeted successfully'
            }
        )
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error', err: error
            }
        )
    }
}
