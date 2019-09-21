const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: [true, 'Required field']
    },
    age: {
        type: Number,
        required: [true, 'Required field'],
    }
});

module.exports = mongoose.model('dogs', dogSchema);