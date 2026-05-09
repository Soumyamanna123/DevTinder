const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userauth } = require("../middleware/auth");
const ConnectionRequest = require("../model/connectionRequest");
const { connect } = require("mongoose");
const requestRouter = express.Router();
const User = require("../model/user");

requestRouter.use(express.json());
requestRouter.use(cookieParser());

//send to connection request API
requestRouter.post(
  "/request/send/:status/:toUserId",
  userauth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      // Validate the status value
      const allowedStatus = ["ignore", "interested"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).send("Invalid Status value", status);
      }

      // Check if the toUserId exists in the User collection
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).send("User is not found");
      }

      // Prevent users from sending connection requests to themselves
      if (fromUserId.toString() === toUserId) {
        return res
          .status(400)
          .send("You cannot send a connection request to yourself");
      }

      // Check if a connection request already exists between the two users
      const existingRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingRequest) {
        return res.status(400).send("Connection request already exists");
      }

      // Create and save the connection request
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();

      res.send("connection request sent successfully");
    } catch (err) {
      res.status(400).send("cant send connection request");
    }
  },
);

//request response API
requestRouter.post(
  "/request/respond/:status/:requestId",
  userauth,
  async (req, res) => {
    try {
      const LoggedInUser = req.user;
      const requestId = req.params.requestId;
      const status = req.params.status;

      // Validate the status value
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).send("Invalid Status value", status);
      }

      // Find the connection request and ensure it belongs to the logged-in user and has the status "interested"
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: LoggedInUser._id,
        status: "interested",
      }).populate("fromUserId", ["firstName", "lastName", "emailId"]);

      if (!connectionRequest) {
        return res.status(404).send("Connection request not found");
      }

      // Update the status of the connection request
      connectionRequest.status = status;
      await connectionRequest.save();
      res.send("connection request  responded successfully");
    } catch (err) {
      res.status(400).send("cant respond to connection request");
    }
  },
);



//

module.exports = {
  requestRouter,
};
