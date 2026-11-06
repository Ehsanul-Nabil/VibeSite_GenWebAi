
// import amqp from "amqplib";

// let connection;
// let channel;

// export async function connectRabbitMQ() {
//     if (channel) return channel;

//     connection = await amqp.connect(process.env.RABBIT_URL);
//     channel = await connection.createChannel();

//     await channel.assertQueue("credits.deduct", {
//         durable: true,
//     });

//     console.log("[Project Service] RabbitMQ connected");

//     return channel;
// }

// export async function publishToQueue(queueName, data) {
//     const ch = await connectRabbitMQ();

//     ch.sendToQueue(
//         queueName,
//         Buffer.from(JSON.stringify(data)),
//         { persistent: true }
//     );
// }


import amqp from "amqplib";

let connection = null;
let channel = null;
let isConnecting = false;

export async function connectRabbitMQ() {
    if (channel) return channel;

    if (isConnecting) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return connectRabbitMQ();
    }

    isConnecting = true;

    try {
        connection = await amqp.connect(process.env.RABBIT_URL, { heartbeat: 60 });

        // Handle connection errors & close events (prevents app crash)
        connection.on("error", (err) => {
            console.error("[Project Service] RabbitMQ Connection error:", err.message);
        });

        connection.on("close", () => {
            console.warn("[Project Service] RabbitMQ Connection closed. Resetting references...");
            connection = null;
            channel = null;
        });

        channel = await connection.createChannel();

        channel.on("error", (err) => {
            console.error("[Project Service] RabbitMQ Channel error:", err.message);
        });

        channel.on("close", () => {
            console.warn("[Project Service] RabbitMQ Channel closed.");
            channel = null;
        });

        await channel.assertQueue("credits.deduct", {
            durable: true,
        });

        console.log("[Project Service] RabbitMQ connected");
        return channel;
    } catch (error) {
        console.error("[Project Service] Failed to connect to RabbitMQ:", error.message);
        connection = null;
        channel = null;
        throw error;
    } finally {
        isConnecting = false;
    }
}

export async function publishToQueue(queueName, data) {
    const ch = await connectRabbitMQ();

    ch.sendToQueue(
        queueName,
        Buffer.from(JSON.stringify(data)),
        { persistent: true }
    );
}