# Blog API

![Description](./databaseDesign/mermaid-diagram-2024-07-24-135918.png)
[Technology](#technology)
[Tech Stack](#tech-stack)
[API FEATURES](#api-features)
[To Work on](#to-work-on)

## Technology

- npm i jsonwebtoken (jwt.io)
- npm i multer@1.4.5-lts.1
- npm i cloudinary
- npm i multer-storage-cloudinary@4.0.0

## Tech Stack

server: Node, Express, MongoDB, Mongoose, JWT

## Authentication Flow

- User logs in -> generateToken creates a token
- User makes a request with the token in the header
- Middleware uses getTokenFromHeader to extract the token
- Middleware uses verifyToken to validate the token
- If the token is valid, the middleware attaches the user information to the request object (req.user)
- The request proceeds to the intended route handler
- The route handler can now access the authenticated user's information via req.user
- The route handler processes the request and sends a response
- For subsequent requests, the client continues to include the token in the header

## API FEATURES

- Authentication and Authorization
- Post CRUD operations
- Comment Functionality
- System blocking user if inactive for 30 days
- Admin can block user
- A user can block different users
- A user who blocked another user cannot see his/her posts
- Last date a post was created
- Check if user is active or not
- Check last date a user was active
- Changing user award base on number of posts created by the user
- A user can follow and unfollow another user
- Get following and followers count
- Get total viewer count
- Get posts created count
- Get blocked count
- Get all users who view someone's profile
- Admin can unblock a blocked user
- Uppdate password
- Profile photo uploaded
- A user can close his/her account

## API Docs

<!-- /api/v1/users/ -->

- [API Authentication](#api-authentication)

  - [Register a new API Client](#register-a-new-api-client)
  - [Login](#login)

- [users](#users-endpoint)
  - [Get My Profile](#get-my-profile)
  - [Get All Users](#get-all-users)
  - [View User Profile Count](#view-user-profile-count)
  - [Get Followers Count](#get-followers-count)
  - [Follow/Unfollow a User](#follow-unfollow-a-user)
  - [Who Viewed My Profile](#who-viewed-my-profile)
  - [Block/Unblock User](#block-unblock-user)
  - [Admin Block/Unblock User](#admin-block-unblock-user)
  - [Update User Profile](#update-user-profile)
  - [Update User Password](#update-user-password)
  - [Upload Profile Photo](#upload-profile-photo)
  - [Delete User Account](#delete-user-account)

## Api Authentication

some endpoints may require authentication. for example, to create a create/delete/update post, you need to register your API client and obtain an access token.

**Example**:

- `Authorization: Your Token`

## Register a new API Client

```http
POST/api/v1/users/register
```

## Login

```http
POST/api/v1/users/login
```

The request body needs to be in JSON format

## Get All Users

```http
GET /api/v1/users/
```

Retrieve a list of all registered users. This endpoint requires authentication and, in some cases, admin privileges.

```json
{
    "status": "Success",              // Status of the request
    "data": [
        {
            "comments": [],                 // comments IDs associated with the user
            "_id": "",                      // Unique identifier for the user
            "firstname": "",                // User's first name
            "lastname": "",                 // User's last name
            "email": "",                    // User's email address
            "password": "",                 // User's hashed password
            "isBlocked": false,             // Boolean indicating if the user is blocked
            "isAdmin": false,               // Boolean indicating if the user is an admin
            "viewedBy": [],                 // Array of user IDs who viewed this profile
            "followers": [],                // Array of follower IDs
            "following": [],                // Array of following IDs
            "posts": []                     // Array of post IDs created by the user,
            "blocked": [],                  // Array of user IDs blocked by this user
            "userAward": "Bronze",          // User's award level
            "createdAt": "",                // Timestamp of user creation
            "updatedAt": "",                // Timestamp of last update
            "__v": number,                  // Mongoose version key
            "fullname": "",                 // User's full name
            "initials": "",                 // User's initials
            "postCount": number,            // Number of posts created by the user
            "followersCount": 0,            // Number of followers the user has
            "followingCount": 0,            // No of users the user is following
            "viewersCount": 0,              // No of users who viewed the user's profile
            "blockedCount": 0,              // Number of users blocked by the user
            "id": ""                        // User's unique identifier
        }
    ]
}

```

## To Work on

- uploading of images should be optional: for profile, to post and to update post
