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
    let collections = await Collection.find({
      owner: userId
    });
    res.status(200).json(collections);
  } catch (error) {
    next(createError(error));
  }
});

//POST a new collection and add it to a user
router.post("/", async (req, res, next) => {
    const {owner, items, name} = req.body
    try {
        const newCollection = await Collection.create({
            name,
            items,
            owner,
            default: true,
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

//PATCH / UPDATE a collection by ID
router.patch("/id/:collectionId", async (req, res, next) => {
    const { collectionId } = req.params;
    const { items, name} = req.body;
    console.log("given item in BE ", items)
    try {
        const result = await Collection.findByIdAndUpdate({_id: collectionId}, {$set: {items: items}, name: name}) // <-- possible fix of SET
        console.log("result nach update DB ", result)
        res.status(200).json({result})
    } 
    catch (error) {
        next(createError(error)); 
    }
})

//DETELE a collection by ID
router.delete("/id/:collectionId", isLoggedIn, async (req, res, next) => {
    const collectionId = req.params.collectionId;
    try {
        await Collection.findByIdAndRemove({_id: collectionId})
        res.status(204).json({})
    } 
    catch (error) {
        next(createError(error)); 
    }
})

module.exports = router;