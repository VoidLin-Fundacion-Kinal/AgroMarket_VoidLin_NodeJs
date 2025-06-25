import Product from "./product.model.js" 
import Provider from './../provider/provider.model.js'
import Category from './../category/category.model.js'

import path from 'path' 
import fs from 'fs' 

//Add Product 
export const addProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            weigth,
            stock,
            provider,
            category
        } = req.body


        const productImage = req.file ? req.file.filename : null

        let providerData = await Provider.findById(provider)

        if (!providerData) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Provider not Found'
                }
            )
        }
         if (!providerData.isActive) {
            return res.status(400).send({
                success: false,
                message: 'Cannot add product: Provider is deactivated'
            });
        }


        let categoryData = await Category.findById(category)
        if (!categoryData) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Category not Found'
                }
            )
        }
         if (!categoryData.isActive) {
            return res.status(400).send({
                success: false,
                message: 'Cannot add product: Category is deactivated'
            });
        }

        let newProduct = new Product(
            {
                name,
                description,
                price,
                weigth,
                image: productImage,
                stock,
                provider,
                category
            }
        )

        await newProduct.save()

        return res.status(200).send(
            {
                success: true,
                message: 'Product saved successfully',
                product: newProduct

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

//Actualizar Producto
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params

        const {
            name,
            description,
            price,
            weigth
        } = req.body

        const dataProduct = await Product.findById(id)

        if (!dataProduct) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Product not found'
                }
            )
        }

        const updateProduct = await Product.findByIdAndUpdate(
            id,
            {
                name,
                description,
                price,
                weigth
            },
            { new: true }
        )

        return res.status(200).send(
            {
                success: true,
                message: 'Updated Product',
                product: updateProduct

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



// Actualizar logo del producto
export const updateProductImage = async (req, res) => {
    try {
        const { id } = req.params 

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' }) 
        }

        const product = await Product.findById(id) 
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' }) 
        }

        if (product.image) {
            const oldPath = path.join(req.file.destination, product.image) 
            try {
                await fs.promises.unlink(oldPath) 
            } catch (err) {
                if (err.code !== 'ENOENT') console.error('No se pudo borrar:', err) 
            }
        }

        product.image = req.file.filename 
        await product.save() 

        return res.json({
            success: true,
            message: 'Product image updated successfully',
            product
        }) 

    } catch (error) {
        console.error(error) 
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        }) 
    }
} 

export const listProductActive = async (req, res) => {
  try {
    
            
    const products = await Product.find({isActive: true })
      .populate({
        path: 'provider',
        select: '-__v -createdAt -updatedAt' // Oculta campos innecesarios
      })
      .populate({
        path: 'category',
        select: '-__v -createdAt -updatedAt'
      })
  
      
    if(!products || products.length == 0){
                return res.status(200).send(
                    {
                        success: false,
                        message: 'products not found.'
                    }
                )
            }
    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Products not found'
      }) 
    }

    return res.status(200).json({
      success: true,
      message: 'Products list',
      products
    }) 

  } catch (error) {
    console.error(error) 
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    }) 
  }
}

export const listProduct = async (req, res) => {
  try {

    const products = await Product.find()
      .populate({
        path: 'provider',
        select: '-__v -createdAt -updatedAt' // Oculta campos innecesarios
      })
      .populate({
        path: 'category',
        select: '-__v -createdAt -updatedAt'
      })
   

    if (!products || products.length === 0) {
      return res.status(200).json({
        success: false,
        message: 'Products not found',
        products: []
      }) 
    }

    return res.status(200).json({
      success: true,
      message: 'Products list',
      products
    }) 

  } catch (error) {
    console.error(error) 
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    }) 
  }
}  

export const listProductById = async (req, res) => {
  try {
    const { limit = 20, skip = 0 } = req.query 
    let {id} = req.params

    const products = await Product.findById(id)
      .populate({
        path: 'provider',
        select: '-__v -createdAt -updatedAt' 
      })
      .populate({
        path: 'category',
        select: '-__v -createdAt -updatedAt'
      })
      .limit(Number(limit))
      .skip(Number(skip)) 

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Products not found'
      }) 
    }

    if (!products.isActive) {
        return res.status(403).send({
            success: false,
            message: 'The Product is deactivated'
        })
        }
    return res.status(200).json({
      success: true,
      message: 'Products list',
      products
    }) 

  } catch (error) {
    console.error(error) 
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    }) 
  }
} 

