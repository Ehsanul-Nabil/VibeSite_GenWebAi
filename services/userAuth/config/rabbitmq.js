
// import amqp from "amqplib";

// const RABBITMQ_URL = process.env.RABBIT_URL;

// let connection;
// let channel;

// export async function connect() {
//     if (channel) return channel;

//     connection = await amqp.connect(RABBITMQ_URL);
//     channel = await connection.createChannel();

//     console.log("Connected to RabbitMQ");

//     return channel;
// }

// export async function subscribeToQueue(queueName, callback) {
//     if (!channel) await connect();

//     await channel.assertQueue(queueName, { durable: true });

//     await channel.consume(queueName, async (message) => {
//         if (!message) return;

//         try {
//             await callback(message.content.toString());
//             channel.ack(message);
//         } catch (error) {
//             console.error(`Error processing ${queueName}:`, error);
//             channel.nack(message, false, false);
//         }
//     });
// }

// export async function publishToQueue(queueName, data) {
//     if (!channel) await connect();

//     await channel.assertQueue(queueName, { durable: true });

//     channel.sendToQueue(
//         queueName,
//         Buffer.from(
//             typeof data === "string" ? data : JSON.stringify(data)
//         ),
//         { persistent: true }
//     );
// }


import amqp from "amqplib";

const RABBITMQ_URL = process.env.RABBIT_URL;

let connection = null;
let channel = null;
let isConnecting = false;

export async function connect() {
    // If channel exists and is active, return it
    if (channel) return channel;

    // Prevent concurrent connection attempts
    if (isConnecting) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return connect();
    }

    isConnecting = true;

    try {
        // Add heartbeat parameter to prevent idle TCP ECONNRESET drops
        connection = await amqp.connect(RABBITMQ_URL, { heartbeat: 60 });

        // Handle connection-level errors (Prevents Node.js crash)
        connection.on("error", (err) => {
            console.error("[RabbitMQ] Connection error:", err.message);
        });

        // Clean up references when connection drops so reconnects can happen
        connection.on("close", () => {
            console.warn("[RabbitMQ] Connection closed. Resetting references...");
            connection = null;
            channel = null;
        });

        channel = await connection.createChannel();

        channel.on("error", (err) => {
            console.error("[RabbitMQ] Channel error:", err.message);
        });

        channel.on("close", () => {
            console.warn("[RabbitMQ] Channel closed.");
            channel = null;
        });

        console.log("Connected to RabbitMQ");
        return channel;
    } catch (error) {
        console.error("[RabbitMQ] Failed to connect:", error.message);
        connection = null;
        channel = null;
        throw error;
    } finally {
        isConnecting = false;
    }
}


export async function subscribeToQueue(queueName, callback) {
    const ch = await connect();

    await ch.assertQueue(queueName, { durable: true });

    await ch.consume(queueName, async (message) => {
        if (!message) return;

        try {
            await callback(message.content.toString());
            ch.ack(message);
        } catch (error) {
            console.error(`Error processing ${queueName}:`, error);
            ch.nack(message, false, false);
        }
    });
}

export async function publishToQueue(queueName, data) {
    const ch = await connect();

    await ch.assertQueue(queueName, { durable: true });

    ch.sendToQueue(
        queueName,
        Buffer.from(
            typeof data === "string" ? data : JSON.stringify(data)
        ),
        { persistent: true }
    );
}