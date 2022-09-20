const prisma = require("../utils/prisma.js");
const bcrypt = require('bcrypt')
const saltRounds = 10;
const jwt = require('jsonwebtoken')
const jwtSecret = 'somesecurestring'

const getUsers = async (req, res) => {
console.log('calling getUsers!')

try {
    const userList = await prisma.user.findMany()
    return res.status(200).json({data: userList})
} catch (e) {
    console.log('ERROR:', e)
    return res.status(500).json("Unable to load users..")
}

}

const createUser = async (req, res) => {
    console.log('calling create user!')
    const { username, email, password } = req.body
    console.log(username, email, password)
    
    const hashedPassword = bcrypt.hash(password, saltRounds, (err, hash) => {
        // Now we can store the password hash in db.
      });

      try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        })
        if (existingUser) {
            return res.status(400).json({
                status : "email already in use!"
            })
        }
      }

}


module.exports = {
    getUsers,
    createUser
}