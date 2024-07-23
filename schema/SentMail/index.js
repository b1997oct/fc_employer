const { Schema, model, models } = require("mongoose")

const schema = new Schema({
    template: {
        type: Schema.ObjectId,
        required: true
    },
    from: {
        type: Schema.ObjectId,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    trigger: {
        type: String,
        required: true
    }
}, { timestamps: { createdAt: true, updatedAt: false }, versionKey: false })

module.exports = models.SentMail || model('SentMail', schema);