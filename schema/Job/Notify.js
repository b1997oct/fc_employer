import { Schema, model, models } from "mongoose";

const schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, '/user is required/'],
    },
    from: {
        type: Schema.Types.ObjectId,
    },
    description: {
        type: Schema.Types.ObjectId,
    },
    notes: {
        type: String,
        maxlength: [100, '/notes max is 100 char/']
    },
    type: {
        type: String,
        enum: ['APPLY', 'JOB_SEARCH_ALERT', 'ALERT', 'JOB_STATUS','CUSTOM'],
        required: [true, '/type is required/'],
    },
    read: {
        type: Boolean,
        default: false
    },
    link: {
        type: String,
        trim: true,
        required: [true, '/link is required/'],
        maxlength: [200, '/link max is 200 char/']
    },
    image: {
        type: String,
        maxlength: [500, '/image max is 500 char/']
    }

}, { timestamps: true, versionKey: false })

export default models.Notification || model('Notification', schema);
