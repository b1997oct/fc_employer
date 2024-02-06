import { Schema, model, models } from "mongoose";

const schema = new Schema({
    payload: {
        type: String,
        unique: [true, '/details must be uniuqe'],
        required: [true, '/mobile number is required field/'],
        maxlength: [10, '/mobile number max length is 10/'],
        minlength: [10, '/mobile number min length is 10/'],
    },
    otp: [String],
    ref: [String]
}, { timestamps: true, versionKey: false })


export default models.Verification || model('Verification', schema);
