import groupRepository from '../repositories/groupRepository.js';
import {ForbiddenError, NotFoundError , UnauthorizedError} from '../config/error.js';

async function createGroup(group){
    const createdGroup = await groupRepository.save(group);
    return filterSensitiveUserData(createdGroup);
}

function filterSensitiveUserData(group){
    const {password, ...rest} = group;
    return rest;
}

async function readGroup(groupId) {
    const group = await groupRepository.findById(groupId);
    if(!group){
        throw new NotFoundError("존재하지 않습니다");
    }
    return filterSensitiveUserData(await groupRepository.findById(groupId));
}

async function verifyPassword(groupId, password){
    const group = await groupRepository.findById(groupId);
    if(!group){
        throw new NotFoundError("존재하지 않습니다");
    }
    if(group.password !== password){
        throw new UnauthorizedError("비밀번호가 틀렸습니다");
    }
    return { message : "비밀번호가 확인되었습니다." };
}

async function like(groupId){
    const group = await groupRepository.findById(groupId);
    if(!group){
        throw new NotFoundError("존재하지 않습니다");
    }
    await groupRepository.like(groupId);
    return { message : "그룹 공감하기 성공" };
}

async function isPublic(groupId) {
    const group = await groupRepository.findById(groupId);
    if(!group){
        throw new NotFoundError("존재하지 않습니다.");
    }
    return { id : groupId, isPublic : group.isPublic };
}

async function getGroups(params) {
    const { page = 0, pageSize = 10, sortBy, keyword = "", isPublic = "true"} = params;
    const limit = Number(pageSize);
    const offset = Number(page) * limit;
    if(sortBy === 'mostBadge'){
        return await groupRepository.getGroupsByBadge(offset,limit,keyword,JSON.parse(isPublic));
    }
    else{
        let orderBy;
        switch(sortBy){
            case 'mostPosted' :
                orderBy = { postCount : 'desc' };
                break;
            case 'mostLiked' :
                orderBy = { likeCount : 'desc' };
                break;
            default:
                orderBy = { createdAt : 'desc' };
                break;
        }
        return await groupRepository.getGroups(offset, limit, orderBy, keyword, JSON.parse(isPublic)); 
    }
}

async function deleteGroup(groupId, password) {

    const deletedGroup = await groupRepository.findById(groupId); 
    if (!deletedGroup) {
        throw new NotFoundError('존재하지 않습니다');
    }
    if(deletedGroup.password !== password){
        throw new ForbiddenError('비밀번호가 틀렸습니다');
    }

    await groupRepository.remove(groupId);
    return { message: '그룹 삭제 성공' };
}

async function updateGroup(groupId, data){

    const updatedGroup = await groupRepository.findById(groupId); 
    if (!updatedGroup) {
        throw new NotFoundError('존재하지 않습니다');
    }
    if(updatedGroup.password !== data.password){
        throw new ForbiddenError('비밀번호가 틀렸습니다');
    }
    
    const result = await groupRepository.update(groupId, data);
    return result;
}

export default {
    deleteGroup, 
    updateGroup,
    createGroup,
    getGroups,
    readGroup,
    verifyPassword,
    like,
    isPublic,
}