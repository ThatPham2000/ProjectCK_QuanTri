const mongoose = require('mongoose');

const URL = "mongodb+srv://web2k:web2k@cluster0.zur00.mongodb.net/webshopping?retryWrites=true&w=majority";
const connectDB = async () => {
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        await console.log('DB connected!');
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = connectDB;