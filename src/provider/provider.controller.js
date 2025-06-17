import Provider from './provider.model.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename) 

//Agregar Proveedor
export const addProvider = async (req, res) => {
    try{
        const logo = req.file ? req.file.filename : null
        
        const newProvider = new Provider(
            {
                ...req.body,
                logo
            }
        )

        await newProvider.save()

        return res.status(201).send(
            {
                success: true,
                message: 'Provider added successfully',
                provider: newProvider
            }
        )
    }catch(error){
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'Internal Server Error', 
                error
            }
        )
        
    }
}

//Actualizar Update Proveedor
export const updateProvider = async (req, res) => {
  try {
    const { id } = req.params
    const provider = await Provider.findById(id)

    if (!provider) {
      return res.status(404).send({
        success: false,
        message: 'Provider not found'
      })
    }

    if (!provider.isActive) {
      return res.status(403).send({
        success: false,
        message: 'This provider is deactivated and cannot be updated'
      })
    }

    const { name, description, email, typeProduct, phone, legalRepresentative } = req.body

    const updatedProvider = await Provider.findByIdAndUpdate(
      id,
      { name, description, email, typeProduct, phone, legalRepresentative },
      { new: true }
    )

    return res.send({
      success: true,
      message: 'Provider updated successfully',
      provider: updatedProvider
    })
  } catch (error) {
    console.error(error)
    return res.status(500).send({
      success: false,
      message: 'Internal server error',
      error
    })
  }
}

//Actualizar Proveedor Logo
export const updateProviderLogo = async (req, res) => {
  try {
    const providerId = req.params.id

    if (!req.file)
      return res.status(400).json({ success: false, message: 'No file uploaded' })

    const provider = await Provider.findById(providerId)

    if (!provider)
      return res.status(404).json({ success: false, message: 'Provider not found' })

    if (!provider.isActive) {
      return res.status(403).json({
        success: false,
        message: 'This provider is deactivated and cannot update logo'
      })
    }

    if (provider.logo) {
      const oldPath = path.join(req.file.destination, provider.logo)
      try {
        await fs.promises.unlink(oldPath)
      } catch (err) {
        if (err.code !== 'ENOENT') console.error('No se pudo borrar:', err)
      }
    }

    provider.logo = req.file.filename
    await provider.save()

    return res.json({
      success: true,
      message: 'Provider logo updated successfully'
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
}

export const listProvider = async (req, res) => {
  try {
    const provider = await Provider.find({})

    return res.status(200).send({
      success: true,
      message: 'Active Providers Found',
      Provider: provider
    })
  } catch (error) {
    console.error(error)
    return res.status(500).send({
      success: false,
      message: 'Internal Error',
      error
    })
  }
}

//Listar Proveedores
export const listProviderActive = async (req, res) => {
  try {
    const provider = await Provider.find({ isActive: true })

    if (!provider || provider.length === 0) {
      return res.status(404).send({
        success: false,
        message: 'No active providers found'
      })
    }

    return res.status(200).send({
      success: true,
      message: 'Active Providers Found',
      Provider: provider
    })
  } catch (error) {
    console.error(error)
    return res.status(500).send({
      success: false,
      message: 'Internal Error',
      error
    })
  }
}


//Listar Proveedor Por Id
export const listProviderById = async (req, res) => {
  try {
    let { id } = req.params

    const provider = await Provider.findById(id)

    if (!provider) {
      return res.status(404).send({
        success: false,
        message: 'Could not find Provider'
      })
    }

    if (!provider.isActive) {
      return res.status(403).send({
        success: false,
        message: 'This provider is deactivated'
      })
    }

    return res.status(200).send({
      success: true,
      message: 'Provider Found',
      Provider: provider
    })
  } catch (error) {
    console.error(error)
    return res.status(500).send({
      success: false,
      message: 'General Error',
      error
    })
  }
}


//Lista por nombre
export const listProviderByName = async (req, res) => {
  try {
    const providerName = req.body.provider

    if (!providerName || providerName.trim() === '') {
      return res.status(400).send({
        success: false,
        message: 'Provider name is required'
      })
    }

    const providers = await Provider.find({
      name: { $regex: providerName, $options: 'i' },
      isActive: true
    })

    if (!providers || providers.length === 0) {
      return res.status(404).send({
        success: false,
        message: 'No active providers found with that name'
      })
    }

    return res.status(200).send({
      success: true,
      message: 'Active providers found',
      providers
    })
  } catch (error) {
    console.error(error)
    return res.status(500).send({
      success: false,
      message: 'General Error',
      err: error
    })
  }
}

//Soft Delete Provider
export const softDeleteProvider = async (req, res) => {
    try {
        const { id } = req.params
        const { deactivationReason } = req.body

        const provider = await Provider.findById(id)

            if (!provider) {
            return res.status(404).send(
                {
                success: false,
                message: 'Provider not found'
                }
            )
    }

        provider.isActive = false
        provider.deactivationReason = deactivationReason || 'No reason provided'
        provider.deactivatedAt = new Date()

        await provider.save()

        return res.status(200).send(
            {
                success: true,
                message: 'Provider soft deleted successfully',
                provider
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