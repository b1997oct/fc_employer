import { Schema, model, models } from "mongoose";

const employment = new Schema({
    exp_designation: {
        type: String,
        required: true,
        maxlength: [50, "/designation must be less than 50 char"]
    },
    exp_industry: {
        type: String,
        required: true,
        maxlength: [50, "/industry must be less than 50 char"]
    },
    exp_level: {
        type: Boolean,
        required: true
    },
    notice_period: {
        type: Number,
        maxlength: [3, "/notice period must be less than 3 char"]
    },
    functional_area: {
        type: String,
        required: [true, '/functinal area is required'],
        maxlength: [50, "/functinal area must be less than 50 char"]
    },
    total_exp: {
        type: String,
        maxlength: [50, "/total_exp must be less than 50 char"]
    },
    cctc: {
        type: String,
        maxlength: [20, "/current ctc must be less than 20 char"]
    },
    ectc: {
        type: String,
        required: true,
        maxlength: [20, "/expected ctc must be less than 20 char"]
    },
    working_status: {
        type: String,
        maxlength: [20, "/expected ctc must be less than 3 char"]
    },
}, { _id: false })

const education = new Schema({
    university: {
        type: String,
        required: [true, '/collage is required field'],
        maxlength: [50, "/collage must be less than 50 char"]
    },
    collage: {
        type: String,
        required: [true, '/collage is required field'],
        maxlength: [50, "/collage must be less than 50 char"]
    },

    degree: {
        type: String,
        required: [true, 'degree is required field'],
        maxlength: [50, "/degree must be less than 50 char"]
    },
    study_field: {
        type: String,
        required: [true, '/degree is required field'],
        maxlength: [50, "/degree must be less than 50 char"]
    },
    ed_status: {
        type: String,
        required: [true, '/collage is required field'],
        maxlength: [10, "/ed_status must be less than 10 char"]
    },
    ed_start_date: {
        type: String,
        required: [true, '/ed_start_date is required field'],
        maxlength: [20, "/ed_start_date must be less than 20 char"]
    },
    ed_end_date: {
        type: String,
        maxlength: [20, "/ed_end_date must be less than 20 char"]
    },
}, { _id: false })

const skillSchema = new Schema(
    {
        skill: {
            type: String,
            minlength: [3, '/skill min length 3 char'],
            maxlength: [50, '/max 50 validation failed']
        },
        level: {
            type: Number,
            maxlength: [3, '/level validation failed'],
        },
    },
    { _id: false }
);

const schema = new Schema({
    _id: {
        type: String,
        required: true
    },
    education: education,
    emp_details: employment,
    skills: {
        type: [skillSchema],
        default: [],
    },
    resume: {
        public_id: {
            type: String,
            set: (value) => {
                if (value) {
                    const uniqueId = value.split("/").pop()
                    return uniqueId;
                }
                return value;
            },
        },
        secure_url: String,
    },
    work_experience: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'WorkExp'
        }],
        default: [],
    },

}, { versionKey: false })



export default models.Professional || model('Professional', schema);
