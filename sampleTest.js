const { Kafka, Partitioners } = require("kafkajs");

// Initialize Kafka client
const kafka = new Kafka({
  clientId: "my-nodejs-app",
  brokers: ["localhost:9092"], // Replace with your Kafka broker(s)
});

// Create a Kafka producer
const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});

// Create a Kafka consumer
const consumer = kafka.consumer({ groupId: "my-group" });

// Define topic name
const topic = "test-topic";

// Start the server
async function startServer() {
  try {
    // Connect the producer and consumer to Kafka
    await Promise.all([producer.connect(), consumer.connect()]);

    // Subscribe to the topic
    await consumer.subscribe({ topic, fromBeginning: true });

    // Start consuming messages
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value.toString(),
          offset: message.offset,
        });
      },
    });

    // Send a message to Kafka
    await producer.send({
      topic,
      messages: [{ value: "Hello Kafka from Node.js!" }],
    });

    console.log("Message sent to Kafka");
  } catch (error) {
    console.error("Error in Kafka:", error);
  }
}

startServer();
