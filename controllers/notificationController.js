// server/controllers/notificationController.js
const firebaseService = require("../services/firebaseService");

exports.sendNotification = async (req, res) => {
  const { message } = req.body;
  console.log("Sending notification:", message);
  const numTokens = 10; // Change this number as needed
  const deviceTokens = generateSampleDeviceTokens(numTokens);

  try {
    // Send notification to each device token
    await Promise.all(
      deviceTokens.map((token) => {
        console.log(`Sending notification to: ${token}`);
        return firebaseService.sendNotification(token, message);
      })
    );

    res.status(200).json({ message: "Notifications sent successfully" });
  } catch (error) {
    console.error("Error sending notifications:", error);
    res.status(500).json({ error: "Error sending notifications" });
  }
};
function generateSampleDeviceTokens(numTokens) {
  const tokens = [];
  for (let i = 1; i <= numTokens; i++) {
    tokens.push(`device_token_${i}`);
  }
  return tokens;
}
