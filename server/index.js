require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const app = express();
app.use(express.json());
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const { login, register, userSession, logout } = require('./controller/authController')

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("Database connected");
});

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14 // two weeks
    }
  })
);

app.post("/api/login", login);
app.post("/api/register", register);
app.get("/api/user_session", userSession);

app.get("/api/logout", logout);
app.get("/api/users");
app.put("/api/distance");
app.put("/api/kill_user");
app.delete("/api/obliterate");

app.listen(SERVER_PORT, () =>
  console.log(`Server listening on port ${SERVER_PORT}`)
);
