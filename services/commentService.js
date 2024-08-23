import postRepository from '../repositories/postRepository.js';
import commentRepository from '../repositories/commentRepository.js';
import {ForbiddenError, NotFoundError , UnauthorizedError} from '../config/error.js';

async function createComment(postId, data) {
    const post = await postRepository.findById(postId);
    console.log(post);
    if(!post){
        throw new NotFoundError("게시글이 존재하지 않습니다");
    }
    const comment = await commentRepository.save(postId, data);
    return filterSensitiveUserData(comment);
}

function filterSensitiveUserData(comment){
    const {password, ...rest} = comment;
    return rest;
}

export default{
    createComment,
}