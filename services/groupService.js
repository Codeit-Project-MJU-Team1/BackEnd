import groupRepository from '../repositories/groupRepository.js';

async function createGroup(group){
    const createdGroup = await groupRepository.save(group);
    return filterSensitiveUserData(createdGroup);
}

function filterSensitiveUserData(group){
    const {password, ...rest} = group;
    return rest;
}

class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ForbiddenError';
        this.code = 403; // HTTP 상태 코드
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        this.code = 404; // HTTP 상태 코드
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

// 파라미터 data에는 지금 req.body가 들어있음
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
    createGroup, deleteGroup, updateGroup,
}