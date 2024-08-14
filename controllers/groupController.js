import express from 'express';
import { assert } from 'superstruct';
import { createGroup, deleteGroup } from '../struct.js';
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

groupController.delete('/:groudId', async (req, res, next) => {
    try {
        assert(req.body, deleteGroup);
        const groupId = Number(req.params.groudId);
        const password = req.body.password;
        const data = await groupService.deleteGroup(groupId, password);
        return res.sendStatus(204).json(data)
    } catch (error) {
        next(error);
    }
});

groupController.put('/:groudId', async (req, res, next) => {
    try {
        assert(req.body, updateGroup);
        const groudId = Number(req.params.groudId);
        const { name, password, imageUrl, isPublic, introduction } = req.body;
        const data = await groupService.updateGroup(groudId, name, password, imageUrl, isPublic, introduction);
        return res.sen
        
    } catch (error) {
        next(error);
    }
});

export default groupController;