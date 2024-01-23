import { Schema, model, models } from "mongoose";

const schema = new Schema({
    admin: {
        type: Schema.Types.ObjectId,
        required: [true, 'admin is required']
    },
    keyword: {
        type: String,
        minlength: [1, '/keyword min length is 1/'],
        required: [true, '/admin is required/'],
        maxlength: [100, '/keyword type max length is 100/'],
    },
    type: {
        type: String,
        minlength: [1, '/keyword type min length is 1/'],
        required: [true, '/type is required/'],
        maxlength: [100, '/keyword type max length is 100/'],
    },
    rank: {
        type: Number,
        default: 0
    }
}, { timestamps: true, versionKey: false })


export default models.Keyword || model('Keyword', schema);
