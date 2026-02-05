const { kafka } = require('../config/kafka');

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'test-group' });

const connectKafka = async () => {
    await producer.connect();
    await consumer.connect();
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                value: message.value.toString(),
            });
        },
    });
};

const sendMessage = async (topic, message) => {
    await producer.send({
        topic,
        messages: [
            { value: message },
        ],
    });
};

module.exports = { connectKafka, sendMessage };
