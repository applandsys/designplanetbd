"use client";

import {useEffect, useState} from "react";
import {getOrders} from "@/services/ecommerce/getOrders";
import config from "@/config";

const AllOrders = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders().then(r => setOrders(r.data)).catch(e => console.error(e));
    }, []);

    useEffect(() => {
        console.log(orders);
    }, [orders]);


    const handleChangeStatus = async (orderId) => {

        const response = await fetch(`${config.apiBaseUrl}/admin/order/make-paid`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ orderId }),
        });

        const data = await response.json();

        getOrders().then(r => setOrders(r.data)).catch(e => console.error(e));

    };

    return (
        <div className="p-2">
            <h2 className="text-xl font-bold">Order List</h2>
            <table className="table-auto border-collapse border border-gray-300 w-full">
                <thead className="bg-gray-100">
                    <th className="border border-gray-300 px-1 py-1 text-left"> ID</th>
                    <th className="border border-gray-300 px-1 py-1 text-left">Customer</th>
                    <th className="border border-gray-300 px-1 py-1 text-left"> Name</th>
                    <th className="border border-gray-300 px-1 py-1 text-left">Phone </th>
                    <th className="border border-gray-300 px-1 py-1 text-left">Products</th>
                    <th className="border border-gray-300 px-1 py-1 text-left">Hub</th>
                    <th className="border border-gray-300 px-1 py-1 text-left">Payment</th>
                    <th className="border border-gray-300 px-1 py-1 text-left">Status</th>
                    <th className="border border-gray-300 px-1 py-1 text-left">Action</th>
                </thead>
                <tbody>
                {orders.length > 0 && (
                    orders.map((order) => (
                        <tr className="hover:bg-gray-50" key={order.id}>
                             <td className="border border-gray-300 px-1 py-1">{order.id}</td>
                             <td className="border border-gray-300 px-1 py-1">{order.customer.uid}</td>
                             <td className="border border-gray-300 px-1 py-1">{order.customer.first_name} {order.customer.last_name}</td>
                             <td className="border border-gray-300 px-1 py-1">{order.customer.phone} </td>
                             <td className="border border-gray-300 px-1 py-1">
                                 <table>
                                     <tr>
                                         <th> Product </th>   <th> Price </th>  <th> Qty  </th>
                                     </tr>
                                     {order?.orderItems?.length && order?.orderItems.map((orderItem) => (
                                         <tr key={orderItem.id}>
                                             <td className="border border-gray-300 px-1 py-1">{orderItem.product.name}</td>
                                             <td className="border border-gray-300 px-1 py-1">{orderItem.price}</td>
                                             <td className="border border-gray-300 px-1 py-1">{orderItem.quantity}</td>
                                         </tr>
                                     ))}
                                 </table>
                             </td>
                            <td className="border border-gray-300 px-1 py-1">{order.customerId}</td>
                             <td className="border border-gray-300 px-1 py-1">Bdt. {order.totalAmount}</td>
                             <td className="border border-gray-300 px-1 py-1"><span className="text-xs bg-amber-300 rounded-md p-1">{order.status}</span></td>
                             <td className="border border-gray-300 px-1 py-1"> {order.status==="PENDING" && (<button onClick={()=>handleChangeStatus(order.id)} className="bg-green-500 rounded-md text-xs p-1 text-white">Paid</button>)} </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>

        </div>
    );
};

export default AllOrders;