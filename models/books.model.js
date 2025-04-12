const mongoose = require("mongoose");
const { AuthorModel } = require("./author.model");
const { UserProfileModel } = require("./user.model");
const { GenreModel } = require("./genre.model");

const BookModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    authorId: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0,
    },
    sku: {
        type: String,
        required: true
    },
    OwnerId: {
        type: String,
        required: true
    },
    language: {
        type: String,
        default: "English",
        Options: ["English", "German", "French"]
    },
    tags: {
        type: [String],
        default: []
    },
    genres: {
        type: [String]
    }
});

const bookDB = mongoose.model('bookDB', BookModel);

module.exports = {
    bookDB,
    BookModel
}