const mongoose = require('mongoose');

const { Schema } = mongoose;

const PointSchema = new Schema({
    latitude: Number,
    longitude: Number,
    timestamp: Date,
}, { timestamps: true });

const Point = mongoose.model('Point', PointSchema);
module.exports = Point;