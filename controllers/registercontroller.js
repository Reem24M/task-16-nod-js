
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const register = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;
        if (!firstName || !lastName || !username || !email || !password) {
            return res.status(400).json({ message: "All inputs are required" });
        }
        const checkUser = await User.findOne({ $or: [{ username: username }, { email: email }] }); // false
        if (checkUser) {
            if (checkUser.username === username) {
                return res.status(400).json({ message: "Username already exists" });
            } else if (checkUser.email === email) {
                return res.status(400).json({ message: "Email already exists" });
            }
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const addnewuser = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashPassword,
        })
        await addnewuser.save();
        // const token = jwt.sign({firstName, lastName, email, role : "user"},  process.env.JWT_SECRET, { expiresIn: "1m" });
        // req.session.token = token;

        return res.status(201).json({ message: "User registered successfully" });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
    
}
    

    



module.exports = { register }