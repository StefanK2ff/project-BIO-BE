const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/user");
const Collection = require("../models/collections");

// HELPER FUNCTIONS
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLogin
} = require("../helpers/middlewares");

// POST '/auth/signup'
router.post(
  "/signup",
  isNotLoggedIn,
  validationLogin,
  async (req, res, next) => {
    const { email, password } = req.body;

    try {
      // projection
      const emailExists = await User.findOne({ email }, "email");

      if (emailExists) return next(createError(400));
      else {
        //create the user
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPass = bcrypt.hashSync(password, salt);
        const newUser = await User.create({ email, password: hashPass });
        
        newUser.password = "*";
        // create a default collection for the user
        
          const defaultCollection = await Collection.create({
            name: "#MyItems",
            items: [],
            default: true,
            owner: newUser._id
          });
          // connect new User with collection ID
          const createdUser = await User.findByIdAndUpdate(
            { _id: newUser._id },
            { $addToSet: { collections: defaultCollection._id } }
          );
          req.session.currentUser = createdUser;
          res.status(201).json({ defaultCollection, createdUser });
        
      }
    } catch (error) {
      next(createError(error));
    }
  }
);

// POST '/auth/login'
router.post(
  "/login",
  isNotLoggedIn,
  validationLogin,
  async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email }).populate("collections");
      if (!user) {
        next(createError(404));
      } else if (bcrypt.compareSync(password, user.password)) {
        user.password = "*";
        req.session.currentUser = user;
        res.status(200).json(user);
      } else {
        next(createError(401)); // Unauthorized
      }
    } catch (error) {
      next(createError(error));
    }
  }
);
///auth/refresh/5e60fa91076c53411d04f974
// GET Userdate to refresh state
router.get("/refresh/:userid"), isLoggedIn, async (req, res, next) => {
  const { userid } = req.params
  consolog.lo(userid, "from params")
  try {
    const user = await User.findById(userid).populate("collections");
    if (!user) {
      next(createError(404));
    } else if (user){
      user.password = "*";
      req.session.currentUser = user;
      res.status(200).json(user);
    } else {
      next(createError(401)); // Unauthorized
    }
  } catch (error) {
    next(createError(error));
  }
}

// POST '/auth/logout'
router.post("/logout", isLoggedIn, (req, res, next) => {
  req.session.destroy();
  res
    .status(204) //  No Content
    .send();
});

// GET '/auth/me'
router.get("/me", isLoggedIn, (req, res, next) => {
  const currentUserSessionData = req.session.currentUser;
  currentUserSessionData.password = "*";

  res.status(200).json(currentUserSessionData);
});

module.exports = router;
