const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("email-validator");

const { promisify } = require("util");
const path = require("path");
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DATABASE_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: 3307, //yechange krna hai
});
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please Provide an email and password",
      });
    }
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (
          !results[0] ||
          !(await bcrypt.compare(password, results[0].password))
        ) {
          return res.status(401).json({
            message: "Email or Password is incorrect",
          });
        } else {
          const id = results[0].id;

          const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
          });

          const date = new Date();

          const cookieOptions = {
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
          };
          res.cookie("userSave", token, cookieOptions);

          return res.status(200).json({
            message: "Login successfuly",
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};
exports.register = (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (!validator.validate(email)) {
    return res.status(400).send({ message: "Invalid Email" });
  }
  db.query(
    "SELECT email from users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        console.log(err);
      } else {
        if (results.length > 0) {
          return res
            .status(403)
            .send({ message: "The email is already in use" });
          //   return res.render(
          //     path.join(__dirname, "..", "public", "register.ejs"),
          //     {
          //       message: "The email is already in use",
          //     }
          //   );
        } else if (password != confirmPassword) {
          return res.status(400).json({ message: "Password doesn't match" });
        }
      }

      let hashedPassword = await bcrypt.hash(password, 8);

      db.query(
        "INSERT INTO users SET ?",
        { name: name, email: email, password: hashedPassword },
        (err, results) => {
          if (err) {
            console.log(err);
          } else {
            return res.status(201).json({ message: "User Register" });

            // return res.render(path.join(__dirname,'..','public','login.ejs'), {
            //     message: 'User registered'
            // });
          }
        }
      );
    }
  );
};

exports.isLoggedIn = async (req, res, next) => {
  try {
    if (req.cookies.userSave) {
      const token = req.cookies.userSave;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      db.query(
        "SELECT * FROM users WHERE id = ?",
        [decoded.id],
        (err, results) => {
          if (!results) throw new Error("User not found");
          req.user = results[0];
          return next();
        }
      );
    } else throw new Error("User not found");
  } catch (error) {
    res.status(401).send("Unauthorize: no token provided");
    return next();
  }
};
exports.logout = (req, res) => {
  res.cookie("userSave", "logout", {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true,
  });
  res.status(200).redirect("/");
};
