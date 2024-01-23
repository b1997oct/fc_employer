import { Schema, model, models } from "mongoose";

const schema = new Schema({
    name: {
        type: String,
        maxLength: [50 , "/name length 50 char/"],
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    mobile : {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    status: {
        type: String,
        enum: ['INACTIVE','TEMP_BLOCKED','BLOCKED']
    }

}, { timestamps: true, versionKey: false })



export default models.User || model('User', schema);
