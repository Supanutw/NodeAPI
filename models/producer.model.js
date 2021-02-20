var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    Topic: {
        type: String,
        required: true
    },
    Message: {
        type: String,
        required: true
    },
    Events: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Producer', schema);