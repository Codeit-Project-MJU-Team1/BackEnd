import postRepository from '../repositories/postRepository.js';
import groupRepository from '../repositories/groupRepository.js';
import {ForbiddenError, NotFoundError , UnauthorizedError} from '../config/error.js';

async function createPost(groupId, post){
    const group = await groupRepository.findById(groupId); 
    if (!group) {
        throw new NotFoundError('존재하지 않습니다');
    }
    if(group.password !== post.groupPassword){
        throw new ForbiddenError('비밀번호가 틀렸습니다');
    }
    const {postPassword, groupPassword, ...data} = post;
    data.password = postPassword;
    const createdPost = await postRepository.save(groupId, data);
    await groupRepository.update(groupId, {postCount : group.postCount + 1});
    return filterSensitiveUserData(createdPost);
}

async function readPost(postId) {
    const post = await postRepository.findById(postId);
    if(!post){
        throw new NotFoundError("존재하지 않습니다");
    }
    return filterSensitiveUserData(await postRepository.findById(postId));
}

async function updatePost(postId, post){
    const existedPost = await postRepository.findById(postId);
    if(!existedPost){
        throw new NotFoundError("존재하지 않습니다");
    }
    if(existedPost.password !== post.postPassword){
        throw new ForbiddenError("비밀번호가 틀렸습니다");
    }
    const { postPassword , ...data } = post;
    data.password = postPassword;
    return await postRepository.update(postId, data);
}

async function deletePost(postId, postPassword) {
    const existedPost = await postRepository.findById(postId);
    if(!existedPost){
        throw new NotFoundError("존재하지 않습니다");
    }
    if(existedPost.password !== postPassword){
        throw new ForbiddenError("비밀번호가 틀렸습니다");
    }
    const group = await groupRepository.findById(existedPost.groupId);
    await postRepository.remove(postId);
    await groupRepository.update(group.id, {postCount : group.postCount - 1});
    return { message : "게시글 삭제 성공" };
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

async function likePost(postId) {
    const existedPost = await postRepository.findById(postId);
    if(!existedPost){
        throw new NotFoundError("존재하지 않습니다");
    }
    await postRepository.like(postId);
    return { message : "게시글 공감하기 성공" };
}

async function isPublic(postId) {
    const post = await postRepository.findById(postId);
    if(!post){
        throw new NotFoundError("존재하지 않습니다.");
    }
    return { id : postId, isPublic : post.isPublic };
}

async function getPosts(groupId, params) {
    const { page = 0, pageSize = 10, sortBy, keyword = "", isPublic = "true"} = params;
    const limit = Number(pageSize);
    const offset = Number(page) * limit;
    let orderBy;
    switch (sortBy) {
        case 'mostCommented':
            orderBy = { commentCount: 'desc' };
            break;
        case 'mostLiked':
            orderBy = { likeCount: 'desc' };
            break;
        case 'latest':
        default:
            orderBy = { createdAt: 'desc' };
            break;
    }
    return await postRepository.getPosts(offset, limit, orderBy, keyword, JSON.parse(isPublic), groupId); 
}

export default {
    updatePost, deletePost, createPost, readPost, 
    verifyPassword, isPublic, getPosts, likePost,
}

