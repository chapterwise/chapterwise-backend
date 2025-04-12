const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { userDB } = require("../models/user.model");

const userSignUpController = async (req, res) => {
    try {
        const { email, password, mobile, name } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userDB({ email, password: hashedPassword, mobile, name });
        user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.log("userSignUpController", err);
        res.status(500).json({ error: "Registration failed" });
    }
}

const userSignInController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userDB.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        console.log("JWT Readable", process.env.JWT_SECRET_KEY);
        const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET_KEY, {
            // expiresIn: '10h',
        });
        res.status(200).json({ result : "Success" ,token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
}


const userProfileController = async (req, res) => {
    try {
        const { _id } = req.user;
        const userDetails = await userDB.findOne({ _id }, { password: 0, __v : 0 });
        res.status(200).json({ result : "Success" , data : userDetails });
    } catch (err) {
        res.status(500).json({ error: "Error Fetching Profile" });
    }
}

const userUpdateProfileController = async (req, res) => {
    try {
        const { email, role, _id } = req.user;
        const { name } = req.body; //Add here if you want to edit more fields
        const updateUser = await userDB.findById(id = _id).updateOne({ name });

        if (!updateUser) {
            res.status(400).json({ error: "Error updating Profile" });
        }

        const user = await userDB.findById(id = _id, { password: 0, __v : 0 });
        res.status(200).json({ result : "Success", data : user });
    } catch (err) {
        console.log("userUpdateProfileController", err);
        res.status(500).json({ error: "Error updating Profile" });
    }
}

module.exports = {
    userSignInController,
    userSignUpController,
    userProfileController,
    userUpdateProfileController
}