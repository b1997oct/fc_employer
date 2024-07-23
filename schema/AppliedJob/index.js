const { Schema, model, models } = require("mongoose")

const schema = new Schema({
    status: {
        type: Number,
        required: [true, '/status is required'],
        default: 1,
        max: [10, "/status is must be less char"]
    },
    describe: {
        type: String,
        maxlength: [100, "/exceeds max length/"],
        required: [true, '/status is required'],
    },
    note: {
        type: String,
        maxlength: [100, "/note max length/"],
    },
    hold: Boolean,
    user: {
        type: Schema.Types.ObjectId,
        required: [true, '/user is required/'],
    },
    job: {
        type: Schema.Types.ObjectId,
        required: [true, '/job is required/'],
    },
}, { timestamps: true, versionKey: false })

module.exports = models.AppliedJob || model('AppliedJob', schema);