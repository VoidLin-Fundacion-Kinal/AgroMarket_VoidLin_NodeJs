import Cart from './cart.model.js'
import Product from '../product/product.model.js'

// Agregar producto al carrito
export const addCart = async (req, res) => {
    try {
        const idC = req.user.uid
        const { productId, quantity } = req.body
        const quantityNum = Number(quantity)

        // Validaciones básicas
        if (isNaN(quantityNum) || quantityNum <= 0) {
            return res.status(400).send({
                success: false,
                message: 'La cantidad debe ser un número positivo'
            })
        }

        // Buscar o crear carrito activo
        let cart = await Cart.findOne({ user: idC, status: 'active' })
        if (!cart) {
            cart = new Cart({ user: idC, items: [] })
        }

        // Verificar producto
        const productData = await Product.findById(productId)
        if (!productData) {
            return res.status(404).send({
                success: false,
                message: 'Producto no encontrado'
            })
        }

        // Validar producto activo
        if (!productData.isActive) {
            return res.status(400).send({
                success: false,
                message: 'Este producto no está disponible actualmente'
            })
        }

        // Validar stock
        const existingItem = cart.items.find(item => item.product.toString() === productId)
        const newQuantity = existingItem ? existingItem.quantity + quantityNum : quantityNum

        if (newQuantity > productData.stock) {
            return res.status(400).send({
                success: false,
                message: 'Stock insuficiente. Por favor contacte al proveedor.'
            })
        }

        // Actualizar carrito
        if (existingItem) {
            existingItem.quantity = newQuantity
        } else {
            cart.items.push({
                product: productId,
                quantity: quantityNum
            })
        }

        // Calcular total
        cart.total = cart.items.reduce((total, item) => {
            return total + (productData.price * item.quantity)
        }, 0)

        await cart.save()

        return res.status(200).send({
            success: true,
            message: 'Producto agregado al carrito',
            cart
        })

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            success: false,
            message: 'Error interno del servidor'
        })
    }
}

// Obtener carrito por ID de usuario
export const listCartUserById = async (req, res) => {
    try {
        const idC = req.user.uid
        const cart = await Cart.findOne({ user: idC, status: 'active' }).populate('items.product')

        if (!cart) {
            return res.status(404).send({
                success: false,
                message: 'No se encontró un carrito activo'
            })
        }

        return res.status(200).send({
            success: true,
            message: 'Carrito encontrado',
            cart
        })

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            success: false,
            message: 'Error interno del servidor'
        })
    }
}

// Listar todos los carritos (admin)
export const listCart = async (req, res) => {
    try {
        const { limit = 20, skip = 0 } = req.query
        const carts = await Cart.find()
            .limit(Number(limit))
            .skip(Number(skip))
            .populate('user', 'name email')
            .populate('items.product')

        if (!carts || carts.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'No se encontraron carritos'
            })
        }

        return res.status(200).send({
            success: true,
            message: 'Carritos encontrados',
            carts
        })

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            success: false,
            message: 'Error interno del servidor'
        })
    }
}

// Listar carrito por ID
export const listCartById = async (req, res) => {
    try {
        const { cartId } = req.params
        const cart = await Cart.findById(cartId)
            .populate('user', 'name email')
            .populate('items.product')

        if (!cart) {
            return res.status(404).send({
                success: false,
                message: 'Carrito no encontrado'
            })
        }

        return res.status(200).send({
            success: true,
            message: 'Carrito encontrado',
            cart
        })

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            success: false,
            message: 'Error interno del servidor'
        })
    }
}

