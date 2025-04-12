const crypto = require("crypto");

function generateUniqueString() {
    // This generates a random UUID (Universally Unique Identifier)
    return crypto.randomUUID();
}

module.exports = {
    generateUniqueString,
}