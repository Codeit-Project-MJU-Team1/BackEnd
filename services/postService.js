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
    //Badge를 위한 streak 설정
    //오늘, 어제 날짜에 이미 등록된 post가 있는지 확인
    const now = new Date();
    const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1); //어제 00:00:00
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // 오늘 00:00:00
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1); // 내일 00:00:00
    const todayPost = await postRepository.findByDate(groupId, today, tomorrow);
    let badge = undefined;
    if(!todayPost){
        const yesterdayPost = await postRepository.findByDate(groupId, yesterday, today);
        let streak = group.postStreak;
        if(yesterdayPost){
            //streak 1 증가
            streak += 1;
            await groupRepository.update(groupId, {"postStreak" : streak});
            //배지 update
            if(streak == 10 && !group.badges.includes("streak_10")){
                badge = "streak_10";
                group.badges.push(badge);
                await groupRepository.update(groupId, {"badges" : group.badges});
            }
        }
        else{
            //streak 1으로 초기화
            await groupRepository.update(groupId, {"postStreak" : 1});
        }
    }
    const {postPassword, groupPassword, ...data} = post;
    data.password = postPassword;
    const createdPost = await postRepository.save(groupId, data);
    if(badge){
        createdPost.badge = badge;
    }
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
    await postRepository.remove(postId);
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
    
    // groupId를 가져와야됨

    const updatedPost = await postRepository.findById(postId);
    const updatedGroup = await groupRepository.findById(updatedPost.groupId);
    if (updatedPost.likeCount >= 10000 && !updatedGroup.badges.includes("postLike_10000")) {
        updatedGroup.badges.push("postLike_10000");
        await groupRepository.update(updatedGroup.id, {"badges" : updatedGroup.badges});
    }
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

