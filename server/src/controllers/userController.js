const bcrypt = require('bcrypt')
const jwt = require('../utils/jwt')
const { SECRET } = require('../index')


const User = require('../models/user')


async function userFinder(email) {
    const user = await User.findOne({ email })
    if (user) {
        return user
    }
    return false
}



const userController = {
    register: async (req, res) => {
        const { firstName, lastName, email, password, repeatPassword } = req.body

        try {
            const isRegistered = await userFinder(email)
            if (isRegistered) {
                throw new Error('This email is already registered')
            }

            if (password != repeatPassword) {
                throw new Error('Passowrds must match')
            }

            if (firstName.length < 2
                || lastName.length < 2
                || password.length < 6
                || email.length < 8) {
                throw new Error('Invalid data')
            }


            const hashedPassword = await bcrypt.hash(password, 10)
            const imageUrl = 'https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg'


            const newUser = new User({ firstName, lastName, email, password: hashedPassword, imageUrl })
            await newUser.save()


            const payload = {
                _id: newUser._id
            }

            const token = await jwt.sign(payload, SECRET)
            res.status(200).send(JSON.stringify(token))
        } catch (err) {
            res.status(400).send(err.message)
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body

        try {
            const user = await userFinder(email)
            const passMatch = await bcrypt.compare(password, user?.password)

            if (!user || !passMatch) {
                throw new Error()
            }

            const payload = {
                _id: user._id
            }

            const token = await jwt.sign(payload, SECRET)
            res.status(200).send(JSON.stringify(token))
        } catch {
            res.status(400).send('Invalid email or password')
        }

    }
}

module.exports = userController