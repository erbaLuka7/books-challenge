const {check} = require ("express-validator")

const loginValidation = [
    check('email')
        .notEmpty().withMessage('You must enter a email').bail()
        .isEmail().withMessage('Invalid email format').bail()
        .normalizeEmail().bail(),

    check('password')
        .notEmpty().withMessage('You must enter a password')
        
]

module.exports = loginValidation