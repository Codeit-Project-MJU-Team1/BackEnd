import postRepository from '../repositories/postRepository.js';
import {ForbiddenError, NotFoundError , UnauthorizedError} from '../config/error.js';

async function createPost(post, groupId){

    const createdPost = await postRepository.save(post, groupId);
    return filterSensitiveUserData(createdPost);
}

function filterSensitiveUserData(post){
    const {postPassword, groupPassword, ...rest} = post;
    return rest;
}

export default {
    createPost,
}