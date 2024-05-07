// server/server.js
const app = require("./app");
const listenForNotifications = require("./kafka/consumer");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  listenForNotifications();
});
