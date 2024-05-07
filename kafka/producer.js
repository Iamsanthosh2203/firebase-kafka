// server/kafka/producer.js
const { Kafka, Partitioners } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});

const sendNotification = async (message) => {
  await producer.connect();
  await producer.send({
    topic: "notifications",
    messages: [{ value: message }],
  });
  await producer.disconnect();
};

module.exports = sendNotification;
