const jwt = require('jsonwebtoken');

module.exports = {
    generateJWT: async (user) => {
        const userFields = user.getJWTFields();
        const token = await jwt.sign(userFields, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

        return token
    },
    verifyJWT: (token) => {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (e) {
            return false;
        }
    }
};
