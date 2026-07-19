import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const Orders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    function authHeaders() {
        const token = localStorage.getItem("koda-token");

        return {
            Authorization: token ? `Bearer ${token}` : "",
        };
    }

    const fetchOrders = async () => {
        try 
        {
            setLoading(true);
            setError("");

            const data = await api.get(/orders/my,{headers: authHeaders(),});

            if (data.success) {
                setOrders(data.orders);
            }
        } 
        catch (err) 
        {
            console.log(err);
            setError("Failed to load orders.");
        } 
        finally 
        {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) 
    {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) 
    {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    const getStatusColor = (status) => {
        switch (status) {
                case "delivered":
                        return "bg-green-100 text-green-700";

                case "pending":
                        return "bg-yellow-100 text-yellow-700";

                case "cancelled":
                        return "bg-red-100 text-red-700";

                case "returned":
                        return "bg-gray-200 text-gray-700";

                default:
                        return "bg-blue-100 text-blue-700";
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-bold text-text-primary mb-8"> My Orders </h1>

        {orders.length === 0 ? (
            <div className="text-center py-20">
                <h2 className="text-xl font-semibold text-text-primary"> No Orders Yet </h2>

                <p className="text-text-muted mt-2"> You haven't placed any orders yet. </p>
            </div>
        ) : (

            <div className="space-y-6">

                {orders.map((order) => (

                    <div
                        key={order._id}
                        className="bg-bg-card border border-border rounded-xl p-6 shadow-sm"
                    >

                    {/* Header */}

                    <div className="flex justify-between items-center">

                        <div>

                            <h3 className="font-semibold text-lg">
                                Order #{order._id.slice(-6)}
                            </h3>

                            <p className="text-sm text-text-muted">
                                {new Date(order.createdAt).toLocaleDateString()}
                            </p>

                        </div>

                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                        </span>

                    </div>

                    {/* Products */}

                    <div className="mt-6 space-y-4">

                        {order.items.map((item, index) => (

                            <div
                                key={index}
                                className="flex items-center justify-between"
                            >

                            <div className="flex items-center gap-4">

                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-20 h-20 object-cover rounded-lg border"
                                />

                                <div>

                                    <h4 className="font-medium">
                                      {item.name}
                                    </h4>

                                    <p className="text-sm text-text-muted">
                                      Qty : {item.quantity}
                                    </p>

                                </div>

                            </div>

                            <p className="font-semibold">
                              ${item.price}
                            </p>

                            </div>

                        ))}

                    </div>

                    {/* Footer */}

                    <div className="mt-6 flex justify-between items-center border-t pt-4">

                        <h3 className="text-lg font-bold">
                            Total : ${order.totalPrice}
                        </h3>

                        <button
                            onClick={() => navigate(`/orders/${order._id}`)}
                            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-bg-hover transition"
                        >
                            <FiArrowRight size={18} />
                        </button>

                    </div>

          </div>

        ))}

      </div>

    )}

    </div>
    );
};

export default React.memo(Orders);
