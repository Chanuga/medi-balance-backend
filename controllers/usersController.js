import { UserModel } from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

// create token
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

// login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ error: 'All fields must be filed' })
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'Incorrect Email' })
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            return res.status(400).json({ error: 'Incorrect Password' })
        }

        // create a token
        const token = await createToken(user._id)

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json(error.message);
    }
}

// signup
export const signupUser = async (req, res) => {
    console.log("Signup");
    const { email, password, username, contactnumber, companyname, designation, insurancelimitindoor, insurancelimitoutdoor } = req.body;
    console.log("123", email, password, username, contactnumber, companyname, designation, insurancelimitindoor, insurancelimitoutdoor);
    try {

        if (!email || !password || !username || !contactnumber || !companyname || !designation || !insurancelimitindoor || !insurancelimitoutdoor) {
            res.status(400).json({ error: 'All fields must be filed' })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid Email' })
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ error: 'Password is not strong enough' })
        }

        const exists = await UserModel.findOne({ email });

        if (exists) {
            return res.status(400).json({ error: 'User already exist' })
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await UserModel.create({ email, password: hash, username, contactnumber, companyname, designation, insurancelimitindoor, insurancelimitoutdoor });

        // create a token
        const token = await createToken(user._id)

        res.status(200).json({ email, token });

    } catch (error) {
        res.status(400).json(error.message)
    }
}