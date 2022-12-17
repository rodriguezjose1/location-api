const Point = require('../../../models/point');

const createPoint = ({ lat, long, timestamp }) => {
    return Point.create({
        latitude: lat,
        longitude: long,
        timestamp,
    });
};

module.exports = {
    createPoint,
};