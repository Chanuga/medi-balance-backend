import { ClaimsModel } from '../models/claimsModel.js';

// get all
export const getAllClaims = async (req, res) => {
    const user_id = req.user._id
    console.log("user_id claims controller", req.user);
    try {
        const claims = await ClaimsModel.find({user_id: user_id, isDelete: false}).sort({ createdAt: -1 });
        res.status(200).json(claims);
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

// get by id
export const getClaim = async (req, res) => {
    const { id } = req.params;
    try {
        const claim = await ClaimsModel.findById({_id: id});
        res.status(200).json(claim);
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

// save
export const saveClaim = async (req, res) => {
    const { title, place, doctor, amount, note, indoororoutdoor } = req.body
    const user_id = req.user._id
    try {
        const claim = await ClaimsModel.create({title, place, doctor, amount, note, isDelete: false, user_id: user_id, isIndoor: indoororoutdoor == "indoor" ? true: false, isOutdoor: indoororoutdoor == "outdoor" ? true: false });
        res.status(200).json(claim);
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

// delete
export const deleteClaim = async (req, res) => {
    const { id } = req.params;
    try {
        const claim = await ClaimsModel.findByIdAndUpdate({_id: id}, {isDelete : true});
        res.status(200).json(claim);
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

// update
export const updateClaim = async (req, res) => {
    const { id } = req.params;
    try {
        const claim = await ClaimsModel.findByIdAndUpdate({_id: id}, {...req.body});
        res.status(200).json(claim);
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}