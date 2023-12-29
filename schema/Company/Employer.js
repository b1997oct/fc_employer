import { Schema, model, models } from "mongoose";

const schema = new Schema({
    uid: {
        type: String,
        required: [true, '/uid is reqired'],
        maxlength: [50, '/max length is 50'],
        minlength: [4, '/uid min length is 4'],
        unique: [true, '/uid must be unique']
    },
    password: {
        type: String,
        required: [true, '/password is reqired'],
        maxlength: [500, '/max length is 500'],
    },
    name: {
        type: String,
        required: [true, '/name is reqired'],
        maxlength: [500, '/max length is 500'],
    },
    email: {
        type: String,
        required: [true, '/email is reqired'],
        maxlength: [50, '/max length is 50'],
        unique: [true, '/uid must be unique']
    },
    mobile: {
        type: String,
        required: [true, '/mobile is reqired'],
        maxlength: [15, '/max length is 15'],
        unique: [true, '/uid must be unique']
    },
    temp_password: {
        type: String
    },
    status: {
        type: String,
        enum: ['Blocked']
    },

}, { timestamps: true, versionKey: false })

export default models.Employer || model('Employer', schema);
