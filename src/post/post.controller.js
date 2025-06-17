import Post from './post.model.js'
import User from './../user/user.model.js'

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

//Agregar Post
export const addPost = async (req, res) => {
    try {
        const {
            title,
            description,
            address
        } = req.body

        const image = req.files?.map(file => file.filename) || []
        const idC = req.user.uid
        const dataUser = await User.findById(idC)


        const newPost = new Post(
            {
                title,
                description,
                user: idC,
                images: image,
                address,
                personalData: {
                    cui: dataUser.personalData.cui,
                    nit: dataUser.personalData.nit
                }
            }
        )

        await newPost.save()

        return res.status(201).send(
            {
                success: true,
                message: 'Post created successfully',
                Post: newPost
            }
        )

    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'Internal Error',
                error
            }
        )

    }
}

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params

        const {
            title,
            description,
            address
        } = req.body

        let postData = await Post.findById(id)

        if (!postData.isActive) {
            return res.status(403).send({
                success: false,
                message: 'Cannot update a deactivated post'
            })
        }

        if (!postData) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Post not found'
                }
            )
        }

        let newPost = await Post.findByIdAndUpdate(
            id,
            { title, description, address },
            { new: true }
        )

        return res.status(200).send(
            {
                success: true,
                message: 'Post updated: ',
                post: newPost
            }
        )
    } catch (error) {
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

 
export const listPost = async (req, res) => {
    try {
        const { limit = 20, skip = 0 } = req.query
        const post = await Post.find().populate(
            {
                path: 'user',
                select: 'name username surname address email cui nit'
            }
        ).skip(skip).limit(limit)

        if (!post || post.length == 0) {
            return res.statu(404).send(
                {
                    success: false,
                    message: 'Post not found:'
                }
            )
        }

        return res.status(200).send(
            {
                success: true,
                message: 'Post found: ',
                post
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

export const listPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const dataPost = await Post.findById(id)
      .populate({
        path: 'user',
        select: 'name username surname address email cui nit'
      })
      .lean()

    if (!dataPost) {
      return res.status(404).send({
        success: false,
        message: 'Post not Found:'
      })
    }

    if (!dataPost.isActive) {
      return res.status(403).send({
        success: false,
        message: 'This post is deactivated'
      })
    }

    // Filtrar comentarios activos
    dataPost.comments = dataPost.comments?.filter(comment => comment.isActive !== false)

    return res.status(200).send({
      success: true,
      message: 'Post found:',
      dataPost
    })

  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: 'Internal Error',
      error: error.message
    })
  }
}


//// Soft Delete Post
export const softDeletePost = async (req, res) => {
    try {
        const { id } = req.params
        const { deactivationReason } = req.body

        const post = await Post.findById(id)

            if (!post) {
            return res.status(404).send(
                {
                success: false,
                message: 'Post not found'
                }
            )
    }

        post.isActive = false
        post.deactivationReason = deactivationReason || 'No reason provided'
        post.deactivatedAt = new Date()

        await post.save()

        return res.status(200).send(
            {
                success: true,
                message: 'Post soft deleted successfully',
                post
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

export const listPostActive = async (req, res) => {
    try {
        const { limit = 20, skip = 0 } = req.query

        const posts = await Post.find({ isActive: true })
            .populate({
            path: 'user',
            select: 'name username surname address email cui nit'
        })
            .skip(skip)
            .limit(limit)
            .lean()

            if (!posts || posts.length === 0) {
                    return res.status(404).send({
                    success: false,
                    message: 'No active posts found'
                })
            }

            const filteredPosts = posts.map(post => {
                post.comments = post.comments?.filter(comment => comment.isActive !== false)
                return post
            })

            return res.status(200).send({
                success: true,
                message: 'Active posts with visible comments',
                posts: filteredPosts
            })
        } catch (error) {
        console.error(error)
            return res.status(500).send({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }
}