import Cart from '../cart/cart.model.js'
import Bill from './bill.model.js'
import Product from './../product/product.model.js'

//Crear un addBill
export const addBill = async (req, res) => {
    try {
        const userId = req.user.uid 

        const cart = await Cart.findOne({ user: userId, status: 'active' })
            .populate('items.product', 'price stock') 

        if (!cart) {
            return res.status(404).send({
                success: false,
                message: 'Cart not available'
            }) 
        }

        let subtotal = 0 
        
        for (const { product, quantity } of cart.items) {
            if (product.stock < quantity) {
                return res.status(400).send({
                    success: false,
                    message: `Insufficient stock for product ${product._id}`
                }) 
            }
            subtotal += product.price * quantity 
        }

        const IVA_RATE = 0.12 
        const tax = +(subtotal * IVA_RATE).toFixed(2) 
        const total = +(subtotal + tax).toFixed(2) 

        const bill = await Bill.create({
            cart: cart._id,
            user: userId,
            subtotal,
            tax,
            total,
            status: 'paid'
        }) 

        cart.status = 'ordered' 
        await cart.save() 

        for (const { product, quantity } of cart.items) {
            await Product.updateOne(
                { _id: product._id },
                { $inc: { stock: -quantity } }
            ) 
        }

        return res.status(201).send({
            success: true,
            message: 'Bill generated successfully',
            bill
        }) 

    } catch (error) {
        console.error(error) 
        return res.status(500).send({
            success: false,
            message: 'Internal Error'
        }) 
    }
} 

export const updateBillCancelled = async (req, res) => {
  try {
    const { billId } = req.params 

    const bill = await Bill.findById(billId) 
    if (!bill) {
      return res.status(404).send({
        success: false,
        message: 'Bill not found'
      }) 
    }

    if (bill.status === 'cancelled') {
      return res.status(400).send({
        success: false,
        message: 'Bill is already cancelled'
      }) 
    }

    const cart = await Cart.findById(bill.cart).populate('items.product') 
    if (!cart) {
      return res.status(404).send({
        success: false,
        message: 'Associated cart not found'
      }) 
    }

    for (const { product, quantity } of cart.items) {
      await Product.findByIdAndUpdate(
        product._id,
        { $inc: { stock: quantity } }
      ) 
    }

    bill.status = 'cancelled' 
    cart.status = 'cancelled' 

    await bill.save() 
    await cart.save() 

    return res.status(200).send({
      success: true,
      message: 'Bill cancelled and stock reverted',
      bill
    }) 

  } catch (error) {
    console.error(error) 
    return res.status(500).send({
      success: false,
      message: 'Internal Error'
    }) 
  }
} 

//Listar Facturas por Token UserId
export const getBillsByUserId = async (req, res) => {
  try {
    const userId = req.user.uid 

    const bills = await Bill.find({ user: userId })
      .populate({
        path: 'cart',
        populate: { path: 'items.product', select: 'name price' }
      }) 

    return res.status(200).send({
      success: true,
      bills
    }) 

  } catch (error) {
    console.error(error) 
    return res.status(500).send({
      success: false,
      message: 'Internal error'
    }) 
  }
} 

//Listar Facturas por ID
export const getBillById = async (req, res) => {
  try {
    const { billId } = req.params 

    const bill = await Bill.findById(billId)
      .populate('user', 'name email')
      .populate({
        path: 'cart',
        populate: { path: 'items.product', select: 'name price' }
      }) 

    if (!bill) {
      return res.status(404).send({
        success: false,
        message: 'Bill not found'
      }) 
    }

    return res.status(200).send({
      success: true,
      bill
    }) 

  } catch (error) {
    console.error(error) 
    return res.status(500).send({
      success: false,
      message: 'Internal error'
    }) 
  }
} 


//Listar todas las facturas

export const getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find()
      .populate('user', 'name email')
      .populate({
        path: 'cart',
        populate: { path: 'items.product', select: 'name price' }
      }) 

    return res.status(200).send({
      success: true,
      bills
    }) 

  } catch (error) {
    console.error(error) 
    return res.status(500).send({
      success: false,
      message: 'Internal error'
    }) 
  }
} 



