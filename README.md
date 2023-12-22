# Assignment 2 - Web API.

Name: Your Name

## Features.

A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** (or modifications to existing features)

+ Added the ability to add and remove user's favorite movies via MongoDB
+ Added the ability to add and remove user-tagged movies via MongoDB
+ Added the ability to add and remove actors followed by users via MongoDB
+ Added the ability for users to add or remove comments on movies via MongoDB.
+ When a user logs in, the user's add/remove actions are actively retrieved.
+ Added the ability for any user to see what all users have commented on a particular movie
+ Added user's own comment page for easy moderation
+ Added authentication of logins via the back-end
+ Ensure that users can log in either by email or username
+ Ensure that users can log in without having to log in again once they have completed their registration.
+ Added the ability to avoid duplicate email and usernames through the backend in the registration section
+ Added registration section to validate email legitimacy and password reasonableness via the backend
+ Move all functions requested via TMDB-api to the backend
+ Ensure that protected routes accessed through the address bar are redirected to the login screen
+ Ensure that after login is complete, you will be redirected directly back to the previously accessed route

## Setup requirements.

[ Outline any non-standard setup steps necessary to run your app locally after cloning the repo.]

1. First install the node_module on the front end:

```shell
cd movies
npm install
```

2. Then node_module is installed for the backend:

```shell
cd movies-api
npm install
```

3. Run the front end and back end:

```shell
cd movies
npm start
```

```shell
cd movies-api
npm run dev
```



## API Configuration

Describe any configuration that needs to take place before running the API. For example, creating an `.env` file and what variables to put in it. Give an example of how this might be done.

REMEMBER: DON'T PUT YOUR OWN USERNAMES/PASSWORDS/AUTH KEYS IN THE README OR ON GITHUB, just placeholders as indicated below:



______________________
```sh
NODE_ENV=development
REACT_APP_TMDB_KEY=
PORT=8080
HOST=localhost
MONGO_DB=mongodb://localhost:27017/your_db_name
SECRET=
```

.env file format as above

make sure it will place at the root directory of file *movies-api*

______________________

## API Design
SWAGGER HUB: https://app.swaggerhub.com/apis/LIANG765407782/web-ca_2/1.0

![image-20231222142317622](D:\BIRD\year4\Web Development 2\react-api-ca2\images\image-20231222142317622.png)



## Security and Authentication

Give details of authentication/security implemented on the API (e.g. passport/sessions). Indicate which routes are protected.

1. authentication/security
   1. Through the front-end to send the registration form back to the back-end for authentication, the back-end of the user name / user email and password to match the back-end will use the jwt way through the user name for the generation of a signature, and then send the token to the front-end to obtain authentication and complete the entire login process
   2. Registration authentication part, first through the front-end for two password input matching, then the back-end to ensure that the return content (username, email, password) are not empty, then still the back-end for the verification of the user name, to avoid duplicated user name in the database, and then determine the mailbox can not be duplicated, and finally certify the legitimacy of the mailbox (xxx@xxx.xxx形式) and password Rationality (including English case special characters and numbers, a total of at least eight)
2. protected routes
   1. /movies/favorites
   2. /movies/marked
   3. /actors/followed
   4. /reviews/:id
   5. /reviews/form
   6. /reviews/my-reviews

## Integrating with React App

Describe how you integrated your React app with the API. List the views that use your Web API instead of the TMDB API. Describe any other updates to the React app from Assignment One.

1. First of all, I first transfer all the tmdb-api to the back-end for requesting, and then create the corresponding routes one by one, and finally get all the pages rendered through the reception of the front-end

2. I then created a MongoDB data model to store the user's comments, which would include the user's id and the author name of the comment, the content, and the rating; after that, I created add and delete functionality for the comments to ensure that the comments could only be deleted by the user who added the comment, and I also created a function to fetch all the comments, which would allow all the users to see the comments made by the other users on the This allows all users to see what other users have said about the movie.
   ![image-20231221235009786](D:\BIRD\year4\Web Development 2\react-api-ca2\images\image-20231221235009786.png)

   ![image-20231221235201464](D:\BIRD\year4\Web Development 2\react-api-ca2\images\image-20231221235201464.png)

3. Finally, it is the part of login and registration, I put all the functions to judge whether the login and registration are successful or not except whether the passwords entered twice in the registration process match into the back-end; moreover, I added three fields of favorite, marked and followed in the user's data model, after the login is completed, the user will add the favorite movie, marked movie and followed actor, and their ids will be stored in this data model. After logging in, users add favorite movie, marked movie and followed actor, their ids will be stored in this data model, and after the next successful login, the request for these three fields will be made, and then getMovie or getActor will be used to match the movie and actor by their ids and display them on the corresponding pages.

![image-20231221234708650](D:\BIRD\year4\Web Development 2\react-api-ca2\images\image-20231221234708650.png)

## Independent learning (if relevant)

Briefly explain any non-standard features developed for the app.   

I'm learning this part:

1. How to use useEffect and setState in conjunction with location to return to the route you were on before you logged in.
2. Demonstration of routing design using swagger.
