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

## API Documentation
(https://documenter.getpostman.com/view/29208473/2sAXjF7E6s)

## To Work on

- uploading of images should be optional: for profile, to post and to update post
