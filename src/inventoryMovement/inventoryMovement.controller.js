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
        if (!productData.isActive) {
            return res.status(400).send({
                success: false,
                message: 'Cannot add product: Product is deactivated'
            });
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
        let data = req.body;
        let { amount, inputType } = req.body;
        let { id } = req.params;

        let movement = await InventoryMovement.findById(id);
        if (!movement) {
            return res.status(404).send({
                success: false,
                message: 'Movement not found'
            });
        }

        let product = await Product.findById(movement.product);
        if (!product) {
            return res.status(404).send({
                success: false,
                message: 'Product not found'
            });
        }

        if (amount !== undefined) {
            amount = Number(amount);
            if (isNaN(amount)) {
                return res.status(400).send({
                    success: false,
                    message: 'Amount must be a valid number'
                });
            }

            const oldAmount = movement.amount;
            const oldType = movement.inputType;
            const newType = inputType || oldType;

            // 1. Revertir el movimiento anterior (dejar el stock como si nunca se hubiera hecho)
            if (oldType === 'entry') {
                product.stock -= oldAmount;
            } else {
                product.stock += oldAmount;
            }

            // 2. Validar y aplicar el nuevo movimiento
            if (newType === 'exit') {
                if (amount > product.stock) {
                    return res.status(400).send({
                        success: false,
                        message: 'Insufficient stock for updated exit movement'
                    });
                }
                product.stock -= amount;
            } else if (newType === 'entry') {
                product.stock += amount;
            } else {
                return res.status(400).send({
                    success: false,
                    message: 'Invalid input type'
                });
            }

            // 3. Guardar el nuevo stock
            await product.save();

            // 4. Actualizar el movimiento y retornarlo
            movement = await InventoryMovement.findByIdAndUpdate(id, { amount, inputType: newType }, { new: true });

            return res.status(200).send({
                success: true,
                message: `Inventory Movement (${newType}) updated successfully`,
                movement,
                product
            });
        }

        // Si no se envió amount, solo actualiza otros campos
        movement = await InventoryMovement.findByIdAndUpdate(id, data, { new: true });

        return res.status(200).send({
            success: true,
            message: 'Inventory Movement updated (no stock affected)',
            movement
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'General error with movements',
            error
        });
    }
};


export const softDeleteInventoryMovement = async (req, res) => {
    try {
        const { id } = req.params;
        const { deactivationReason } = req.body;

        const movement = await InventoryMovement.findById(id);
        if (!movement) {
            return res.status(404).send({
                success: false,
                message: 'Inventory Movement not found'
            });
        }

        // Validar si ya está desactivado
        if (!movement.isActive) {
            return res.status(400).send({
                success: false,
                message: 'Movement is already deactivated'
            });
        }

        // Buscar el producto relacionado
        const product = await Product.findById(movement.product);
        if (!product) {
            return res.status(404).send({
                success: false,
                message: 'Associated product not found'
            });
        }

        // Revertir el efecto del movimiento
        if (movement.inputType === 'entry') {
            product.stock -= movement.amount;
        } else if (movement.inputType === 'exit') {
            product.stock += movement.amount;
        }

        // Guardar cambios
        await product.save();

        movement.isActive = false;
        movement.deactivationReason = deactivationReason || 'No reason provided';
        movement.deactivatedAt = new Date();

        await movement.save();

        return res.status(200).send({
            success: true,
            message: 'Inventory Movement soft deleted and stock reverted',
            movement,
            product
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error',
            error
        });
    }
};


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