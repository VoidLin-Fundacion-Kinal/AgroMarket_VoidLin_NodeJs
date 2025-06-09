import Cart from './cart.model.js'
import Product from '../product/product.model.js'


//Agregar Carrito
export const addCart = async (req, res) => {
    try {
        const idC = req.user.uid
        const {
            productId,
            quantity
        } = req.body

        const quantityNaN = Number(quantity)



        let cart = await Cart.findOne(
            {
                user: idC,
                status: 'active'
            }
        )

        if (!cart) {
            cart = new Cart(
                {
                    user: idC,
                    items: []
                }
            )
        }

        const productData = await Product.findById(productId)
        if (!productData) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Product not found'
                }
            )
        }

        const existItemCart = cart.items.find(item => item.product.toString() === productId)

        if (existItemCart) {
            existItemCart.quantity += quantityNaN

        } else {
            cart.items.push(
                {
                    product: productId,
                    quantity
                }
            )
        }


        cart.total += productData.price * quantityNaN

        await cart.save()

        return res.status(200).send(
            {
                success: true,
                message: 'Product added to cart',
                cart
            }
        )

    } catch (error) {
        console.error(error) 
        return res.status(500).send(
            {
                success: false,
                message: 'Internal error'
            }
        )
    }
}

//Carrito by Id User => (token)
export const listCartUserById = async (req, res) => {
    try {
        const idC = req.user.uid

        let cart = await Cart.findOne({ user: idC })

        if (!cart || cart.length == 0) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Cart not found.'
                }
            )
        }

        return res.status(200).send(
            {
                success: true,
                message: 'Cart found:',
                cart
            }
        )

    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'Internal Error'
            }
        )

    }
}

//Listar todos los carritos existentes
export const listCart = async (req, res) => {
    try {

        const { limit = 20, skip = 0 } = req.query
        let cart = await Cart
            .find()
            .limit(limit)
            .skip(skip)


        if (!cart || cart.length == 0) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Cart not found.'
                }
            )
        }

        return res.status(200).send(
            {
                success: true,
                message: 'Cart found:',
                cart
            }
        )

    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'Internal Error'
            }
        )

    }
}


//Listar carritos por ID carrito
export const listCartById = async (req, res) => {
    try {

        const { limit = 20, skip = 0 } = req.query
        const {
            cartId
        } = req.params

        let cart = await Cart
            .findById(cartId)
            .limit(limit)
            .skip(skip)


        if (!cart || cart.length == 0) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Cart not found.'
                }
            )
        }

        return res.status(200).send(
            {
                success: true,
                message: 'Cart found:',
                cart
            }
        )

    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'Internal Error'
            }
        )
    }
}

export const updateCartItem = async (req, res) => {
    try {
        const idC = req.user.uid

        const {
            productId,
            quantity
        } = req.body

        const quantityNaN = Number(quantity)

        if (isNaN(quantityNaN) || quantityNaN <= 0) {
            return res.status(400).send({
                success: false,
                message: 'Quantity must be a positive number'
            })
        }

        const cart = await Cart.findOne({ user: idC, status: 'active' }).populate('items.product', 'price') 

        if (!cart) return res.status(404).send(
            {
                success: false,
                message: 'Cart not found, add a product'
            }
        )

        

        const item = cart.items.find(item =>
            item.product && item.product._id.toString() === productId
        )
        if (!item) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Product not in cart:'
                }
            )
        }

        item.quantity = quantityNaN

        cart.total = cart.items.reduce((sum, i) => {
            if (i.product) {
                return sum + (i.product.price * i.quantity) 
            }
            return sum 
        }, 0) 


        await cart.save()

        return res.status(200).send(
            {
                success: true,
                message: 'Product cart updated',
                cart
            }
        )
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'Internal Error'
            }
        )
    }
}


//Eliminar un producto del carrito
export const deleteProductCart = async (req, res) => {
  try {
    const idC = req.user.uid 
    const { productId } = req.body 

    const cart = await Cart.findOne({
      user: idC,
      status: 'active'
    }).populate('items.product', 'price')  

    if (!cart) {
      return res.status(404).send({
        success: false,
        message: 'Cart not found, add a product'
      }) 
    }

    const productData = await Product.findById(productId) 
    if (!productData) {
      return res.status(404).send({
        success: false,
        message: 'Product not found'
      }) 
    }

    cart.items = cart.items.filter(
      item => item.product && item.product._id.toString() !== productId
    ) 

    cart.total = cart.items.reduce((sum, item) => {
      return item.product ? sum + (item.product.price * item.quantity) : sum 
    }, 0) 

    await cart.save() 

    return res.status(200).send({
      success: true,
      message: 'Product removed.',
      cart
    }) 
    
  } catch (error) {
    console.error(error) 
    return res.status(500).send({
      success: false,
      message: 'Internal Error'
    }) 
  }
} 


//Vaciar un carrito completo
export const clearCart = async (req, res) => {
    try {
        const idC = req.user.uid 

        const cart = await Cart.findOne(
            {
                user: idC,
                status: 'active'
            }
        ) 

        if (!cart) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Cart not found'
                }
            ) 
        }

        cart.items = [] 
        cart.total = 0
        await cart.save() 

        return res.status(200).send(
            {
                success: true,
                message: 'Cart cleared',
                cart
            }
        ) 

    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'Internal Error'
            }
        )

    }
}
