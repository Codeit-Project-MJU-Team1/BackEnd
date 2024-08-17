import express from 'express';
import { assert } from 'superstruct';
import { createPost, updatePost } from '../struct/postStruct.js';
import postService from '../services/postService.js';

const postController = express.Router();

postController.put('/:postId', async(req, res, next) => {
    try{
        const postId = Number(req.params.postId);
        const {moment, ...post} = req.body;
        post.moment = new Date(moment);
        assert(post, updatePost);
        const data = await postService.updatePost(postId, post);
        return res.status(200).json(data);
    } catch(error){
        console.log(error);
        next(error);
    }
})

export default postController;