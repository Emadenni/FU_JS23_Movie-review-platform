const mongoose = require("mongoose");
const User = require("../models/user-model");

exports.createUser = async (req, res) => {
    try {
        const userData = req.body;
        const user = new User(userData);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
      res.status(400).send(error);
        
    }
}

