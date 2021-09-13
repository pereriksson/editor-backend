const bcrypt = require("bcryptjs");
const {BCRYPT_SALT_ROUNDS} = require("../constants");

const hashPassword = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(BCRYPT_SALT_ROUNDS));
}

const checkPassword = (password, hash) => {
    // Protect bcrypt from invalid parameters
    if (typeof password !== "string" || typeof hash !== "string") {
        return false;
    }

    return bcrypt.compareSync(password, hash);
}

module.exports = {
    hashPassword,
    checkPassword
}