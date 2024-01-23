import { Schema, model, models } from "mongoose";

const schema = new Schema({
    status: {
        type: Number,
        required: [true, '/status is required'],
        default: 1,
        maxlength: [1, "/status is must be less char"]
    },
    reason: {
        type: String,
        maxlength: [100, "/exceeds max length/"]
    },
    hold: {
        type: Boolean,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, '/user is required/'],
    },
    job: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: [true, '/job is required/'],
    },

}, { timestamps: true, versionKey: false })

export default models.AppliedJob || model('AppliedJob', schema);
