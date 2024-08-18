import * as s from 'superstruct';

export const createPost = s.object({
    nickname : s.size(s.string(), 1, 30),
    title: s.size(s.string(), 1, 30),
    content: s.size(s.string(), 1, 300),
    postPassword: s.size(s.string(), 1, 30),
    groupPassword: s.size(s.string(), 1, 30),
    imageUrl : s.string(),
    tags: s.array(s.size(s.string(), 1, 30)),
    location: s.size(s.string(), 1, 30),
    moment: s.date(),
    isPublic: s.boolean(),
});

export const updatePost = s.object({
    nickname : s.size(s.string(), 1, 30),
    title: s.size(s.string(), 1, 30),
    content: s.size(s.string(), 1, 300),
    postPassword: s.size(s.string(), 1, 30),
    imageUrl : s.string(),
    tags: s.array(s.size(s.string(), 1, 30)),
    location: s.size(s.string(), 1, 30),
    moment: s.date(),
    isPublic: s.boolean(),
});

export const deletePost = s.object({
    postPassword: s.size(s.string(), 1, 30),
});

export const verifyPassword = s.object({
    password : s.size(s.string(), 1, 30),
});