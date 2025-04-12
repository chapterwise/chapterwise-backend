const jwt = require('jsonwebtoken');
const { logger } = require('../logger');

function verifyToken(req, res, next) {
    const token = req.header('Authorization')?.split("Bearer ")[1];
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = {_id : decoded.userId, email : decoded.email, role : decoded.role};
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        logger.error(error);
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = verifyToken;
