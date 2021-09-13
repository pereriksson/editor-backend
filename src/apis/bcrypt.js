const bcrypt = require("bcryptjs");
const {BCRYPT_SALT_ROUNDS} = require("../constants");

const hashPassword = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(BCRYPT_SALT_ROUNDS));
}

const checkPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}

module.exports = {
    hashPassword,
    checkPassword
}