import { Schema, model, models } from "mongoose";

const schema = new Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    company_name: {
        type: String,
        minlength: 1,
        maxlength: 50,
        required: true
    },
    industry: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    mobile: {
        type: String,
        minlength: 10,
        maxlength: 10,
        required: true
    },
    email: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    address: {
        type: String,
        minlength: 3,
        maxlength: 100,
        required: true
    },
    reason: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    }
}, { timestamps: true, versionKey: false })



export default models.Enroll || model('Enroll', schema);
