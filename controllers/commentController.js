import express from 'express';
import { assert } from 'superstruct';
import { updateComment } from '../struct/commentStruct.js';
import commentService from '../services/commentService.js';

const commentController = express.Router();

// 댓글 수정
commentController.put('/:commentId', async(req, res, next) => {
    try{    
        const commentId = Number(req.params.commentId);
        const {...comment} = req.body;
        assert(comment, updateComment);
        const data = await commentService.updateComment(commentId, comment);
        return res.status(200).json(data);
    } catch(error){
        next(error);
    }
});

export default commentController;