import Post from '../post/post.model.js'

export const addComment = async(req, res) => {
    try{
        const {id} = req.params
        const {comment} = req.body
        const idC = req.user.uid

        const newComment = await Post.findByIdAndUpdate(
            id,
            {
                $push: {
                    comments: {
                        user: idC,
                        comment
                    }
                }
            },
            {new: true}
        )

        if(!newComment){
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
                message: 'Comment added'
            }
        )
    }catch(error){
        console.error(error)
        return res.status(500).send(
            {
                success:false,
                message: 'Internal Error',
                error: error.message
            }
        )
        
    }
}

export const updateComment = async(req, res) => {
    try{
        const {id} = req.params
        const{
            comment
        }= req.body

        const newCommet = await Post.findByIdAndUpdate(
            id,
            {
                comments: {
                    comment
                }
            },
            {new: true}
        )
        
        if(!newCommet){
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
                message: 'Updated Comment'
            }
        )

    }catch(error){
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'Internal Error',
                error: error.message
            }
        )
        
    }
}


export const deleteComment = async(req, res) => {
    try{
        const {commentId} = req.params
        const commentData = await Post.findOne(
            {
                "comments._id": commentId
            }
        )

        if(!commentData){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Comment not found:'
                }
            )
        }

        const comment = await Post.findByIdAndUpdate(
            commentData._id,
            {
                $pull:{
                    comments: {_id: commentId}
                }
            },
            {new: true}
        )

        return res.status(200).send(
            {
                success: true,
                message: 'Deleted Comment'
            }
        )

    }catch(error){
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'Internal Error'
            }
        )
        
    }
}

