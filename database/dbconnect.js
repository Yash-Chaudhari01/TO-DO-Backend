const mongoose = require('mongoose');
require('dotenv').config();

exports.dbConnect = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/TODO', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connection successful');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        throw err; 
    }
};
