import jwt from "jsonwebtoken";

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token from Authorization header

  if (!token) return res.sendStatus(401); // If no token, respond with 401 (Unauthorized)

  // Verify the token using your secret key (this should match the one used to sign the JWT)
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(401); // If token verification fails, respond with 401
    req.user = user; // Attach the decoded user to the request object
    next(); // Call the next middleware or route handler
  });
}

export default authenticateToken;
