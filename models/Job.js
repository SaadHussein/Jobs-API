const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Must Provide Company Name'],
        maxLength: 50
    },
    position: {
        type: String,
        required: [true, 'Must Provide Position'],
        maxLength: 100
    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: "pending"
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        res: 'User',
        required: [true, 'Please Provide User']
    }
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);