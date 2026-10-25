import amqp from "amqplib";

const RABBITMQ_URL = process.env.RABBIT_URL;

let connection;
let channel;

export async function connect() {
  if (channel) return channel;

  connection = await amqp.connect(RABBITMQ_URL);
  channel = await connection.createConfirmChannel();

  console.log("Connected to RabbitMQ");

  return channel;
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

  await ch.waitForConfirms();
}


// import amqp from 'amqplib';

// const RABBITMQ_URL = process.env.RABBIT_URL;

// let connection, channel;

// async function connect() {
//     connection = await amqp.connect(RABBITMQ_URL);
//     channel = await connection.createChannel();
//     console.log('Connected to RabbitMQ');
// }

// async function subscribeToQueue(queueName, callback) {
//     if (!channel) await connect();
//     await channel.assertQueue(queueName);
//     channel.consume(queueName, (message) => {
//         callback(message.content.toString());
//         channel.ack(message);
//     });
// }


// // export async function subscribeToQueue(queueName, callback) {
// //   const ch = await connect();
// //   await ch.assertQueue(queueName, { durable: true });
// //   await ch.consume(queueName, async (message) => {
// //     if (!message) return;
// //     try {
// //       await callback(message.content.toString());
// //       ch.ack(message);
// //     } catch (error) {
// //       console.error(`Error processing ${queueName}:`, error);
// //       ch.nack(message, false, false);
// //     }
// //   });
// // }

// async function publishToQueue(queueName, data) {
//     if (!channel) await connect();
//     await channel.assertQueue(queueName);
//     channel.sendToQueue(queueName, Buffer.from(data));
// }

// // export async function publishToQueue(queueName, data) {
// //   const ch = await connect();
// //   await ch.assertQueue(queueName, { durable: true });
// //   ch.sendToQueue(
// //     queueName,
// //     Buffer.from(
// //       typeof data === "string" ? data : JSON.stringify(data)
// //     ),
// //     { persistent: true }
// //   );
// //   await ch.waitForConfirms();
// // }

// export {
//     subscribeToQueue,
//     publishToQueue,
//     connect,
// };