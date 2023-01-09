const CryptoJS = require('crypto-js');
const dotenv = require("dotenv")
dotenv.config({
    path: ".env",
});

const encyptHash = (password) => {
    var cipherText = CryptoJS.AES.encrypt(JSON.stringify(password), process.env.HASH_KEY).toString();
    return cipherText
}

const decryptHash = (password) => {
    var bytes = CryptoJS.AES.decrypt(password, process.env.HASH_KEY);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData
};

module.exports = { encyptHash, decryptHash };