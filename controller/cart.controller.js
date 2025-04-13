const cartDB = require("../models/cart.model");

const addToCart = async (req, res) => {
  try{
    const {_id} = req.user;
    const {bookId, lineId} = req.body;
    const lineItem = lineId ? await cartDB.findById(lineId) : null;
    if(!lineItem){
      const addItem = new cartDB({userId : _id, bookId, quantity : 1});
      await addItem.save();
      if(!addItem) return res.status(500).json({result : "Failed", message : "Failed to add Item"});
    } else{
      const addItem = await cartDB.findByIdAndUpdate(lineId, {$inc : {quantity : 1} });
      if(!addItem) return res.status(500).json({result : "Failed", message : "Failed to add Item"});
    }

    const cartItems = await cartDB.find({userId : _id});
    return res.status(201).json({result : "Success", data : cartItems})
  } catch(err) {
    console.log(err);
    res.status(500).json({result : "Failed", message : "Failed to Add Cart Item"});
  }
}

const removeFromCart = async (req, res) => {
  try{
    const {_id} = req.user;
    const {lineId} = req.params;
    const lineItem = await cartDB.findById(lineId);
    if(!lineItem){
      const removeItem = new cartDB({userId : _id, bookId, quantity : 1});
      await removeItem.save();
      if(!removeItem) return res.status(500).json({result : "Failed", message : "Failed to remove Item"});
    } else{
      if(lineItem.quantity <= 1){
        await cartDB.findByIdAndDelete(lineId);
      }
      const removeItem = await cartDB.findByIdAndUpdate(lineId, {$inc : {quantity : -1} });
      if(!removeItem) return res.status(500).json({result : "Failed", message : "Failed to remove Item"});
    }

    const cartItems = await cartDB.find({userId : _id});
    return res.status(201).json({result : "Success", data : cartItems})
  } catch(err) {
    console.log(err);
    res.status(500).json({result : "Failed", message : "Failed to remove Cart Item"});
  }
}

//get cart by userID
const getUserCart = async(req, res) => {
  try{
    const {_id} = req.user;
    const cart = await cartDB.find({userId : _id});
    if(!cart) {
      return res.status(404).json({result : "Failed", message : "User cart not found"});
    }
    res.status(200).json({result : "Success", data : cart});
  }
  catch(err){
    console.log(err);
  }
}

module.exports = {
  addToCart,
  removeFromCart,
  getUserCart
};
