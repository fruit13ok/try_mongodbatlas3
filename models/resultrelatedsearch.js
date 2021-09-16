// similar to resultbacklink.js see that for comments
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RelatedsearchSchema = Schema({
    searchKey: String,
    count: Number,
    percentage: String,
    totalCount: Number
});

const ResultrelatedsearchSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Resultrelatedsearch must belong to a user']
    },
    relatedsearchs: { type: [RelatedsearchSchema] }
});

const Resultrelatedsearch = mongoose.model('Resultrelatedsearch', ResultrelatedsearchSchema);
module.exports = Resultrelatedsearch;