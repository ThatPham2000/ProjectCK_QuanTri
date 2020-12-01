//1.require mongoose
const mongoose = require('mongoose');

//2. connect
const connection = mongoose.connect('mongodb://localhost/webshopping');

//3. Tạo Schema
const cameraSchema = new mongoose.Schema({
    pathImages: String,
    title: String,
    description: String,
    price: Number,
    thuong_hieu: String,
    bao_hanh: String,
    loai_san_pham: String
});

//4. Tạo model
const Camera = mongoose.model('Camera', cameraSchema);
//5. CRUD
Camera.find().exec((err, cameras) => {
    console.log(cameras);
});

module.exports = connection;