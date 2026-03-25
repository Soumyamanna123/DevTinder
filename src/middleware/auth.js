const jwt = require("jsonwebtoken");
const User = require("../model/user");

const userauth = async (req, res, next) => {
  //   console.log("secreat is:", process.env.JWT_SECRET);
  //   console.log("cookies:", req.cookies);
  //   console.log("token:", req.cookies.token);
  try {
    //read the token from the cookies
    const { token } = req.cookies;

    //validate the token
    if (!token) {
      return res.status(401).send("token not found, UnAuthorized Request");
    }
    const decodedobj = jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodedobj;
    //find the user
    const user = await User.findById(_id);
    if (!user) {
      res.status(401).send("user not found, UnAuthorized Request");
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    res.status(401).send("invalid token, UnAuthorized Request");
  }
};





module.exports = {
  userauth,
};
