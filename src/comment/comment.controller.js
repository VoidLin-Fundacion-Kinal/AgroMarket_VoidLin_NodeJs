import Comment from './comment.model.js'

//Create Comment 
export const createComment = async(req, res) => {
    try{
        const data = req.body
        const comment = new Comment(data)
        await comment.save()

        return res.send(
            {
                success: true,
                message: 'The comment has been created successfully',
                comment
            }
        )
    }catch (err){
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}

//Update Comment
export const updateComment = async (req, res) => {
    try{
        const { id } = req.params
        const data = req.body
        const commnet = await Comment.findByIdAndUpdate(
            id,
            data, 
            { new : true }
        )
        
        return res.send(
            {
                sucess: true, 
                message: 'Comment update successfully',
                commnet
            }
        )


    }catch(err){
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false, 
                message: 'General error'
            }
        )
    }
}



//Get all Comments
export const  getAllComents = async(req, res) => {
    try{
        const { limit = 20, skip = 0} = req.query
        const comment =  await Comment.find()
            .limit(Number(limit))
            .skip(Number(skip))

            return res.send(
                {
                    success: true,
                    message: 'Comments found',
                    comment
                }
            )

    }catch (err){
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}

//Get comment by id
export const getCommentById = async (req, res) => {
    try{
        const { id } = req.params
        const comment = await Comment.findById(id)

        return res.send(
            {
                success: true,
                message: 'Comment found id:',
                comment
            }
        )
    }catch(err){
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error', 
                err        
            }
        )
    }
}

//Get comment by post
export const getCommnetByPost = async (req, res) => {
    try{
        const { post } = req.params;
        const comment = await Comment.find({ post })

        return res.send(
            {
                success: true, 
                message: 'Coments found:',
                comment 
            }
        )
    }catch(err){
        console.error('General error:', err)
        return res.status(500).send(
            {
                sucess: false, 
                message: 'General error', 
                err
            }
        )
    }
}


//Get comment by user
export const getCommnetByUser = async (req, res) => {
    try{
        const { user } = req.params;
        const comment = await Comment.find({ user })

        return res.send(
            {
                success: true, 
                message: 'Coments found:',
                comment 
            }
        )
    }catch(err){
        console.error('General error:', err)
        return res.status(500).send(
            {
                sucess: false, 
                message: 'General error', 
                err
            }
        )
    }
}

//Delete Comment 
export const deleteComment = async (req, res) =>{
    try{
        const { id } = req.params
        const deleteComment = await Comment.findByIdAndDelete(id)
        
        return res.send(
            {
                success: true, 
                message: 'Comment delete successfully'
            }
        )
    }catch(err){
        console.error('General error:', err)
        return res.status(500).send(
            {
                sucees: false, 
                message:'General error',
                err
            }
        )
    }
}
