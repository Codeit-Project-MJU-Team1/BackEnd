import * as s from 'superstruct';

export const createGroup = s.object({
    name : s.size(s.string(), 1, 30),
    password : s.size(s.string(), 1, 30),
    imageUrl : s.string(),
    isPublic : s.boolean(),
    introduction: s.size(s.string(),1,100),  
});

export const verifyPassword = s.object({
    password : s.size(s.string(), 1, 30),
});

