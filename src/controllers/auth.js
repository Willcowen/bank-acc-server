const prisma = require("../utils/prisma.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = "somesecurestring";

const Login = async (req, res) => {
    const { email, password } = req.body
    if (!email) {
        return res.status(400).json({
            status: "fail",
        })
    }
    try {
        const foundUser = await prisma.user.findUnique({
         where: {
            email: email,
         }
        })

        if (!foundUser) {
            return res.status(400).json({
                status: "fail",
                message: "User not found"
            })
        }
        const validateUser = await validateUserCredentials(password, foundUser)

        if (!areCredentialsValid) {
            return res.status(401).json({
              status: "fail",
              message: "Incorrect details",
            });
          }

        const token = generateJwt(foundUser.id);
        return res
        .status(200)
        .json({
          token,
          userId: foundUser.id,
          username: foundUser.username,
          status: "success",
        });
    } catch (e) {
        return res.status(500).json({
          status: "fail",
          message: "500 bad request",
        });
}
}

function generateJwt(validateUserCredentials) {
    return jwt.sign({ userId }, secret, {
      expiresIn: process.env.JWT_EXPIRY,
    });
  }

module.exports = {
    Login
  };