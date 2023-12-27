import { Schema, model, models } from "mongoose";

const image = {
    public_id: String,
    secure_url: String
}

const comapnySchema = new Schema({
    company_name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    size: {
        type: String,
        trim: true
    },
    map_link: {
        type: String,
    },
    website: {
        type: String,
        trim: true
    },
    industry: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    about_us: {
        type: String,
        required: true,
    },
    banner: image,
    banner_2: image,
    banner_3: image,
    banner_4: image,
    banner_5: image,
    company_logo: image,
},
    {
        timestamps: true
    })



export default models.Company || model('Company', comapnySchema);
