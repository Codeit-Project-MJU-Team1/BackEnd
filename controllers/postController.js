import express from 'express';
import { assert } from 'superstruct';
import { updatePost , deletePost, verifyPassword} from '../struct/postStruct.js';
import { createComment } from '../struct/commentStruct.js';
import postService from '../services/postService.js';
import commentService from '../services/commentService.js';

const postController = express.Router();

// 게시글 수정
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

// 게시글 삭제
postController.delete('/:postId', async(req, res, next) => {
    try{
        const postId = Number(req.params.postId);
        assert(req.body, deletePost);
        const data = await postService.deletePost(postId, req.body.postPassword);
        return res.status(200).send(data);
    } catch(error){
        console.log(error);
        next(error);
    }
})

// 게시글 공감하기
postController.post('/:postId/like', async(req, res, next) => {
    try{
        const postId = Number(req.params.postId);
        const data = await postService.likePost(postId);
        return res.status(200).send(data);
    } catch(error){
        next(error);
    }
})

// 게시글 조회 권한 확인
postController.post('/:postId/verify-password', async(req, res, next) =>{
    try{
        assert(req.body, verifyPassword);
        const postId = Number(req.params.postId);
        const data = await postService.verifyPassword(postId, req.body.password);
        return res.status(200).json(data);
    } catch (error){
        next(error);
    }
});

// 게시글 상세 정보 조회
postController.get('/:postId', async(req, res, next) => {
    try{
        const postId = Number(req.params.postId);
        const data = await postService.readPost(postId);
        return res.status(200).json(data);
    } catch (error){
        next(error);
    }
});

// 게시글 공개 여부 확인
postController.get('/:postId/is-public', async(req, res, next) => {
    try{
        const postId = Number(req.params.postId);
        const data = await postService.isPublic(postId);
        return res.status(200).json(data);
    } catch (error){
        next(error);
    }
});

// 댓글 등록
postController.post('/:postId/comments', async(req, res, next) => {
    try{
        const postId = Number(req.params.postId);
        assert(req.body, createComment);
        const data = await commentService.createComment(postId, req.body);
        return res.status(201).json(data);
    } catch (error){
        next(error);
    }
})

// 댓글 목록 조회
postController.get('/:postId/comments', async(req, res, next) => {
    try{
        const postId = Number(req.params.postId);
        const data = await commentService.getComment(postId, req.query);
        res.status(200).send(data);
    } catch(error){
        next(error);
    }
})

export default postController;