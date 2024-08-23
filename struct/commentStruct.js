import * as s from 'superstruct';

export const createComment = s.object({
    nickname : s.size(s.string(), 1, 30),
    content : s.string(),
    password : s.size(s.string(), 1, 30),
});