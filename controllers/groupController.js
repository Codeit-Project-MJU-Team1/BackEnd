import express from 'express';
import { assert } from 'superstruct';
import { createGroup } from '../struct.js';
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


export default groupController;