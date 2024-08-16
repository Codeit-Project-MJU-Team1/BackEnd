import express from 'express';
import { assert } from 'superstruct';
import { createPost } from '../struct/postStruct.js';
import postService from '../services/postService.js';

const postController = express.Router();

postController.post('/', async(req, res, next) => {
    try{
        assert(req.body, createPost); // 검증 req.body랑 createPost랑 형식이 일치하는지
        const groupId = Number(req.params.groupId);
        const post = await postService.createPost(req.body, groupId);
        return res.status(201).json(post);
    } catch (error){
        next(error);
    }
});

export default postController;