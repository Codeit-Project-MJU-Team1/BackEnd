import express from 'express';
import { assert } from 'superstruct';
import { createGroup, deleteGroup, updateGroup, verifyPassword } from '../struct/groupStruct.js';
import { createPost } from '../struct/postStruct.js';
import groupService from '../services/groupService.js';
import postService from '../services/postService.js';

const groupController = express.Router();

groupController.post('/', async(req, res, next) => {
    try{
        assert(req.body, createGroup);
        const group = await groupService.createGroup(req.body);
        return res.status(201).json(group);
    } catch (error){
        next(error);
    }
});

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

groupController.get('/', async(req, res, next) => {
    try{
        const data = await groupService.getGroups(req.query);
        res.status(200).send(data);
    } catch(error){
        next(error);
    }
});

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

groupController.get('/:groupId', async(req, res, next) =>{
    try{
        const groupId = Number(req.params.groupId);
        const data = await groupService.readGroup(groupId);
        return res.status(200).json(data);
    } catch (error){
        next(error);
    }
});

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

groupController.post('/:groupId/like', async(req,res,next) => {
    try{
        const groupId = Number(req.params.groupId);
        const data = await groupService.like(groupId);
        return res.status(200).json(data);
    } catch (error){
        next(error);
    }
});

groupController.get('/:groupId/is-public', async(req, res, next) => {
    try{
        const groupId = Number(req.params.groupId);
        const data = await groupService.isPublic(groupId);
        return res.status(200).json(data);
    } catch (error){
        next(error);
    }
});

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

// postController.post('/', async(req, res, next) => {
//     try{
//         assert(req.body, createPost); // 검증 req.body랑 createPost랑 형식이 일치하는지
//         const groupId = Number(req.params.groupId);
//         const post = await postService.createPost(req.body, groupId);
//         return res.status(201).json(post);
//     } catch (error){
//         next(error);
//     }
// });

export default groupController;