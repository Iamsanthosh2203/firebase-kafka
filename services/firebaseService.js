// server/services/firebaseService.js
const sendNotification = require("../kafka/producer");

exports.sendNotification = async (token, message) => {
  await sendNotification(message);
};
