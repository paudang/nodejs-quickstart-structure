import { kafka } from '../config/kafka';
import { EachMessagePayload } from 'kafkajs';

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'test-group' });

export const connectKafka = async () => {
    await producer.connect();
    await consumer.connect();
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
            console.log({
                value: message.value?.toString(),
            });
        },
    });
};

export const sendMessage = async (topic: string, message: string) => {
    await producer.send({
        topic,
        messages: [
            { value: message },
        ],
    });
};
