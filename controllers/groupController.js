import express from 'express';
import { assert } from 'superstruct';
import { createGroup, deleteGroup, updateGroup, verifyPassword } from '../struct/groupStruct.js';
import { createPost } from '../struct/postStruct.js';
import groupService from '../services/groupService.js';
import postService from '../services/postService.js';

const groupController = express.Router();

// 그룹 생성
groupController.post('/', async(req, res, next) => {
    try{
        assert(req.body, createGroup);
        const group = await groupService.createGroup(req.body);
        return res.status(201).json(group);
    } catch (error){
        next(error);
    }
});

// 그룹 삭제
groupController.delete('/:groupId', async (req, res, next) => {
    try {
        assert(req.body, deleteGroup);
        const groupId = Number(req.params.groupId);
        const password = req.body.password;
        const data = await groupService.deleteGroup(groupId, password);
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
});

// 그룹 목록 조회
groupController.get('/', async(req, res, next) => {
    try{
        const data = await groupService.getGroups(req.query);
        res.status(200).send(data);
    } catch(error){
        next(error);
    }
});

// 그룹 수정
groupController.put('/:groupId', async (req, res, next) => {
    try {
        assert(req.body, updateGroup);
        const groupId = Number(req.params.groupId);
        const data = await groupService.updateGroup(groupId, req.body);
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
});

// 그룹 상세 정보 조회
groupController.get('/:groupId', async(req, res, next) =>{
    try{
        const groupId = Number(req.params.groupId);
        const data = await groupService.readGroup(groupId);
        return res.status(200).json(data);
    } catch (error){
        next(error);
    }
});

// 그룹 조회 권환 확인
groupController.post('/:groupId/verify-password', async(req, res, next) => {
    try{
        assert(req.body, verifyPassword);
        const groupId = Number(req.params.groupId);
        const data = await groupService.verifyPassword(groupId, req.body.password);
        return res.status(200).json(data);
    } catch (error){
        next(error);
    }
});

// 그룹 공감하기
groupController.post('/:groupId/like', async(req,res,next) => {
    try{
        const groupId = Number(req.params.groupId);
        const data = await groupService.like(groupId);
        return res.status(200).json(data);
    } catch (error){
        next(error);
    }
});

// 그룹 공개 여부 확인
groupController.get('/:groupId/is-public', async(req, res, next) => {
    try{
        const groupId = Number(req.params.groupId);
        const data = await groupService.isPublic(groupId);
        return res.status(200).json(data);
    } catch (error){
        next(error);
    }
});

// 게시글 등록
groupController.post('/:groupId/posts', async(req, res, next) => {
    try{
        const groupId = Number(req.params.groupId);
        const {moment , ...rest} = req.body;
        rest.moment = new Date(moment);
        assert(rest, createPost);
        const data = await postService.createPost(groupId, rest);
        return res.status(200).json(data);
    } catch(error){
        next(error);
    }
});

// 게시글 상세 정보 조회
groupController.get('/:groupId/posts/:postId', async(req, res, next) =>{
    try{
        const postId = Number(req.params.postId);
        const data = await postService.readPost(postId);
        return res.status(200).json(data);
    } catch (error){
        next(error);
    }
});

// 게시글 조회 권한 확인
groupController.post('/:groupId/posts/:postId/verify-password', async(req, res, next) =>{
    try{
        assert(req.body, verifyPassword);
        const postId = Number(req.params.postId);
        const data = await postService.verifyPassword(postId, req.body.password);
        return res.status(200).json(data);
    } catch (error){
        next(error);
    }
});

export default groupController;