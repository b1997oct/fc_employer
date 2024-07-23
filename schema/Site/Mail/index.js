const { Schema, model, models } = require("mongoose")

const schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    host: {
        type: String,
        required: true,
        trim: true
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true, versionKey: false })

module.exports = models.Mail || model('Mail', schema);