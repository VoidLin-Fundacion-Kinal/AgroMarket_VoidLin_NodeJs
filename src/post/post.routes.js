import { Router } from "express";
import { createPost,getPosts,updatePost,deletePost } from "./post.controller.js";

const api = Router()

api.post('/createPosts',createPost)
api.get('/getPosts',getPosts)
api.put('/updatePost/:id',updatePost)
api.delete('/deletePost/:id',deletePost)

export default api