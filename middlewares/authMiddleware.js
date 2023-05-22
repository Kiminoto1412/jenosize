const admin = require("../config/firebaseConfig");

module.exports = async (req, res, next) => {
  
  const token = req.headers.authorization.split(" ")[1];
  try {
    
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (decodeValue) {
      
      req.user = decodeValue;
       return next();
    }
    return res.json({ message: "Unauthorize" });
  } catch (err) {
    return res.json({ message: "Internal Error" });
  }
};