// Actualizar producto en el carrito
export const updateCartItem = async (req, res) => {
    try {
        const idC = req.user.uid
        const { productId, quantity } = req.body
        const quantityNum = Number(quantity)

        if (isNaN(quantityNum) || quantityNum <= 0) {
            return res.status(400).send({
                success: false,
                message: 'La cantidad debe ser un número positivo'
            })
        }

        const cart = await Cart.findOne({ user: idC, status: 'active' })
            .populate('items.product', 'price stock isActive')

        if (!cart) {
            return res.status(404).send({
                success: false,
                message: 'Carrito no encontrado'
            })
        }

        const item = cart.items.find(item => 
            item.product && item.product._id.toString() === productId
        )

        if (!item) {
            return res.status(404).send({
                success: false,
                message: 'Producto no encontrado en el carrito'
            })
        }

        // Validar producto activo
        if (!item.product.isActive) {
            return res.status(400).send({
                success: false,
                message: 'Este producto ya no está disponible'
            })
        }

        // Validar stock
        if (quantityNum > item.product.stock) {
            return res.status(400).send({
                success: false,
                message: 'Stock insuficiente. Por favor contacte al proveedor.'
            })
        }

        // Actualizar cantidad y total
        const price = item.product.price
        cart.total -= price * item.quantity
        item.quantity = quantityNum
        cart.total += price * quantityNum

        await cart.save()

        return res.status(200).send({
            success: true,
            message: 'Carrito actualizado',
            cart
        })

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            success: false,
            message: 'Error interno del servidor'
        })
    }
}

// Eliminar producto del carrito
export const deleteProductCart = async (req, res) => {
    try {
        const idC = req.user.uid
        const { productId } = req.body

        const cart = await Cart.findOne({ user: idC, status: 'active' })
            .populate('items.product', 'price')

        if (!cart) {
            return res.status(404).send({
                success: false,
                message: 'Carrito no encontrado'
            })
        }

        // Encontrar y eliminar el producto
        const itemIndex = cart.items.findIndex(
            item => item.product && item.product._id.toString() === productId
        )

        if (itemIndex === -1) {
            return res.status(404).send({
                success: false,
                message: 'Producto no encontrado en el carrito'
            })
        }

        // Actualizar total
        const removedItem = cart.items[itemIndex]
        cart.total -= removedItem.product.price * removedItem.quantity

        // Eliminar item
        cart.items.splice(itemIndex, 1)

        await cart.save()

        return res.status(200).send({
            success: true,
            message: 'Producto eliminado del carrito',
            cart
        })

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            success: false,
            message: 'Error interno del servidor'
        })
    }
}

// Vaciar carrito
export const clearCart = async (req, res) => {
    try {
        const idC = req.user.uid
        const cart = await Cart.findOne({ user: idC, status: 'active' })

        if (!cart) {
            return res.status(404).send({
                success: false,
                message: 'Carrito no encontrado'
            })
        }

        cart.items = []
        cart.total = 0

        await cart.save()

        return res.status(200).send({
            success: true,
            message: 'Carrito vaciado',
            cart
        })

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            success: false,
            message: 'Error interno del servidor'
        })
    }
}


export const softDeleteCart = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the cart and verify it exists
        const cart = await Cart.findById(id);
        
        if (!cart) {
            return res.status(404).send({
                success: false,
                message: 'Cart not found'
            });
        }

        // Check if it's already soft-deleted
        if (cart.status === 'cancelled') {
            return res.status(400).send({
                success: false,
                message: 'Cart was already deleted previously'
            });
        }

        if (cart.status === 'abandoned') {
            return res.status(400).send({
                success: false,
                message: 'Cart was already deleted previously'
            });
        }

        
        // Perform the soft delete by changing status
        cart.status = 'cancelled';

        await cart.save();

        return res.status(200).send({
            success: true,
            message: 'Cart soft deleted successfully',
            cart
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Internal server error',
            error: error.message // Only send error message (security best practice)
        });
    }
}

export const softDeleteCartA = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the cart and verify it exists
        const cart = await Cart.findById(id);
        
        if (!cart) {
            return res.status(404).send({
                success: false,
                message: 'Cart not found'
            });
        }

        // Check if it's already soft-deleted
        if (cart.status === 'cancelled') {
            return res.status(400).send({
                success: false,
                message: 'Cart was already deleted previously'
            });
        }
        if (cart.status === 'abandoned') {
            return res.status(400).send({
                success: false,
                message: 'Cart was already deleted previously'
            });
        }

        // Perform the soft delete by changing status
        cart.status = 'abandoned';

        await cart.save();

        return res.status(200).send({
            success: true,
            message: 'Cart soft deleted successfully',
            cart
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Internal server error',
            error: error.message // Only send error message (security best practice)
        });
    }
}