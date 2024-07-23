const { Schema, model, models } = require("mongoose")

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true,
        maxlength: 200
    },
}, { timestamps: true, versionKey: false })

module.exports = models.Event || model('Event', schema);
