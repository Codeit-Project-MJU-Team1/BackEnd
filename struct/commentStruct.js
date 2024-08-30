import * as s from 'superstruct';

export const createComment = s.object({
    nickname : s.size(s.string(), 1, 30),
    content : s.string(),
    password : s.size(s.string(), 1, 30),
});

export const updateComment = s.object({
    nickname : s.size(s.string(), 1, 30),
    content: s.size(s.string(), 1, 300),
    commentPassword: s.size(s.string(), 1, 30),
});

export const deleteComment = s.object({
    password : s.size(s.string(), 1, 30),
});