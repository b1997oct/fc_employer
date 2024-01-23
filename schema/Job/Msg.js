import { Schema, model, models } from "mongoose";

const schema = new Schema({
    type: {
        type: String,
        required: [true, '/type is required/'],
        maxlength: [15, '/type max length 10 char/'],
        unique: [true, '/type must be unique/']
    },
    description: {
        type: String,
        required: [true, '/description is required/'],
        maxlength: [400, '/description max length 400 char/'],
        minlength: [10, '/description min length 10 char/']
    }

}, { timestamps: true, versionKey: false })



export default models.Msg || model('Msg', schema);
