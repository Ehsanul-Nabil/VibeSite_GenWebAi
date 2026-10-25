import { subscribeToQueue } from "../config/rabbitmq.js";
import { User } from "../models/User.js";

// export async function startPaymentConsumer() {
//   await subscribeToQueue("payment.completed", async (message) => {
//     const event = JSON.parse(message);

//     const { userId, plan, credits } = event;

//     if (!userId || !["pro", "enterprise"].includes(plan) || !Number.isInteger(credits) || credits <= 0 ) {
//       throw new Error("Invalid payment event");
//     }

//     const user = await User.findByIdAndUpdate( userId,
//       {
//         $inc: { credits },
//         $set: { plan },
//       },
//       { new: true, runValidators: true }
//     );

//     if (!user) {
//       throw new Error(`User not found: ${userId}`);
//     }

//     console.log(`Updated user ${userId}: ${plan}, +${credits} credits`);
//   });
// }

export async function startPaymentConsumer() {
  await subscribeToQueue("payment.completed", async (message) => {
    try {
      const event = JSON.parse(message);
      const { userId, plan, credits } = event;

      if (!userId || !["pro", "enterprise"].includes(plan) || !Number.isInteger(credits) || credits <= 0) {
        console.error("Invalid payment event payload:", event);
        return;
      }

      const user = await User.findByIdAndUpdate(
        userId,
        {
          $inc: { credits: credits },$set: { plan: plan },
        },
        { new: true, runValidators: true }
      );

      if (!user) {
        console.error(`User not found: ${userId}`);
        return;
      }

      console.log(`Updated user ${userId}: ${plan}, +${credits} credits`);
    } catch (err) {
      console.error("[paymentConsumer Error]:", err.message);
    }
  });
}