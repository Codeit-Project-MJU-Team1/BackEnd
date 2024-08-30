export const GROUPS = [
    {
        "name": "첫 번째 그룹",
        "password": "password123",
        "imageUrl": "http://example.com/image1.jpg",
        "isPublic": true,
        "likeCount": 10,
        "badges": ["badge1"],
        "postCount": 0,
        "introduction": "첫 번째 그룹에 오신 것을 환영합니다."
    },
    {
        "name": "두 번째 그룹",
        "password": "password456",
        "imageUrl": "http://example.com/image2.jpg",
        "isPublic": false,
        "likeCount": 25,
        "badges": ["badge2", "badge4"],
        "postCount": 0,
        "introduction": "두 번째 그룹에 대해 알아보세요."
    },
    {
        "name": "세 번째 그룹",
        "password": "password789",
        "imageUrl": "http://example.com/image3.jpg",
        "isPublic": true,
        "likeCount": 15,
        "badges": ["badge1", "badge3", "badge5"],
        "postCount": 0,
        "introduction": "세 번째 그룹의 활동을 확인하세요."
    },
    {
        "name": "네 번째 그룹",
        "password": "password101",
        "imageUrl": "http://example.com/image4.jpg",
        "isPublic": false,
        "likeCount": 30,
        "badges": ["badge2", "badge3"],
        "postCount": 0,
        "introduction": "네 번째 그룹에 대한 정보를 알아보세요."
    },
    {
        "name": "다섯 번째 그룹",
        "password": "password202",
        "imageUrl": "http://example.com/image5.jpg",
        "isPublic": true,
        "likeCount": 5,
        "badges": ["badge1", "badge2", "badge3", "badge4", "badge5"],
        "postCount": 0,
        "introduction": "다섯 번째 그룹의 다양한 활동에 참여하세요."
    }
];

export const POSTS = [
    {
        nickname: "사용자1",
        title: "첫 번째 포스트",
        content: "이것은 첫 번째 포스트의 내용입니다.",
        postPassword: "password1",
        groupPassword: "groupPassword1",
        imageUrl: "http://example.com/image1.jpg",
        tags: ["첫 번째", "포스트"],
        location: "서울",
        moment: new Date(),
        isPublic: true,
        likeCount: 25,
        commentCount: 10,
    },
    {
        nickname: "사용자2",
        title: "두 번째 포스트",
        content: "이것은 두 번째 포스트의 내용입니다.",
        postPassword: "password2",
        groupPassword: "groupPassword2",
        imageUrl: "http://example.com/image2.jpg",
        tags: ["두 번째", "포스트"],
        location: "부산",
        moment: new Date(),
        isPublic: false,
        likeCount: 10,
        commentCount: 3,
    },
    {
        nickname: "사용자3",
        title: "세 번째 포스트",
        content: "이것은 세 번째 포스트의 내용입니다.",
        postPassword: "password3",
        groupPassword: "groupPassword3",
        imageUrl: "http://example.com/image3.jpg",
        tags: ["세 번째", "포스트"],
        location: "대구",
        moment: new Date(),
        isPublic: true,
        likeCount: 512,
        commentCount: 100,
    },
    {
        nickname: "사용자4",
        title: "네 번째 포스트",
        content: "이것은 네 번째 포스트의 내용입니다.",
        postPassword: "password4",
        groupPassword: "groupPassword4",
        imageUrl: "http://example.com/image4.jpg",
        tags: ["네 번째", "포스트"],
        location: "인천",
        moment: new Date(),
        isPublic: false,
        likeCount: 5,
        commentCount: 1,
    },
    {
        nickname: "사용자5",
        title: "다섯 번째 포스트",
        content: "이것은 다섯 번째 포스트의 내용입니다.",
        postPassword: "password5",
        groupPassword: "groupPassword5",
        imageUrl: "http://example.com/image5.jpg",
        tags: ["다섯 번째", "포스트"],
        location: "광주",
        moment: new Date(),
        isPublic: true,
        likeCount: 1222,
        commentCount: 219,
    }
];

export const COMMENTS = [
    {
        "nickname": "사용자1",
        "content": "이것은 첫 번째 댓글의 내용입니다",
        "password": "password1",
    },
    {
        "nickname": "사용자2",
        "content": "이것은 두 번째 댓글의 내용입니다",
        "password": "password2",
    },
    {
        "nickname": "사용자3",
        "content": "이것은 세 번째 댓글의 내용입니다",
        "password": "password3",
    },
    {
        "nickname": "사용자4",
        "content": "이것은 네 번째 댓글의 내용입니다",
        "password": "password4",
    },
    {
        "nickname": "사용자5",
        "content": "이것은 다섯 번째 댓글의 내용입니다",
        "password": "password5",
    },
];