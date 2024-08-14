import express from 'express';
import { assert } from 'superstruct';
import { createGroup, verifyPassword } from '../struct.js';
import groupService from '../services/groupService.js';

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

groupController.get('/', async(req, res, next) => {
    try{
        const data = await groupService.getGroups(req.query);
        res.status(200).send(data);
    } catch(error){
        next(error);
    }
})

groupController.get('/:groupId', async(req, res, next) =>{
    try{
        const groupId = Number(req.params.groupId);
        const data = await groupService.readGroup(groupId);
        return res.status(200).json(data);
    } catch (error){
        next(error);
    }
})

groupController.post('/:groupId/verify-password', async(req, res, next) => {
    try{
        assert(req.body, verifyPassword);
        const groupId = Number(req.params.groupId);
        const data = await groupService.verifyPassword(groupId, req.body.password);
        return res.status(200).json(data);
    } catch (error){
        next(error);
    }
})

groupController.post('/:groupId/like', async(req,res,next) => {
    try{
        const groupId = Number(req.params.groupId);
        const data = await groupService.like(groupId);
        return res.status(200).json(data);
    } catch (error){
        next(error);
    }
})

export default groupController;