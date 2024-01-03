import { Schema, model, models } from "mongoose";

const schema = new Schema({
    industry_list: [
        { type: String }
    ],
    department_list: [
        { type: String }
    ],
    education_list: [{
        type: String
    }],
    stream_list: [{
        type: String
    }],
})

export default models.Utils || model('Utils', schema);


