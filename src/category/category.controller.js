import Category from './category.model.js'

export const addCategory = async (req, res) => {
    try{
        let data = req.body
        let category = new Category(data)

        await category.save()

        return res.status(200).send(
            {
                success: true,
                message:'Category saved successfully',
                category
            }
        )

    }catch(error){
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'Internal sever error'
            }
        )
        
    }
}

export const listCategory = async (req, res) => {
    try{
        const{limit = 20, skip = 0} = req.query
        let category = await Category.find().skip(skip).limit(limit)

        if(!category || category.length == 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Category not found.'
                }
            )
        }

        return res.status(200).send(
            {
                success: true,
                message: 'Category found: ',
                category
            }
        )
    }catch(error){
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error',
                error
            }
        )
    }
}

export const updateCategory = async(req, res) => {
    try{
        let {id} = req.params
        let {name, description} = req.body

        let category = await Category.findByIdAndUpdate(
            id,
            {
                name,
                description
            },
            {new: true}
        )

        if(!category){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Category not found'
                }
            )
        }

        return res.status(200).send(
            {
                success: true,
                message: 'Category updated successfully',
                Category: {name, description}
            }
        )
        
    }catch(error){
        console.error(error)
        return res.status(500).send(
            {
                success: false, 
                message: 'General Error', 
                error
            }
        )
        
    }
}

export const deleteCategory = async(req, res) => {
    try{
        let {id} = req.params
        let category = await Category.findByIdAndDelete(id)

        if(!category){
            return res.status(400).send(
                {
                    success: false,
                    message: 'Category not found'
                }
            )
        }

        return res.status(200).send(
            {
                success: true, 
                message: 'Category deleted'
            }
        )
    }catch(error){
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                error
            }
        )
    }
}

export const listCategoryById = async(req, res) => {
    try{
        const{limit = 20, skip = 0} = req.query
        let {id} = req.params

        


        let category = await Category.findById(id)

        if(!category || category.length == 0){
            return res.status(404).send(
                {
                    success:false, 
                    message: 'Category Not Found'
                }
            )
        }

        return res.status(200).send(
            {
                success: true,
                message: 'Category Found: ',
                category
            }
        )
    }catch(error){
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error', 
                error
            }
        )
        
    }
}

export const listCategoryByName = async (req, res) => {
    try {
        const categoryName = req.body.name

        const categories = await Category.find({
            name: { $regex: categoryName, $options: 'i' }
        })

        if (!categories || categories.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'Category not found'
            })
        }

        return res.status(200).send({
            success: true,
            message: 'Category found',
            categories
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

