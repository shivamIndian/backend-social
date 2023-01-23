const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    senderId: {
      type: String,
    },
    text: {
      type: String,
    },
    read: {
      type: Number,
      default:0,
  },
    recevierId: {
      type: String,
    },
    
    postId: {
        type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);