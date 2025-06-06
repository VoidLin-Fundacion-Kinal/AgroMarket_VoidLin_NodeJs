import Post from './post.model.js'

export const createPost = async (req,res) => {
    try {
        const data =req.body
        const post = new Post(data)
        const savedPost =await post.save()

        return res.status(201).send(
            {
                success:true,
                message:'Post created successfully',
                post:savedPost
            }
        )
        
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                message:'Error creating post',error
            }
        )
    }
    
}

export const getPosts = async (req,res) => {
    try {
        const posts = await Post.find().populate({
            path:'user',
            select:'-_id'
        })
        if(!posts){
            return res.status(404).send(
                {
                    success:false,
                    mesasge:'Post not found'
                }
            )
        }

        return res.status(200).send(
            {
                success:true,
                message:'Posts found',
                posts
            }
        )
        
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'Error getting posts',error
            }
        )
    }
    
}

export const updatePost = async (req, res) => {
    try {
        const {id} = req.params
        const data = req.body

        const post = await Post.findByIdAndUpdate(id, data, {new: true})
        if (!post) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Post not found'
                }
            )
        }
        return res.status(200).send(
            {
                success: true,
                message: 'Post updated successfully'
                
            }
        )
        
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'Error updating post',error
            }
        )
        
    }
}

export const deletePost = async (req, res) => {
    try {
        const {id} = req.params

        const post = await Post.findByIdAndDelete(id)
        if (!post) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Post not found'
                }
            )
        }
        return res.status(200).send(
            {
                success: true,
                message: 'Post deleted successfully'
                
            }
        )
        
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'Error deleting post',error
            }
        )
        
    }
}