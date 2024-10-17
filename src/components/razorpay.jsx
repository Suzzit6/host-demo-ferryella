import axios from "axios";

export const paymentHandler = async (
  Order,
  userAuth,
  userID,
) => {
  const amount = parseInt(Order.TotalAmt).toFixed(2);
  const currency = "INR";
  const receiptId = userID;
  console.log("amount ", amount);

  // const response = await fetch("http://localhost:5500/api/payment/razorpay-set", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     amount,
  //     currency,
  //     receipt: receiptId,
  //   }),
  // });
  const response = await axios.post(
    "http://localhost:5500/api/payment/razorpay-set",
    {
      amount,
      currency,
      receipt: receiptId,
    }
  );
  const order = await response.data;
  console.log("order", response);

  var option = {
    key: "",
    amount,
    currency,
    name: "Ferryella",
    description: "Test Transaction",
    image: "/assets/images/logo2.png",
    order_id: order.id,
    handler: async function (response) {
      try {
        const validateResponse = await axios.post(
          "http://localhost:5500/api/payment/razorpay-pay",
          {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }
        );
        console.log("jsonResponse", validateResponse.data);
        if (validateResponse.data.msg === "Transaction is legit!") {
          window.location.href = `/user/checkout/success/confirmed/?paymentId=${validateResponse.data.paymentId}&PayerID=${validateResponse.data.orderId}`;
        }
      } catch (error) {
        console.error("Validation error:", error);
      }
    },
    notes: {
      address: "Ferryella Office",
    },
    theme: {
      color: "#3399cc",
    },
  };

  var rzp1 = new Razorpay(option);
  rzp1.on("payment.failed", function (response) {
    console.error("Validation error:", error);
    window.location.href = '/user/cart';

  });

  rzp1.open();
};
