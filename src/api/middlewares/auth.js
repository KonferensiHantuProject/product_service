// JWT 
const jwt = require("jsonwebtoken");

// Response Builder
const ResponseBulider = require('../helpers/responseBuilder');

class Auth {

static authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        
        // Verifying Token
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return ResponseBulider.error(res, 403, err.message); 
            }
  
            req.user = user;
            next();
        });
    } else {
        return ResponseBulider.error(res, 401, 'Tidak ada Token'); 
    }
  }

}

// Exporting modules
module.exports = Auth;