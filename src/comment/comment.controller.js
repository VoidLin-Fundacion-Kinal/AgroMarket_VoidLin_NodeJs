import Post from '../post/post.model.js'

export const addComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;
        const idC = req.user.uid;

        // Verificar si el post existe y está activo
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).send({
                success: false,
                message: 'Post not found'
            });
        }

        if (!post.isActive) {
            return res.status(403).send({
                success: false,
                message: 'Cannot comment on an inactive post'
            });
        }

        // Agregar comentario
        post.comments.push({ user: idC, comment });
        await post.save();

        return res.status(200).send({
            success: true,
            message: 'Comment added'
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Internal Error',
            error: error.message
        });
    }
};
export const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { comment } = req.body;
        const userId = req.user.uid;

        if (!comment || typeof comment !== 'string') {
            return res.status(400).send({
                success: false,
                message: 'Invalid comment content'
            });
        }

        // Buscar el post con ese comentario
        const post = await Post.findOne({ "comments._id": commentId });

        if (!post) {
            return res.status(404).send({
                success: false,
                message: 'Comment not found'
            });
        }

        const targetComment = post.comments.id(commentId);

        if (!targetComment) {
            return res.status(404).send({
                success: false,
                message: 'Comment not found in post'
            });
        }

        // Validar si el comentario pertenece al usuario
        if (targetComment.user.toString() !== userId) {
            return res.status(403).send({
                success: false,
                message: 'You cannot update a comment that is not yours'
            });
        }

        // Actualizar comentario
        targetComment.comment = comment;
        
        try {
            await post.save();
            return res.status(200).send({
                success: true,
                message: "Comment updated successfully",
                updatedComment: targetComment
            });
        } catch (saveError) {
            console.error("Error saving post:", saveError);
            return res.status(500).send({
                success: false,
                message: "Failed to save updated comment",
                error: saveError.message
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user.uid;

        // Buscar el post con ese comentario
        const post = await Post.findOne({ "comments._id": commentId });

        if (!post) {
            return res.status(404).send({
                success: false,
                message: 'Comment not found'
            });
        }

        const targetComment = post.comments.id(commentId);

        if (!targetComment) {
            return res.status(404).send({
                success: false,
                message: 'Comment not found in post'
            });
        }

        // Validar si el comentario pertenece al usuario
        if (targetComment.user.toString() !== userId) {
            return res.status(403).send({
                success: false,
                message: 'You cannot delete a comment that is not yours'
            });
        }

        // Soft delete: marcar como inactivo
        targetComment.isActive = false;
        await post.save();

        return res.status(200).send({
            success: true,
            message: 'Comment soft-deleted'
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Internal Error',
            error: error.message
        });
    }
};
