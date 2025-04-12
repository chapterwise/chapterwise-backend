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
        type: AuthorModel,
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
        type: UserProfileModel,
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
        type: [GenreModel]
    }
});

const bookDB = mongoose.model('bookDB', BookModel);

module.exports = {
    bookDB,
    BookModel
}