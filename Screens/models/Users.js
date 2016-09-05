var mongoose = require('mongoose');

var UsersSchema = new mongoose.Schema({
    admin: Boolean,
    editRights: String,
    projectName: String,
    screens: [{type: mongoose.Schema.Types.ObjectId, ref: 'Screen'}]
});

mongoose.model('User', UsersSchema);