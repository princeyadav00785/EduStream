"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PaymentFailedPage = () => {
  const router = useRouter();
  const { stripeId } = router.query;
  const [paymentDetails, setPaymentDetails] = useState<any>(null);

  useEffect(() => {
    if (!stripeId) return;

    const fetchPaymentDetails = async () => {
      try {
        const res = await fetch(`http://localhost:4003/api/payment/payment-status?session_id=${stripeId}`);
        if (!res.ok) throw new Error("Failed to fetch payment details");

        const data = await res.json();
        setPaymentDetails(data.paymentData);
      } catch (error) {
        console.error("Error fetching payment details:", error);
      }
    };

    fetchPaymentDetails();
  }, [stripeId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-green-600">Payment Failed!..</h1>
      <p className="text-gray-600 mt-2">Sorry, Please Try Again you for your purchase.</p>

      {paymentDetails && (
        <div className="mt-4 p-4 bg-gray-100 rounded shadow-md">
          <p><strong>Transaction ID:</strong> {paymentDetails.id}</p>
          <p><strong>Amount:</strong> ₹{paymentDetails.amount / 100}</p>
          <p><strong>Status:</strong> {paymentDetails.status}</p>
        </div>
      )}

      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        onClick={() => window.location.href = "/courses/allCourses"}>
        Go to Home
      </button>
    </div>
  );
};

export default PaymentFailedPage;
