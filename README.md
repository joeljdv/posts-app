# BlogIt

This app is a blog I developed using Ruby on Rails and React. The purpose of the app is to allow the user to create an account and/or login into their account and read the posts that other users have created. The user can make comments on the posts, can create posts, update and delete their posts, and also visit the profile of other users by clicking on their name or picture.

In order for you to use this app, fork and clone this repo to your computer. Once cloned, cd to the directory and run: 

### `bundle Install`
### `rails s`

This will install all the necessary gems and start the backend.

On another terminal, cd to the directory and run:

### `npm install && npm start --prefix client`

This will open the app on the browser and you can start using the app.

To build this app, I used the hooks `useState` and `useEffect` a lot, to fetch the post, comments, and user's information whenever a component renderes, and to store that data in the state to render it on the page.

I used serializers to make it easier to deal with data returned from the fetch requests and validations to make sure that the users provide the correct information for signing up, logging in, making a post, or a comment.

## Walk-through

When the app opens, the user will see a welcome page and to the right they'll see two buttons `signup` and `login`, the user can either create an account or log into an existing account. Once logged in the user will see a page with all the posts made so far, going from newest to oldest, on the right side the user can see a `logout` button, a `posts` button and their profile picture and name, if the user clicks the picture or name, they'll be sent to their profile where they will all the posts they've made.

When the user is on post page, the user can click on any of the posts and will render a page where they can see that post and the comments made on that posts and who made the comment, the user can also make a comment and delete their own comments. By clicking on the names or pictures of other users, the user will be sent to the profile of that user and be able to see the posts made by that user only.

