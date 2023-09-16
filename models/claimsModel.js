import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const claimsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    doctor: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    note: {
        type: String
    },
    isDelete: {
        type: Boolean,
        required: true
    },
    isIndoor: {
        type: Boolean,
        required: true
    },
    isOutdoor: {
        type: Boolean,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true});

export const ClaimsModel = mongoose.model('Claims', claimsSchema);