const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const User = require("../models/user");
const Collection = require("../models/collections");

// HELPER FUNCTIONS
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLogin
} = require("../helpers/middlewares");

//GET all collections of the current user
router.get("/user/:userId", isLoggedIn, async (req, res, next) => {
  const { userId } = req.params;
  try {
    const collections = await Collection.find({
      owner: userId
    });
    if (collections.length < 1) {
      await Collection.create({
        name: "myBooks",
        owner: userId,
        items: []
      });
      collections = await Collection.find({
        owner: userId
      });
    }
    res.status(200).json(collections);
  } catch (error) {
    next(createError(error));
  }
});

//POST a new collection and add it to a user
router.post("/", isLoggedIn, async (req, res, next) => {
    const {owner, items, name} = req.body
    try {
        const newCollection = await Collection.create({
            name,
            items,
            owner
        })
        const updatedUserCollections = (await User.findByIdAndUpdate({_id: owner}, {$addToSet: {collections: newCollection._id}})).collections
        res.status(201).json({newCollection, updatedUserCollections});
    }
    catch (error) {
    next(createError(error));
    }
});

//GET collection by ID
router.get("/id/:collectionId", isLoggedIn, async (req, res, next) => {
    const { collectionId } = req.params
    try {
        const result = await Collection.findById({_id: collectionId})
        res.status(200).json({result})
    } 
    catch (error) {
        next(createError(error)); 
    }
});

//PATCH a collection by ID
router.patch("/id/:collectionId", isLoggedIn, async (req, res, next) => {
    const { collectionId } = req.params;
    const { items, name} = req.body;
    try {
        const result = await Collection.findByIdAndUpdate({_id: collectionId}, {$set: {items: items}, name: name})
        res.status(200).json({result})
    } 
    catch (error) {
        next(createError(error)); 
    }
})

//DETELE a colelction by ID
router.delete("/id/:collectionId", isLoggedIn, async (req, res, next) => {
    const { collectionId} = req.params;
    try {
        const result = await Collection.findByIdAndDelete({_id: collectionId})
        res.status(204)
    } 
    catch (error) {
        next(createError(error)); 
    }
})

module.exports = router;
