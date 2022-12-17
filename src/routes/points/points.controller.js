const pointsDao = require('./points.dao');

const createPoint = async (point) => {
    return pointsDao.createPoint(point);
};

const postPoint = async (req, res) => {
    const { lat, long, timestamp = new Date() } = req.body;

    const newPoint = await createPoint({ lat, long, timestamp });

    res.json({ data: { point: newPoint } });
};

module.exports = { postPoint };