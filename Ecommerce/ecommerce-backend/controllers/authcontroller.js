const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');

const register = async (req, res, next) => {
    try {
        const { email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, role });
        await newUser.save();
        res.json({ message: 'User registered successfully.'});
    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password.' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Invalid email or password.' });

        const token = jwt.sign({ _id: user._id, role: user.role }, 'secretKey', { expiresIn: '1h' });
        res.header('Authorization', token).json({ message: `Hello, ${user.email}!` , role : user.role, token : token, id : user._id});
    } catch (err) {
        next(err);
    }
};

const logout = (req, res) => {
    res.json({ message: 'Logged out successfully.' });
};

module.exports = {register, login, logout};
