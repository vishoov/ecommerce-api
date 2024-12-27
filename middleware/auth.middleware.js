import jwt from 'jsonwebtoken';

const authenticateUser = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { name: decoded.name, email: decoded.email, role: decoded.role };
        next();
    } catch (err) {
        console.error('JWT verification error:', err);
        return res.status(401).json({ error: "Invalid token" });
    }
};

export { authenticateUser };
