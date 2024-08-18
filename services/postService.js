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

async function readPost(postId) {
    const post = await postRepository.findById(postId);
    if(!post){
        throw new NotFoundError("존재하지 않습니다");
    }
    return filterSensitiveUserData(await postRepository.findById(postId));
}

function filterSensitiveUserData(post){ 
    const {postPassword, groupPassword, ...rest} = post;
    return rest;
}

async function verifyPassword(postId, password){
    const post = await postRepository.findById(postId);
    if(!post){
        throw new NotFoundError("존재하지 않습니다");
    }
    if(post.password !== password){
        console.log(post.password);
        console.log(password);
        throw new UnauthorizedError("비밀번호가 틀렸습니다");
    }
    return { message : "비밀번호가 확인되었습니다." };
}

export default {
    createPost, readPost, verifyPassword,
}

