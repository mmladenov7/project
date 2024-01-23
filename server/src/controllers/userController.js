const bcrypt = require('bcrypt')
const jwt = require('../utils/jwt')
const { SECRET } = require('../index')


const User = require('../models/user')



const userController = {
    register: async (req, res) => {
        const { firstName, lastName, email, password: userPassword, repeatPassword } = req.body

        try {
            const isRegistered = await User.findOne({ email })
            if (isRegistered) {
                throw new Error('This email is already registered')
            }

            if (userPassword != repeatPassword) {
                throw new Error('Passowrds must match')
            }

            if (firstName.length < 2
                || lastName.length < 2
                || userPassword.length < 6
                || email.length < 8) {
                throw new Error('Invalid data')
            }


            password = await bcrypt.hash(userPassword, 10)
            const imageUrl = 'https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg'


            const newUser = new User({ firstName, lastName, email, password, imageUrl })
            await newUser.save()


            const payload = {
                _id: newUser._id
            }

            const token = await jwt.sign(payload, SECRET)
            res.status(200).send(JSON.stringify(token))
        } catch (err) {
            res.status(400).send(err.message)
        }
    }
}

module.exports = userController