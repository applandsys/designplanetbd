"use client";

import { useSearchParams } from "next/navigation";

export default function OrderSuccess() {
    const params = useSearchParams();

    const orderDetail = JSON.parse(params.get("orderDetail"));
    const orderId = params.get("order_id");
    const amount = params.get("amount");
    const status = params.get("status");

    console.log(orderDetail);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="max-w-xl w-full bg-white shadow-lg rounded-2xl p-10 text-center">

                <div className="bg-green-100 p-4 rounded-full w-fit mx-auto mb-4">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className="text-3xl font-bold text-gray-800">Order Successful!</h1>
                <p className="text-gray-600 mt-2">Your order has been placed.</p>

                <div className="mt-6 bg-gray-100 p-6 rounded-xl text-left">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800">Order Details</h2>

                    <div className="flex justify-between mb-3">
                        <span className="text-gray-600">Order ID</span>
                        <span className="font-medium text-gray-900">{orderDetail.data.id}</span>
                    </div>

                    <div className="flex justify-between mb-3">
                        <span className="text-gray-600">Status</span>
                        <span className="font-medium text-amber-600">Pending</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-600">Total Paid</span>
                        <span className="font-medium text-gray-900">${orderDetail.data.totalAmount}</span>
                    </div>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="/orders"
                        className="px-6 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition"
                    >
                        View Order
                    </a>

                    <a
                        href="/user/orders"
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition"
                    >
                        Continue Shopping
                    </a>
                </div>
            </div>
        </div>
    );
}
