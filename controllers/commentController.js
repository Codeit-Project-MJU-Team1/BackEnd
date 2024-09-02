import express from 'express';
import { assert } from 'superstruct';
import { updateComment, deleteComment } from '../struct/commentStruct.js';
import commentService from '../services/commentService.js';

const commentController = express.Router();

// 댓글 수정
commentController.put('/:commentId', async(req, res, next) => {
    try{    
        const commentId = Number(req.params.commentId);
        assert(req.body, updateComment);
        const data = await commentService.updateComment(commentId, req.body);
        return res.status(200).json(data);
    } catch(error){
        console.log(error);
        next(error);
    }
});

// 댓글 삭제
commentController.delete('/:commentId', async(req, res, next) => {
    try{
        const commentId = Number(req.params.commentId);
        assert(req.body, deleteComment);
        const data = await commentService.deleteComment(commentId, req.body.password);
        return res.status(200).send(data);
    } catch(error){
        next(error);
    }
});

export default commentController;