const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://amex4477:123@nodeexpressjs.xvmqx.mongodb.net/',{});
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;
