"use client";

import { useDispatch } from "react-redux";
import React, { useState } from "react";
import axios from "axios";
import { setLoginData } from "@/redux/store/slices/authSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import config from "@/config";

function Login({ type }) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${config.apiBaseUrl}/${type}/auth/login`,
                {
                    email,
                    password,
                }
            );

            dispatch(
                setLoginData({
                    token: response.data.token,
                    customer: response.data.sanitizedCustomer,
                })
            );

            if (response.data.token) {
                type === "user" ? router.push("/admin/dashboard") : router.back();
            }
        } catch (error) {
            setError(error?.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="LoginForm p-3 max-w-md mx-auto w-full">
            <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-3">
                {type === "user" ? "Admin Sign In" : "Customer Sign In"}
            </h2>

            <div className="border border-gray-200 rounded-lg shadow-sm p-4 bg-white">
                <p className="text-xs text-gray-600 leading-4">
                    If you have shopped with us before, please login below. New customers
                    may proceed to Billing & Shipping.
                </p>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded relative mt-4 text-sm">
                        <span>{error}</span>
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleLogin} className="mt-5">
                    <input
                        type="email"
                        placeholder="Username or Email"
                        className="w-full p-2.5 border rounded mb-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2.5 border rounded mb-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm mb-4 gap-2">
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            Remember me
                        </label>

                        <a href="#" className="text-green-600">
                            Forgot password?
                        </a>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center text-sm gap-3">
                        <div className="text-center sm:text-left">
                            Don’t have an account?{" "}
                            <Link href="/auth/signup" className="text-green-600 font-semibold">
                                Create
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="bg-green-600 text-white px-5 py-2 rounded w-full sm:w-auto"
                        >
                            Log In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;