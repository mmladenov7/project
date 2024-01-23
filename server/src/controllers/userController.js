const User = require('../models/user')

const userController = {
    register: async (req, res) => {
        const { firstName, lastName, email, password } = req.body

        console.log(firstName, lastName, email, password)
    }
}

module.exports = userController