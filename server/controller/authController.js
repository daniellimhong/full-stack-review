const bcrypt = require("bcrypt");

module.exports = {
  login: async (req, res, next) => {
    //* async example
    const db = req.app.get("db");
    const { password, email } = req.body;

    const foundUser = await db
      .select_user(email)
      .catch(err => console.log(err));

    if (!foundUser.length) {
      res.status(401).send("User not found");
    } else {
      const matchPasswords = await bcrypt
        .compare(password, foundUser[0].password)
        .catch(err => console.log(err));
        console.log(matchPasswords)

      if (matchPasswords) {
        req.session.user = {
          username: foundUser[0].username,
          user_id: foundUser[0].user_id,
          email: foundUser[0].email
        };
        res.status(200).send(req.session.user);
      } else {
        res.status(403).send("Wrong password");
      }
    }
  },

  register: (req, res, next) => {
    const db = req.app.get("db");
    const { username, password, email } = req.body;

    db.select_user(email).then(([foundUser]) => {
      console.log(foundUser); //! should return undefined bc it existing user not found and will continue to else condition
      if (foundUser) {
        res.status(409).send("Username already taken");
      } else {
        const saltRounds = 12;
        bcrypt.genSalt(saltRounds).then(salt => {
          bcrypt.hash(password, salt).then(hashedPassword => {
            db.create_user([username, hashedPassword, email]).then(([user]) => {
              req.session.user = user;
              res.status(200).send(req.session.user);
            });
          });
        });
      }
    });
  },

  logout: (req, res, next) => {
      res.session.destroy();
      res.status(200).send([])
  },

  userSession: (req, res, next) => {
      res.status(200).send(req.session.user)
  }
};
