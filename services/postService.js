import postRepository from '../repositories/postRepository.js';
import groupRepository from '../repositories/groupRepository.js';
import {ForbiddenError, NotFoundError , UnauthorizedError} from '../config/error.js';

async function createPost(groupId, post){

    const newPost = await groupRepository.findById(groupId); 
    
    if (!newPost) {
        throw new NotFoundError('존재하지 않습니다');
    }

    if(newPost.password !== post.groupPassword){
        throw new ForbiddenError('비밀번호가 틀렸습니다');
    }
    
    console.log(post);
    const {postPassword, groupPassword, ...data} = post;
    data.password = postPassword;
    const createdPost = await postRepository.save(groupId, data);
    return filterSensitiveUserData(createdPost);
}

function filterSensitiveUserData(post){ 
    const {postPassword, groupPassword, ...rest} = post;
    return rest;
}

export default {
    createPost,
}

