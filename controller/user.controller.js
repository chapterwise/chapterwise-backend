const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userDB = require("../models/user.model");

const userSignUpController = async (req, res) => {
    try {
        const { email, password, mobile } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userDB({ email, password: hashedPassword, mobile });
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

        res.status(201).json({ message: 'User registered successfully' }); if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        console.log("JWT Readable", JWT_SECRET_KEY);
        const token = jwt.sign({ userId: user._id, email : user.email, role : user.role }, process.env.JWT_SECRET_KEY, {
            expiresIn: '10h',
        });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
}


const userProfileController = async (req, res) => {
    try{
        const userDetails = req.user;
        res.status(200).json({email : userDetails.email, mobile : userDetails.mobile});
    } catch(err){
        res.status(500).json({error : "Error Fetching Profile"});
    }
}

const userUpdateProfileController = async (req, res) => {
    try{
        const {email, role, _id} = req.user;
        const {mobile} = req.body;
        const user = await userDB.findById(id=_id).updateOne({mobile}).findById(id=_id);

        if(!user){
            res.status(400).json({error : "Error updating Profile"});
        }
        res.status(200).json({email : userDetails.email, mobile : userDetails.mobile})
    } catch(err){
        console.log("userUpdateProfileController", err);
        res.status(500).json({error : "Error updating Profile"});
    }
}

module.exports = {
    userSignInController,
    userSignUpController,
    userProfileController,
    userUpdateProfileController
}