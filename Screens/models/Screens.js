var mongoose = require('mongoose');

var ScreenSchema = new mongoose.Schema({
    piNumber: Number,
    projectName: String,
    screenOwner: String/*{type: mongoose.Schema.Types.ObjectId, ref: 'User'}*/,
    activeUrl: [{type: mongoose.Schema.Types.ObjectId, ref: 'Url'}]
});



mongoose.model('Screen', ScreenSchema);