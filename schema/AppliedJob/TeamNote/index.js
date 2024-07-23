const { Schema, model, models } = require("mongoose")

const schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: [true, '/user is required/'],
    },
    application: {
        type: Schema.Types.ObjectId,
        required: [true, '/application is required/'],
    },
    text: {
        type: String,
        maxlength: [100, "/exceeds max length/"]
    },
    status: Number
}, { timestamps: { createdAt: true, updatedAt: false }, versionKey: false })

module.exports = models.TeamNote || model('TeamNote', schema);