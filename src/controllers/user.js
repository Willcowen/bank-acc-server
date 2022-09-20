const prisma = require("../utils/prisma.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = "somesecurestring";

const getUsers = async (req, res) => {
  console.log("calling getUsers!");

  try {
    const userList = await prisma.user.findMany();
    return res.status(200).json({ data: userList });
  } catch (e) {
    console.log("ERROR:", e);
    return res.status(500).json("Unable to load users..");
  }
};

const createUser = async (req, res) => {
  console.log("calling create user!");
  const { username, email, password } = req.body;
  console.log(username, email, password);
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt)

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      return res.status(400).json({
        status: "email already in use!",
      });
    }
    const createdUser = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
        balance: {
          create: {
            balance: 0,
          },
        },
      },
    });

    return res.status(200).json({
      status: "success",
      data: createdUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail, server error",
    });
  }
};

module.exports = {
  getUsers,
  createUser,
};
