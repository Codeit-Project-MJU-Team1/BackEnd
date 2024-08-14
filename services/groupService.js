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
        this.statusCode = 403; // HTTP 상태 코드
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404; // HTTP 상태 코드
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

export default {
    createGroup, deleteGroup,
}