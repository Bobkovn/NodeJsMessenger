import validator from "validator"

class ValidatorUtils {
    validateCredentials(email, password) {
        if (!validator.isEmail(email)) {
            throw new Error('Email is not valid')
        }
        this.validatePassword(password)
    }

    validatePassword(password) {
        if (password.trim().length < 7) {
            throw new Error('Minimum password length: 7')
        }
    }
}

export default new ValidatorUtils()