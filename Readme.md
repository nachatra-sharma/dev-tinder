# Routes

## auth

- POST /signup
- POST /login
- POST /logout

## profile

- GET /profile/view
- POST /profile/edit
- POST /profile/password

## Connection Request

- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## User Router

- GET /user/connections -----> accepted
- GET /user/requests ----> interested
- GET /user/feed
