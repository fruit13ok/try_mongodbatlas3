const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema describe what the result object has, kind of like columns of a table
// I like to write smaller part of Schema and combine them, 
// Schema can be write like a nested object too
// Backlink Schema
const BacklinkSchema = Schema({
    url: String,
    status: String
});
// Resultbacklink Schema include Link Schema
const ResultbacklinkSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Resultbacklink must belong to a user']
    },
    backlinks: { type: [BacklinkSchema] }
});

// create model with Schema and export model
// !!! 3 model conventions !!!
// 1) when writing model, model name should be capitalize singular form EX: 'Resultbacklink' to look like a Class name
// 2) when using model as instance variable from this Class should be lower case EX: "result"
// 3) the online mongodb manager, will auto generate it when it was created, named in lower case plural form
const Resultbacklink = mongoose.model('Resultbacklink', ResultbacklinkSchema);
module.exports = Resultbacklink;