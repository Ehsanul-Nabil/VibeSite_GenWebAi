
import amqp from "amqplib";

let connection;
let channel;

export async function connectRabbitMQ() {
    if (channel) return channel;

    connection = await amqp.connect(process.env.RABBIT_URL);
    channel = await connection.createChannel();

    await channel.assertQueue("credits.deduct", {
        durable: true,
    });

    console.log("[Project Service] RabbitMQ connected");

    return channel;
}

export async function publishToQueue(queueName, data) {
    const ch = await connectRabbitMQ();

    ch.sendToQueue(
        queueName,
        Buffer.from(JSON.stringify(data)),
        { persistent: true }
    );
}
