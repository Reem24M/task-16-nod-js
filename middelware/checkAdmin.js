const jwt = require('jsonwebtoken')


const checkAdmin = (req, res, next) => {
    const getToken = req.session.token
    if (!getToken)
        return res.status(401).json({ message: "Unauthorized" });
    else {
        jwt.verify(getToken, process.env.JWT_SECRET, (error, decode) => {
            if (error)
                return res.status(401).json({ message: "Unauthorized" });
            else {
                req.user = decode
                if (req.user.role !== 'admin')
                    return res.status(401).json({ message: "Unauthorized" });
                next();
            }
        });
    }
};

module.exports = { checkAdmin };