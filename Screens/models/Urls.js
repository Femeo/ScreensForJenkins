var mongoose = require('mongoose');

var UrlsSchema = new mongoose.Schema({
    screen: {type: mongoose.Schema.Types.ObjectId, ref: 'Screen'},
    link: String
});

mongoose.model('Url', UrlsSchema);