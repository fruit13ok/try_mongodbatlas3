const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { 
        type: String, 
        unique: true,                               // no duplitecate user name
        trim: true,                                 // remove trailing space
        required: [true, 'User must have a name']   // no empty user name
    },
    userpassword: { 
        type: String, 
        trim: true,
        required: [true, 'User must have a password'],
        select: false   // not allow to query, unless force with .select('+userpassword')
    },
});

// 'virtual populate' need to enable to pass JSON and Object
// enable virtual, spell 'virtuals'
UserSchema.set('toJSON', {virtuals: true});
UserSchema.set('toObject', {virtuals: true});

// to populate any model that reference this parent
// use 'virtual populate' for 'parent reference', need to enable 'toJSON' and 'toObject'
// create 'virtualResultbacklink' to use in populate() later, 
// 'Resultbacklink' is 'Resultbacklink' model name
// 'user' point to ResultSchema's 'user', 
// '_id' is UserSchema's '_id' joined in ResultSchema
UserSchema.virtual('virtualResultbacklink', {
    ref: 'Resultbacklink',
    foreignField: 'user',
    localField: '_id'
});
// 'virtual populate' the 'Resultrelatedsearch'
UserSchema.virtual('virtualResultrelatedsearch', {
    ref: 'Resultrelatedsearch',
    foreignField: 'user',
    localField: '_id'
});

const User = mongoose.model('User', UserSchema);
module.exports = User;