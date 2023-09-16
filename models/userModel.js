import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    contactnumber: {
        type: Number,
        required: true,
    },
    companyname: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    insurancelimitindoor: {
        type: Number,
        required: true
    },
    insurancelimitoutdoor: {
        type: Number,
        required: true
    },
}, { timestamps: true})

export const UserModel = mongoose.model('Users', usersSchema);
