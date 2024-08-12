import groupRepository from '../repositories/groupRepository.js';

async function createGroup(group){
    const createdGroup = await groupRepository.save(group);
    return filterSensitiveUserData(createdGroup);
}

function filterSensitiveUserData(group){
    const {password, ...rest} = group;
    return rest;
}

export default {
    createGroup,
}