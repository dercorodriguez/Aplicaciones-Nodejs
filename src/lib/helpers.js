const bscrypt = require('bcryptjs');
const helpers = {};

helpers.encryptPassword = async(password) => {
    const salt = await bscrypt.genSalt(10);
    const paswhash = await bscrypt.hash(password, salt);
    return paswhash;
};

helpers.matchPassword = async(password, savePassword) => {
    try {
        return await bscrypt.compare(password, savePassword);
    } catch (ex) {
        console.log(e);
    }
};

module.exports = helpers;