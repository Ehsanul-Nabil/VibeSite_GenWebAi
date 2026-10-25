
import amqp from "amqplib";

const RABBITMQ_URL = process.env.RABBIT_URL;

let connection;
let channel;

export async function connect() {
    if (channel) return channel;

    connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();

    console.log("Connected to RabbitMQ");

    return channel;
}

export async function subscribeToQueue(queueName, callback) {
    if (!channel) await connect();

    await channel.assertQueue(queueName, { durable: true });

    await channel.consume(queueName, async (message) => {
        if (!message) return;

        try {
            await callback(message.content.toString());
            channel.ack(message);
        } catch (error) {
            console.error(`Error processing ${queueName}:`, error);
            channel.nack(message, false, false);
        }
    });
}

export async function publishToQueue(queueName, data) {
    if (!channel) await connect();

    await channel.assertQueue(queueName, { durable: true });

    channel.sendToQueue(
        queueName,
        Buffer.from(
            typeof data === "string" ? data : JSON.stringify(data)
        ),
        { persistent: true }
    );
}
