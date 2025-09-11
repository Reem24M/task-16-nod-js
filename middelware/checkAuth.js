const jwt = require("jsonwebtoken");

const CheckAuth = (req, res, next) => {
    try {
        const getToken = req.session?.token; 
        if (!getToken) {
            return res.status(401).json({ message: "Unauthorized 1" });
        }

        jwt.verify(getToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized 2" });
            }
            req.user = decoded;
            next();
        });

    } catch (error) {
        console.error("Auth Middleware Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = { CheckAuth };
