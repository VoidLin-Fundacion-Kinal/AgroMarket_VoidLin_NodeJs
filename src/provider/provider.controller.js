'use strict'

import Provider from './provider.model.js'

export const saveProvider = async(req,res)=>{
    try {
        let data = req.body
        let provider = new Provider(data)
        
        await provider.save()
        
        return res.status(201).send(
            {
                success:true,
                message: 'Provider registered'
            }
        )
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                message: 'General error with registering provider', 
                error: error
            }
        )
    }
}

export  const getAllProviders = async(req,res)=>{
    try {
        let provider = await Provider.find()

        if(!provider || provider.length == 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Providers Not Found'
                }
            )
        }

        return res.status(200).send(
            {
                success:true,
                message: 'Providers Found: ', provider
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

export const getProviderById = async(req,res)=>{
    try {
        
        let {id} = req.params
        let provider = await Provider.findById(id)

        if(!provider || provider.length == 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Provider Not Found'
                }
            )
        }

        return res.status(200).send(
            {
                success:true,
                message: 'Provider Found: ', provider
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


export const getProviderByName = async(req,res)=>{
    try {
        
        let {provider} = req.params
        let providers = await Provider.find({provider})

        if(!providers || provider.length == 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Provider Not Found'
                }
            )
        }

        return res.status(200).send(
            {
                success:true,
                message: 'Provider Found: ', providers
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

export const updateProvider = async(req,res)=>{
    try {
        let data = req.body
        let {id} = req.params
        let provider = await Provider.findByIdAndUpdate(id,data,{new:true})

        if(!provider) return res.status(400).send(
            {
                success:false,
                messgae: 'Error with provider'
            }
        )

        return res.status(200).send(
            {
                success: true,
                message: 'Provider Updated ', provider
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

export const deleteProvider = async(req,res)=>{
    try {
        let {id} = req.params
        let provider = await Provider.findByIdAndDelete(id)

        if(!provider) return res.status(400).send(
            {
                success:false,
                messgae: 'Error with provider'
            }
        )

        return res.status(200).send(
            {
                success: true,
                message: 'Provider Deleted'
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