import express from 'express';
import { assert } from 'superstruct';
import { createComment, updateComment , deleteComment, verifyPassword} from '../struct/commentStruct.js';
import commentService from '../services/commentService.js';

const commentController = express.Router();

// 댓글 수정
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