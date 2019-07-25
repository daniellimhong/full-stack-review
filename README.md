# Area 51 Kill Counter

## Client
### Dependencies 
- axios
- react-router-dom (BrowserRouter)
- redux
- react-redux
- redux-promise-middleware
- node-sass 
- react-icons/fa 
- http-proxy-middleware

### Routes
- Home (Landing Page/Log-in) 
    - home => / => Login.js
- Profile
    - profile => /profile => Profile.js
- Kill Map
    - killMap => /kill_map => KillMap.js

### File-structure
- src/
    - components
        - profile   
            - Profile.js    
            - Profile.css / .scss
        - killMap   
            - KillMap.js    
            - KillMap.css / .scss
        - Home   
            - Login.js    
            - Login.css / .scss
    - App.js - put routes in here
    - Index.js
    - Reset.css
    - redux 
        - store.js
        - reducer.js
        


## Server
### Dependencies 
- express
- massive
- dotenv
- express-session
- bcrypt

### Server file structure
- server/ 
    - index.js
    - middleware
        -middleware.js
    - controller      
        - killCountController.js

### endpoints

**authorization**
- login: => /api/login
- register: => /api/register
- logout: => /api/logout
- userSession: => /api/user_session

<!-- create table profile(
    profile_id serial primary key
    picture text default 'img link',
    alive: boolean default true,
    location text,
    distance float,
    user_id integer references users(user_id) -->

**kill count endpoints**
- getAllUser: => /api/users
- killUser: => /api/killUser
- updateDistance: => /api/distance
- delete: => /api/obliterate




## Database
```sql
create table users(
    user_id serial primary key,
    username varchar(32) not null,
    password text not null,
    email text not null
);

```

- user profile
```sql
create table profile(
    profile_id serial primary key
    picture text default 'https://res.cloudinary.com/saturnslist/image/upload/q_auto/v1561159141/kcopfm6ygbyzgdu2mzxb.jpg',
    alive: boolean default true,
    location text,
    distance float,
    user_id integer references users(user_id)
)
```

-joining both tables by user_id
```sql
select * from users join profile
on(users.user_id = profile.user_id);
```