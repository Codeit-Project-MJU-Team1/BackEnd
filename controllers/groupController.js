import express from 'express';
import { assert } from 'superstruct';
import { createGroup, deleteGroup, updateGroup } from '../struct.js';
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

groupController.delete('/:groupId', async (req, res, next) => {
    try {
        assert(req.body, deleteGroup);
        const groupId = Number(req.params.groupId);
        const password = req.body.password;
        const data = await groupService.deleteGroup(groupId, password);
        return res.sendStatus(200).json(data);
    } catch (error) {
        next(error);
    }
});

groupController.put('/:groupId', async (req, res, next) => {
    try {
        console.log('Request body:', req.body);

        assert(req.body, updateGroup);
        const groupId = Number(req.params.groupId);
        const data = await groupService.updateGroup(groupId, req.body);
        
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
});

export default groupController;