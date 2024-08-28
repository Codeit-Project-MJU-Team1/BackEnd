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

async function getComment(postId, params) {
    const { page = 0, pageSize = 10} = params;
    const limit = Number(pageSize);
    const offset = Number(page) * limit;
    return await commentRepository.getComments(offset, limit, postId); 
}

async function updateComment(commentId, comment){
    const existedComment = await commentRepository.findById(commentId);
    if(!existedComment){
        throw new NotFoundError("존재하지 않습니다");
    }
    if(existedComment.password !== comment.commentPassword){
        throw new ForbiddenError("비밀번호가 틀렸습니다");
    }
    const { commentPassword , ...data } = comment;
    data.password = commentPassword;
    return await commentRepository.update(commentId, data);
}

async function deleteComment(commentId, commentPassword) {
    const existedComment = await commentRepository.findById(commentId);
    if(!existedComment){
        throw new NotFoundError("존재하지 않습니다");
    }
    if(existedComment.password !== commentPassword){
        console.log(existedComment.password);
        console.log(commentPassword);
        throw new ForbiddenError("비밀번호가 틀렸습니다");
    }
    await commentRepository.remove(commentId);
    return { message : "게시글 삭제 성공" };
}

export default {
    createComment, getComment, updateComment, deleteComment
}