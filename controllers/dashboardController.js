import { UserModel } from "../models/userModel.js";
import { ClaimsModel } from "../models/claimsModel.js";

export const dashboardData = async (req, res) => {
    const user_id = req.user._id
    console.log("user_id", req.user);
    try {
        const initialAmounts = await UserModel.findById({ _id: user_id });
        console.log("insurancelimitindoor", initialAmounts.insurancelimitindoor, initialAmounts.insurancelimitoutdoor);

        const indoorClaims = await ClaimsModel.find({ user_id: user_id, isDelete: false, isIndoor: true });
        const totalSumIndoor = indoorClaims.reduce((sum, obj) => sum + obj.amount, 0);

        const outdoorClaims = await ClaimsModel.find({ user_id: user_id, isDelete: false, isOutdoor: true });
        const totalSumOutdoor = outdoorClaims.reduce((sum, obj) => sum + obj.amount, 0);

        const totalClaimsAmount = initialAmounts.insurancelimitindoor + initialAmounts.insurancelimitoutdoor
        const totalClaimsTaken = totalSumIndoor + totalSumOutdoor

        console.log("indoorClaims", totalSumIndoor);
        console.log("outdoorClaims", totalSumOutdoor);

        res.status(200).json({ total: totalClaimsAmount, totaltaken: totalClaimsTaken, indoorlimit: initialAmounts.insurancelimitindoor, outdoorlimit: initialAmounts.insurancelimitoutdoor, indoortaken: totalSumIndoor , outdoortaken: totalSumOutdoor });
        // const claims 
    } catch (error) {
        res.status(400).json(error.message);
    }
}