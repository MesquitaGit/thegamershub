# THE GAMER'S HUB

## DESCRIPTION

A platform to search games, in which you can sign up and login.

If you are in the main page, while logged out, you are able to view and search the games database.

While logged in, if you are normal user:

- Add games to your favourites list
- Access and edit your profile

## User Stories

- 404 - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- 500 - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- homepage - As a user I want to be able to access the homepage and filter by type of game, log in and sign up.
- sign up - As a normal user or game developer user I want to sign up on the web page so that I can add favorite games to my list.
- login - As a user I want to be able to log in on the web page so that I can get back to my account
- logout - As a user I want to be able to log out from the web page so that I can make sure no one will access my account
- favorite list - As a user I want to see the list of my favorite and delete them.
- edit user - As a user I want to be able to edit my profile.
- result - As a user I want to see the list of games and filter by my preferences.
- game listing - As a user I want to see more details of the game, be able to leave a review and rating, and add it to my favourites list.

## Server Routes (Back-end)

| Method |           Route            |                                                              Description |                                           Request - Body |
| ------ | :------------------------: | -----------------------------------------------------------------------: | -------------------------------------------------------: |
| GET    |             /              |                                Main page route. Renders home index view. |
| GET    |           /login           |                                                 Renders login form view. |
| POST   |           /login           |                                     Sends Login form data to the server. |                                      { email, password } |
| GET    |          /signup           |                                                Renders signup form view. |
| POST   |          /signup           |             Sends Sign Up info to the server and creates user in the DB. |                                      { email, password } |
| GET    |   /private/edit-profile    |                           Private route. Renders edit-profile form view. |
| PUT    |   /private/edit-profile    | Private route. Sends edit-profile info to server and updates user in DB. | { email, password, [firstName], [lastName], [imageUrl] } |
| GET    |     /private/favorites     |                                Private route. Render the favorites view. |
| POST   |     /private/favorites     |                 Private route. Adds a new favorite for the current user. |                            { name, genre, description, } |
| DELETE | /private/favorites/:gameId |      Private route. Deletes the existing favorite from the current user. |
| GET    |           /games           |                                                 Renders games-list view. |
| GET    |     /games/details/:id     |                       Renders game-details view for the particular game. |

## MODELS

### User model

```
{
  username: String,
  email: String,
  password: String,
  favorites: [FavoriteId],
}

```

```
{
  gameId: String,
}
```

## API

https://rawg.io/apidocs

## Packages

- Ironlauncher
- Express
- HBS
- Mongoose
- Bcryptjs
- Axios
- Cloudinary
- Connect-Mongo
- Express-session

## Github Repository

https://github.com/MesquitaGit/thegamershub
