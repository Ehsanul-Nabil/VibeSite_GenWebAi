
// import { subscribeToQueue } from "../config/rabbitmq.js";
// import { User } from "../models/User.js";

// export async function startCreditConsumer() {
//     await subscribeToQueue("credits.deduct", async (message) => {
//         const data = JSON.parse(message);

//         const { userId, amount, projectId, eventId } = data;

//         if ( !userId || !projectId || !eventId || !Number.isInteger(amount) ||amount <= 0 ) {
//             throw new Error("Invalid credit deduction message");
//         }

//         const user = await User.findOneAndUpdate(
//             {
//                 _id: userId,
//                 credits: { $gte: amount },
//             },
//             {
//                 $inc: { credits: -amount },
//             },
//             { new: true }
//         );

//         if (!user) {
//             console.log(`Credit deduction skipped: user not found or insufficient credits. Project: ${projectId}`);
//             return;
//         }

//         console.log(`Deducted ${amount} credits from user ${userId}. Remaining: ${user.credits}`);
//     });
// }



import { subscribeToQueue } from "../config/rabbitmq.js";
import {User} from "../models/User.js";

export async function startCreditConsumer() {
  await subscribeToQueue("credits.deduct", async (message) => {
    try {
      const data = JSON.parse(message);
      const { userId, amount, projectId, eventId } = data;

      if (!userId || !projectId || !eventId || !Number.isInteger(amount) || amount <= 0) {
        console.error("Invalid credit deduction payload:", data);
        return;
      }

      // Multiply by -1 to perform decrement
      const user = await User.findOneAndUpdate(
        {
          _id: userId,
          credits: { $gte: amount }, // Prevent negative credit balance
        },
        {
          $inc: { credits: -amount }, // ✅ Correct variable usage
        },
        { new: true }
      );

      if (!user) {
        console.log(`Credit deduction skipped: user not found or insufficient credits. Project: ${projectId}`);
        return;
      }

      console.log(`Deducted ${amount} credits from user ${userId}. Remaining: ${user.credits}`);
    } catch (err) {
      console.error("[creditConsumer Error]:", err.message);
    }
  });
}