// server/kafka/consumer.js
const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "notification-group" });

const listenForNotifications = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "notifications" });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
      // Process the notification here, e.g., send it via Firebase
    },
  });
};

module.exports = listenForNotifications;
