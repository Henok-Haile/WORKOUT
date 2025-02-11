import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    try {
        token = token.split(" ")[1]; // ✅ Extract token from "Bearer <TOKEN>"
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token" });
    }
};

export default protect;