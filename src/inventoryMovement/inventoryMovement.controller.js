import InventoryMovement from './inventoryMovement.model.js'
import Product from '../product/product.model.js'

export const addInventoryMovement = async (req, res) => {
    try {
        const {
            product,
            amount,
            inputType
        } = req.body;

        const productData = await Product.findById(product)
        const amountNaN = Number(amount)

        if (!productData) {
            return res.status(404).send({
                success: false,
                message: 'Product not found'
            })
        }

        if (inputType === 'exit') {
            if (productData.stock <= 0) {
                return res.status(400).send({
                    success: false,
                    message: 'Insufficient stock for exit movement (stock is zero)'
                })
            }
            if (amountNaN > productData.stock) {
                return res.status(400).send({
                    success: false,
                    message: 'Insufficient stock for exit movement (amount exceeds available stock)'
                })
            }
            productData.stock -= amountNaN
        } else {
            productData.stock += amountNaN
        }

        await productData.save()

        const movement = new InventoryMovement({
            product,
            amount,
            inputType
        })

        await movement.save()

        return res.status(200).send({
            success: true,
            message: 'Inventory movement registered',
            product: productData,
            movement
        })

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Internal Error'
        })
    }
}

export const updateInventoryMovement = async (req, res) => {
    try {
        let data = req.body

        let { amount } = req.body

        let { id } = req.params

        let movement = await InventoryMovement.findById(id)




        if (!movement) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Inventory Movent not found'
                }
            )
        }
        if (!movement.isActive) {
            return res.status(403).send({
                success: false,
                message: 'This Inventory Movement is deactivated'
            })
    }

        let productSaved = await Product.findById(movement.product)

        if (!productSaved) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Product not found'
                }
            )
        }

        let { inputType } = movement
        if (amount) {
            switch (inputType) {
                case 'exit':
                    /* if(quantity >= (productSaved.amount + movement.quantity)) return res.status(400).send({success: false, message:'Quantity cannot be more than '+ productSaved.amount + movement.quantity})  */
                    await Product.updateOne({ _id: movement.product }, { $inc: { stock: movement.amount } })
                    let movement1 = await InventoryMovement.findByIdAndUpdate(id, data, { new: true })
                    await Product.updateOne({ _id: movement.product }, { $inc: { stock: -amount } })
                    return res.status(200).send(
                        {
                            success: true,
                            message: 'Inventory Movement(exit) updated successfully',
                            movement
                        }
                    )
                    break 
                case 'entry':
                    await Product.updateOne({ _id: movement.product }, { $inc: { stock: -movement.amount } })
                    let movement2 =await InventoryMovement.findByIdAndUpdate(id, data, { new: true })
                    await Product.updateOne({ _id: movement.product }, { $inc: { stock: amount } })
                    return res.status(200).send(
                        {
                            success: true,
                            message: 'Inventory Movement(entry) updated successfully',
                            movement2,
                        }
                    )
                    break 
            }
        }

        await InventoryMovement.findByIdAndUpdate(id, data, { new: true })

        return res.status(200).send(
            {
                success: true,
                message: 'Inventory Movement updated successfully',
                movement
            }
        )

    } catch (error) {
        console.log(error) 

        return res.status(500).send(
            {
                message: 'General error with  movements', error
            }
        )
    }

}

export const softDeleteInventoryMovement = async (req, res) => {
    try {
        const { id } = req.params
        const { deactivationReason } = req.body

        const movement = await InventoryMovement.findById(id)

            if (!movement) {
            return res.status(404).send(
                {
                success: false,
                message: 'Inventory Movement not found'
                }
            )
    }

        movement.isActive = false
        movement.deactivationReason = deactivationReason || 'No reason provided'
        movement.deactivatedAt = new Date()

        await movement.save()

        return res.status(200).send(
            {
                success: true,
                message: 'Inventory Movement soft deleted successfully',
                movement
            }
        )
    } catch (error) {
        console.error(error)
        return res.status(500).send({
        success: false,
        message: 'Internal Server Error',
        error
        })
    }
}

export const listInventoryMovement = async (req, res) => {
    try {
        const { limit = 20, skip = 0 } = req.query 
        let inventoryMovement = await InventoryMovement
            .find()
            .populate(
                {
                    path: 'product',
                    select: '-__v -createdAt -updatedAt'
                }
            )
            .limit(limit)
            .skip(skip)

        if (!inventoryMovement || inventoryMovement.length == 0) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Inventory not found:'
                }
            )
        }

        return res.status(200).send(
            {
                success: true,
                message: 'Inventory Found: ',
                inventory: inventoryMovement
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


export const listInventoryMovementById = async (req, res) => {
    try {
        const { limit = 20, skip = 0 } = req.query 
        const {id} = req.params

    

        let inventoryMovement = await InventoryMovement
            .findById(id)
            .populate(
                {
                    path: 'product',
                    select: '-__v -createdAt -updatedAt'
                }
            )
            .limit(limit)
            .skip(skip)

        if (!inventoryMovement || inventoryMovement.length == 0) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Inventory not found:'
                }
            )
        }
        if (!inventoryMovement.isActive) {
      return res.status(403).send({
        success: false,
        message: 'This Inventory Movement is deactivated'
      })
    }

        return res.status(200).send(
            {
                success: true,
                message: 'Inventory Found: ',
                inventory: inventoryMovement
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

export const listInventoryMovementActive = async (req, res) => {
    try {
        const { limit = 20, skip = 0 } = req.query 
        let inventoryMovement = await InventoryMovement
            .find({ isActive: true })
            .populate(
                {
                    path: 'product',
                    select: '-__v -createdAt -updatedAt'
                }
            )
            .limit(limit)
            .skip(skip)

        if (!inventoryMovement || inventoryMovement.length == 0) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Inventory not found:'
                }
            )
        }

        return res.status(200).send(
            {
                success: true,
                message: 'Inventory Found: ',
                inventory: inventoryMovement
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