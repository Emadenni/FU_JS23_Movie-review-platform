const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access denied! Token is required" });
  }

  try {
    const formattedToken = token.replace("Bearer ", "");
    const decoded = jwt.verify(formattedToken, process.env.JWT_SECRET);
    req.user = decoded; 
    /* console.log(req.user.userId); */
    next();
  } catch (error) {
    console.error("Invalid token:", error);
    res.status(401).send({ error: "Invalid token" });
  }
};
