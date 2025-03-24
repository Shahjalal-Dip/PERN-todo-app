const jwt = require('jsonwebtoken');

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
    const token = req.cookies?.token; // Ensure cookies exist

    if (!token) {
        return res.status(401).json({ message: 'Not authenticated. Token missing in cookies.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token.' });
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;