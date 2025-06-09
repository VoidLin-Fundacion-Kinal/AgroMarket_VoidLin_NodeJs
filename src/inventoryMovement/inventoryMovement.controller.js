import InventoryMovement from './inventoryMovement.model.js'
import Product from '../product/product.model.js'



export const addInventoryMovement = async (req, res) => {
    try {

        const {
            product,
            amount,
            inputType
        } = req.body

        const productData = await Product.findById(product)
        const amountNaN = Number(amount)

        if (!productData) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Product not found:'
                }
            )
        }

        if (inputType === 'exit') {
            if (productData.stock <= 0) {
                return res.status(404).send(
                    {
                        success: false,
                        message: 'Insufficient stock for exit movement'
                    }
                )
            }
            productData.stock -= amountNaN
        } else {
            productData.stock += amountNaN
        }

        await productData.save()

        const movement = new InventoryMovement(
            {
                product,
                amount,
                inputType
            }
        )

        await movement.save()

        return res.status(200).send(
            {
                success: true,
                message: 'Inventory movement registered',
                product: productData,
                movement
            }
        )

    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                menssage: 'Internal Error'
            }
        )

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

export const deleteInventoryMovement = async (req, res) => {
    try {
        const { id } = req.params

        const inventoryData = await InventoryMovement.findById(id)
        console.log(id) 


        if (!inventoryData) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Inventory not found'
                }
            )
        }
        const productData = await Product.findById(inventoryData.product)


        if (inventoryData.inputType === 'entry') {
            productData.stock -= inventoryData.amount 
        } else if (inventoryData.inputType === 'exit') {
            productData.stock += inventoryData.amount 
        }

        await productData.save()

        await InventoryMovement.findByIdAndDelete(id)


        return res.status(200).send(
            {
                success: true,
                message: 'Deleted inventory'
            }
        )

    } catch (error) {
        console.error(error) 
        return res.status(500).send(
            {
                success: false,
                message: 'Internal Error.'
            }
        )

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