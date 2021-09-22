# Welcome to DayPost!

    -It's a collaborative platform for news
    -Has a social media style, where users can follow other users, like and comment their posts.
    -Posts consist on:
        -Title
        -Description
        -Source
        -Topic
        -Image(optional)

# Database structure

_Users table:_

- id
- email
- password
- accName
- userName
- avatar
- portrait
- biography
- active
- deleted
- role
- registrationCode
- recoverCode
- createdAt
- modifiedAt

_Posts table:_

- id
- idUser
- title
- description
- source
- topic
- createdAt
- modifiedAt

_Photos table:_

- id
- name
- idPost
- createdAt

_Likes table:_

- id
- idUser
- idPost

_Comments table:_

- id
- idUser
- idPost
- content
- createdAt
- modifiedAt

# Endpoints

## User endpoints

> Blockquote -Get /users
