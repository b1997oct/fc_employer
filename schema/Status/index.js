const { Schema, model, models } = require("mongoose")

const schema = new Schema({
    type: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true
    },
    user: Boolean,
    team: Boolean,
    recruiter: Boolean,
    name: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true
    },
    color: {
        type: String,
        required: true
    },
    sort: Number
}, { versionKey: false })

module.exports = models.Status || model('Status', schema);
