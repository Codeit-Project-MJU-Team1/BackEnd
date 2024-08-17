import express from 'express';
import { assert } from 'superstruct';
import { createPost, updatePost , deletePost } from '../struct/postStruct.js';
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
        next(error);
    }
});

postController.delete('/:postId', async(req, res, next) => {
    try{
        const postId = Number(req.params.postId);
        assert(req.body, deletePost);
        const data = await postService.deletePost(postId, req.body.postPassword);
        return res.status(200).send(data);
    } catch(error){
        next(error);
    }
})

export default postController;