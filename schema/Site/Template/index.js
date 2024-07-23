const { Schema, model, models } = require("mongoose")

const schema = new Schema({
    event: {
        type: Schema.ObjectId,
        required: true
    },
    from: {
        type: Schema.ObjectId,
        required: true
    },
    fromTitle: {
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: String,
        required: true,
        maxlength: 200
    },
    html: {
        type: String,
        required: true,
        maxlength: 10000
    }
}, { timestamps: true, versionKey: false })

module.exports = models.Template || model('Template', schema);
