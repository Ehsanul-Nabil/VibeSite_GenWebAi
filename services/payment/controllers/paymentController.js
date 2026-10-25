import axios from 'axios';
import { publishToQueue } from '../config/rabbitmq.js';

// Map plan types to credits added & price
const PLAN_CONFIG = {
  pro: {
    price: '599.00',
    credits: 500,
    name: 'Pro Plan Subscription',
  },
  enterprise: {
    price: '999.00',
    credits: 1000,
    name: 'Enterprise Plan Subscription',
  },
};

const serverUrl = process.env.SERVER_URL || 'http://localhost:3000';
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';


export const initiatePayment = async (req, res) => {
  const { planType } = req.body;

  // Extract userId matching your JWT payload key
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ error: 'User ID not found in token' });
  }

  const selectedPlan = PLAN_CONFIG[planType];
  if (!selectedPlan) {
    return res.status(400).json({ error: 'Invalid or missing plan type' });
  }

  const tran_id = `TRAN_${Date.now()}`;

  const postData = {
    store_id: process.env.SSLCOMMERZ_STORE_ID,
    store_passwd: process.env.SSLCOMMERZ_STORE_PASSWORD,
    total_amount: selectedPlan.price,
    currency: 'BDT',
    tran_id: tran_id,
    success_url: `${serverUrl}/api/payment/success?tran_id=${tran_id}&plan=${planType}&userId=${userId}`,
    fail_url: `${serverUrl}/api/payment/fail?tran_id=${tran_id}`,
    cancel_url: `${serverUrl}/api/payment/cancel?tran_id=${tran_id}`,
    ipn_url: `${serverUrl}/api/payment/ipn`,
    cus_name: 'Customer',
    cus_email: req.user?.email || 'customer@example.com',
    cus_add1: 'Dhaka',
    cus_city: 'Dhaka',
    cus_country: 'Bangladesh',
    cus_phone: '01700000000',
    shipping_method: 'NO',
    product_name: selectedPlan.name,
    product_category: 'Software Subscription',
    product_profile: 'general',
  };

  try {
    const response = await axios.post(
      'https://sandbox.sslcommerz.com/gwprocess/v4/api.php',
      new URLSearchParams(postData).toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    if (response.data?.GatewayPageURL) {
      return res.status(200).json({ sessionUrl: response.data.GatewayPageURL });
    }

    return res.status(400).json({ error: response.data?.failedreason || 'Initiation failed' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Payment Success Callback
export const paymentSuccess = async (req, res) => {
  const { val_id } = req.body;
  const { tran_id, plan, userId } = req.query;

  const validationUrl = `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${val_id}&store_id=${process.env.SSLCOMMERZ_STORE_ID}&store_passwd=${process.env.SSLCOMMERZ_STORE_PASSWORD}&format=json`;

  try {
    const response = await axios.get(validationUrl);

    if (
      response.data.status === 'VALID' ||
      response.data.status === 'VALIDATED'
    ) {
      const selectedPlan = PLAN_CONFIG[plan];

      // if (selectedPlan && userId) {
      //   // Publish the event for UserAuth to update MongoDB
      //   await publishToQueue('payment.completed', {
      //     eventId: tran_id,
      //     paymentId: tran_id,
      //     userId,
      //     plan,
      //     credits: selectedPlan.credits,
      //     amount: selectedPlan.price,
      //     currency: 'BDT',
      //   });
      // }

      // Payment Success Callback
      if (selectedPlan && userId) {
        const payload = {
          eventId: tran_id,
          paymentId: tran_id,
          userId,
          plan,
          credits: selectedPlan.credits,
          amount: selectedPlan.price,
          currency: 'BDT',
        };

        // Serialize object to JSON string before sending
        await publishToQueue('payment.completed', JSON.stringify(payload));
      }

      return res.redirect(
        `${clientUrl}/payment-success?tran_id=${tran_id}&plan=${plan}`
      );
    } else {
      console.error('Payment validation status failed:', response.data.status);
      return res.redirect(`${clientUrl}/payment-failed`);
    }
  } catch (error) {
    console.error('Validation request error:', error.message);
    return res.redirect(`${clientUrl}/payment-failed`);
  }
};

export const paymentFail = (req, res) => {
  console.log('--- Payment Failed Callback Body ---', req.body);
  return res.redirect(`${clientUrl}/payment-failed`);
};

export const paymentCancel = (req, res) => {
  return res.redirect(`${clientUrl}/payment-cancelled`);
};

export default {
  initiatePayment,
  paymentSuccess,
  paymentFail,
  paymentCancel,
};



// import axios from 'axios';
// import { User } from '../models/User.js'; // Adjust relative path to your User schema file

// // Map plan types to credits added & price
// const PLAN_CONFIG = {
//   pro: {
//     price: '599.00',
//     credits: 500,
//     name: 'Pro Plan Subscription',
//   },
//   enterprise: {
//     price: '999.00',
//     credits: 1000,
//     name: 'Enterprise Plan Subscription',
//   },
// };

// const serverUrl = process.env.SERVER_URL || 'http://localhost:3000';
// const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';


// export const initiatePayment = async (req, res) => {
//   const { planType } = req.body;

//   // Extract userId matching your JWT payload key
//   const userId = req.user?.userId;

//   if (!userId) {
//     return res.status(401).json({ error: 'User ID not found in token' });
//   }

//   const selectedPlan = PLAN_CONFIG[planType];
//   if (!selectedPlan) {
//     return res.status(400).json({ error: 'Invalid or missing plan type' });
//   }

//   const tran_id = `TRAN_${Date.now()}`;

//   const postData = {
//     store_id: process.env.SSLCOMMERZ_STORE_ID,
//     store_passwd: process.env.SSLCOMMERZ_STORE_PASSWORD,
//     total_amount: selectedPlan.price,
//     currency: 'BDT',
//     tran_id: tran_id,
//     success_url: `${serverUrl}/api/payment/success?tran_id=${tran_id}&plan=${planType}&userId=${userId}`,
//     fail_url: `${serverUrl}/api/payment/fail?tran_id=${tran_id}`,
//     cancel_url: `${serverUrl}/api/payment/cancel?tran_id=${tran_id}`,
//     ipn_url: `${serverUrl}/api/payment/ipn`,
//     cus_name: 'Customer',
//     cus_email: req.user?.email || 'customer@example.com',
//     cus_add1: 'Dhaka',
//     cus_city: 'Dhaka',
//     cus_country: 'Bangladesh',
//     cus_phone: '01700000000',
//     shipping_method: 'NO',
//     product_name: selectedPlan.name,
//     product_category: 'Software Subscription',
//     product_profile: 'general',
//   };

//   try {
//     const response = await axios.post(
//       'https://sandbox.sslcommerz.com/gwprocess/v4/api.php',
//       new URLSearchParams(postData).toString(),
//       { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
//     );

//     if (response.data?.GatewayPageURL) {
//       return res.status(200).json({ sessionUrl: response.data.GatewayPageURL });
//     }

//     return res.status(400).json({ error: response.data?.failedreason || 'Initiation failed' });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

// // Payment Success Callback
// export const paymentSuccess = async (req, res) => {
//   const { val_id } = req.body;
//   const { tran_id, plan, userId } = req.query;

//   const validationUrl = `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${val_id}&store_id=${process.env.SSLCOMMERZ_STORE_ID}&store_passwd=${process.env.SSLCOMMERZ_STORE_PASSWORD}&format=json`;

//   try {
//     const response = await axios.get(validationUrl);

//     if (
//       response.data.status === 'VALID' ||
//       response.data.status === 'VALIDATED'
//     ) {
//       const selectedPlan = PLAN_CONFIG[plan];

//       if (selectedPlan && userId) {
//         // Increment user credits and update plan in MongoDB
//         await User.findByIdAndUpdate(userId, {
//           $inc: { credits: selectedPlan.credits },$set: { plan: plan }
//         });
//       }

//       return res.redirect(
//         `${clientUrl}/payment-success?tran_id=${tran_id}&plan=${plan}`
//       );
//     } else {
//       console.error('Payment validation status failed:', response.data.status);
//       return res.redirect(`${clientUrl}/payment-failed`);
//     }
//   } catch (error) {
//     console.error('Validation request error:', error.message);
//     return res.redirect(`${clientUrl}/payment-failed`);
//   }
// };

// export const paymentFail = (req, res) => {
//   console.log('--- Payment Failed Callback Body ---', req.body);
//   return res.redirect(`${clientUrl}/payment-failed`);
// };

// export const paymentCancel = (req, res) => {
//   return res.redirect(`${clientUrl}/payment-cancelled`);
// };

// export default {
//   initiatePayment,
//   paymentSuccess,
//   paymentFail,
//   paymentCancel,
// };