import { Kafka } from 'kafkajs';
import { env } from '@/config/env';

export const kafka = new Kafka({
    clientId: 'nodejs-service',
    brokers: [env.KAFKA_BROKER]
});
