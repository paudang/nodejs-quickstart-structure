const { Kafka } = require('kafkajs');
const { env } = require('./env');

const kafka = new Kafka({
    clientId: 'nodejs-service',
    brokers: [env.KAFKA_BROKER]
});

module.exports = { kafka };
