import { faker } from '@faker-js/faker';

interface User {
    username: string;
    email: string;
    password: string;
}

interface Article {
    title: string;
    description: string;
    body: string;
}

function createUser(): User {
    return {
        username: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    }
}

function createArticle(): Article {
    return {
        title: faker.lorem.word(),
        description: faker.lorem.sentence(),
        body: faker.lorem.paragraph(),
    }
}

const articleToShow = {
    "slug": "newer-header",
    "title": "Newer Header",
    "description": "Sunt caput una derelinquo verumtamen bos trucido cometes deripio cognomen.",
    "body": "Dolorum asper ut neque balbus vel uterque. Tenax utrimque canis coaegresco curo labore nihil enim collum recusandae. Delectus amiculum adsum apparatus tantillus.",
    "tagList": [],
    "category": "general",
    "visibility": "public",
    "allowComments": true,
    "cover": "",
    "createdAt": "2026-11-18T09:23:49.081Z",
    "updatedAt": "2026-11-18T09:23:49.081Z",
    "favorited": false,
    "favoritesCount": 0,
    "author": {
        "username": "Elda",
        "bio": "",
        "image": "/avatar-placeholder.svg",
        "following": false
    }
}

export { createUser, createArticle, articleToShow };