import groupRepository from '../repositories/groupRepository.js';

async function createGroup(group){
    const createdGroup = await groupRepository.save(group);
    return filterSensitiveUserData(createdGroup);
}

async function getGroups(params) {
    const { page = 0, pageSize = 10, sortBy, keyword = "", isPublic = "true"} = params;
    const limit = Number(pageSize);
    const offset = Number(page) * limit;
    if(sortBy === 'mostBadge'){
        return await groupRepository.getGroupsByBadge(offset,limit,keyword,Boolean(isPublic));
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
        return await groupRepository.getGroups(offset, limit, orderBy, keyword, Boolean(isPublic)); 
    }
}

function filterSensitiveUserData(group){
    const {password, ...rest} = group;
    return rest;
}

export default {
    createGroup,
    getGroups,
}