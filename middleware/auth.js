import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res.status(401).json({ success: false, data: "Unauthorized" });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error)
      return res
        .status(403)
        .json({ success: false, data: { message: "Forbidden", error: error.message } });
    req.user = user;
    next();
  });
};

export { authenticateToken };