export const listProductsAZ = async (req, res) => {
  try {
    const { limit = 20, skip = 0 } = req.query 

    const products = await Product.find({isActive: true })
      .sort({name: 1})
      .populate({
        path: 'provider',
        select: '-__v -createdAt -updatedAt' 
      })
      .populate({
        path: 'category',
        select: '-__v -createdAt -updatedAt'
      })
      .limit(Number(limit))
      .skip(Number(skip)) 


    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Products not found'
      }) 
    }

    return res.status(200).json({
      success: true,
      message: 'Products list',
      products
    }) 

  } catch (error) {
    console.error(error) 
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    }) 
  }
} 

export const listProductsZA = async (req, res) => {
  try {
    const { limit = 20, skip = 0 } = req.query 

    const products = await Product.find({isActive: true })
      .sort({name: -1})
      .populate({
        path: 'provider',
        select: '-__v -createdAt -updatedAt' 
      })
      .populate({
        path: 'category',
        select: '-__v -createdAt -updatedAt'
      })
      .limit(Number(limit))
      .skip(Number(skip)) 

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Products not found'
      }) 
    }

    return res.status(200).json({
      success: true,
      message: 'Products list',
      products
    }) 

  } catch (error) {
    console.error(error) 
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    }) 
  }
} 

export const listProductsPriceHigh = async (req, res) => {
  try {
    const { limit = 20, skip = 0 } = req.query 

    const products = await Product.find({isActive: true })
      .sort({price: -1})
      .populate({
        path: 'provider',
        select: '-__v -createdAt -updatedAt' 
      })
      .populate({
        path: 'category',
        select: '-__v -createdAt -updatedAt'
      })
      .limit(Number(limit))
      .skip(Number(skip)) 

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Products not found'
      }) 
    }

    return res.status(200).json({
      success: true,
      message: 'Products list',
      products
    }) 

  } catch (error) {
    console.error(error) 
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    }) 
  }
} 

export const listProductsPriceLow = async (req, res) => {
  try {
    const { limit = 20, skip = 0 } = req.query 

    const products = await Product.find({isActive: true })
      .sort({price: 1})
      .populate({
        path: 'provider',
        select: '-__v -createdAt -updatedAt' 
      })
      .populate({
        path: 'category',
        select: '-__v -createdAt -updatedAt'
      })
      .limit(Number(limit))
      .skip(Number(skip)) 

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Products not found'
      }) 
    }

    return res.status(200).json({
      success: true,
      message: 'Products list',
      products
    }) 

  } catch (error) {
    console.error(error) 
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    }) 
  }
} 


export const listProductsProvider = async (req, res) => {
  try {
    const { limit = 20, skip = 0 } = req.query 
    const {id} = req.params

    const products = await Product.find({provider: id, isActive: true })
      .populate({
        path: 'provider',
        select: '-__v -createdAt -updatedAt' 
      })
      .populate({
        path: 'category',
        select: '-__v -createdAt -updatedAt'
      })
      .limit(Number(limit))
      .skip(Number(skip)) 

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Products not found'
      }) 
    }

    return res.status(200).json({
      success: true,
      message: 'Products list',
      products
    }) 

  } catch (error) {
    console.error(error) 
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    }) 
  }
} 

//Soft Delete Product
export const softDeleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { deactivationReason } = req.body || {}

        const product = await Product.findById(id)

            if (!product) {
            return res.status(404).send(
                {
                success: false,
                message: 'Product not found'
                }
            )
    }

        product.isActive = false
        product.deactivationReason = deactivationReason || 'No reason provided'
        product.deactivatedAt = new Date()

        await product.save()

        return res.status(200).send(
            {
                success: true,
                message: 'product soft deleted successfully',
                product
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

export const revertSoftDeleteProduct = async (req, res) => {
    try {
        const {idProduct} = req.body
        const product = await Product.findById(idProduct)

        if (!product) {
            return res.status(404).send({
                success: false,
                message: 'Product not found'
            })
        }

        if (product.isActive === true) {
            return res.status(400).send({
                success: false,
                message: 'Product is already active'
            })
        }

        product.isActive = true
        product.deactivationReason = null
        product.deactivatedAt = null

        await product.save()

        return res.status(200).send({
            success: true,
            message: 'Product reverted successfully',
            product 
        })

        
    } catch (error) {
        console.error(error)
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error',
            error
        })
    }
}
