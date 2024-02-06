import { Schema, model, models } from "mongoose";

const obj = {
    type: String,
    required: true,
    trim: true,
    maxlength: [50, "/validation faild max length 50/"],
    minlength: [1, "/validation faild min length 3/"]
}


const schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: [true, '/user is required field/'],
    },
    designation: obj,
    company: obj,
    from: obj,
    to: {
        type: String,
        trim: true,
        maxlength: [50, "/validation faild max length 50/"],
    },
    despcription: {
        type: String,
        trim: true,
        maxlength: [500, "/validation faild max length 50/"],
    },
}, { versionKey: false, timestamps: { updatedAt: true } })


export default models.WorkExperience || model('WorkExperience', schema);