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

        let categoryData = await Category.findById(category)
        if (!categoryData) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Category not Found'
                }
            )
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


export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id)

    if (!product) {
      return res.status(404).send({
        success: false,
        message: 'Product not found'
      })
    }

    if (product.image) {
      const imagePath = path.join('C:/IN6AV/TALLER/GITDESK/AgroMarket_VoidLin_NodeJs/images/productsImages', product.image)

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath)
        console.log('Imagen eliminada correctamente')
      } else {
        console.log('Imagen no encontrada físicamente:', product.image)
      }
    }

    await Product.findByIdAndDelete(id)

    return res.status(200).send({
      success: true,
      message: 'Product deleted successfully'
    })

  } catch (error) {
    console.error(error)
    return res.status(500).send({
      success: false,
      message: 'Internal error',
      error
    })
  }
}

export const listProduct = async (req, res) => {
  try {
    const { limit = 20, skip = 0 } = req.query 

    const products = await Product.find()
      .populate({
        path: 'provider',
        select: '-__v -createdAt -updatedAt' // Oculta campos innecesarios
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

    const products = await Product.find()
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

    const products = await Product.find()
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

    const products = await Product.find()
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

    const products = await Product.find()
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

    const products = await Product.find({provider: id})
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
