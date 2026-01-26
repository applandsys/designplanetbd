'use client';

import React, {useEffect, useState} from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { FiMenu } from 'react-icons/fi';
import Image from 'next/image';
import {fetchSettingData} from "@/services/site/SettingData";
import config from "@/config";
import Link from "next/link";
import {getCategories} from "@/services/ecommerce/getCategories";

export default function NavbarLeft() {

  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [siteLogo, setSiteLogo] = useState('logo.png');

  const [siteSetting, setSiteSetting] = useState([]);


  useEffect(() => {
    fetchSettingData().then((json) => {
      if (json.success) {
        setSiteLogo(json.data.logo);
      }
    }).catch(error => setError(error)
    ).finally(setLoading(false));

    getCategories()
        .then((res) => setCategories(res))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));

    fetchSettingData().then((json) => {
      if (json.success) {
        setSiteSetting(json.data);
      }
    }).catch(error => setError(error)
    ).finally(setLoading(false));

  }, []);

  if (loading) return <div className="p-4">Fetching Data ...</div>;

  return (
    <>
      <nav className="relative">

        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}


        <div
            className={`fixed top-0 left-0 h-full w-[350px] bg-white shadow-lg border border-green-100 z-50 
          transform transition-transform duration-300 ease-in-out 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          flex flex-col`}
                >

          <div className="flex items-center justify-between p-4 border-b">
            <Image
                src={`${config.publicPath}/${siteLogo}`}
                width={100}
                height={100}
                alt="logo"
                className="w-auto"
            />

            <button
                className="text-white text-2xl border border-gray-300 bg-[#5454a0] rounded-full hover:bg-[#8383ba]"
                onClick={() => setIsOpen(false)}
            >
              <IoClose />
            </button>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Search for items..."
              className="w-full px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-2 font-semibold text-sm text-[#5454a0] flex items-center gap-2 cursor-pointer">
            <FiMenu className="w-4 h-4" />
            Browse Categories
          </div>

          <ul className="space-y-2 text-sm">
            {categories?.length > 0 ? (
                categories.map((item, idx) => (
                    <li className="border-b  cursor-pointer py-2" key={idx}>
                      <Link
                          href={`/category/${item.slug}`}
                          key={idx}
                          className=""
                          onClick={() => setIsOpen(false)}
                      >
                        <div className="flex items-center px-2">
                          <Image
                              src={`${config.publicPath}/images/categories/${item.image}`}
                              alt={item.name}
                              width={60}
                              height={60}
                              className="w-6 h-6 rounded"
                          />
                          <span className="transition px-2 duration-300 ease-in-out cursor-pointer hover:text-[#3bb77e] text-xs font-semibold text-gray-700">
                                          {item.name}
                                      </span>
                        </div>
                      </Link>
                    </li>
                ))
            ) : (
                <li className="border-b  cursor-pointer">No categories found.</li>
            )}
          </ul>

          <ul className="space-y-2 text-sm">
            <li className="border-b py-2 cursor-pointer">Home</li>
            <li className="border-b py-2 cursor-pointer">About</li>
            <li className="border-b py-2 cursor-pointer">Contact</li>
          </ul>

          <div className="mt-6 border-t pt-4 text-sm text-gray-700 space-y-2">
            <div>Our location</div>
            <div>Sign Up</div>
            <div>Log In</div>
            <div>{siteSetting.phone}</div>
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-500 mb-2">Follow Us</p>
            <div className="flex gap-3">
              <a href="#" className="bg-gray-100 hover:bg-green-500 hover:text-white p-2 rounded-full">
                <FaFacebookF />
              </a>
              <a href="#" className="bg-gray-100 hover:bg-green-500 hover:text-white p-2 rounded-full">
                <FaTwitter />
              </a>
              <a href="#" className="bg-gray-100 hover:bg-green-500 hover:text-white p-2 rounded-full">
                <FaInstagram />
              </a>
              <a href="#" className="bg-gray-100 hover:bg-green-500 hover:text-white p-2 rounded-full">
                <FaPinterestP />
              </a>
            </div>
          </div>
        </div>

          <div className=" flex justify-between  mt-2 mx-2">
              {/* Left Side: Menu Links / Mobile Toggle */}
              <div className="flex justify-between ">
                  <ul className="hidden md:flex space-x-6 text-xs">
                    <li>
                       <Link href="/about"
                          className="text-gray-600 hover:text-blue-600 font-medium">About</Link>
                      </li>
                      <li>
                       <Link href="/contact"
                          className="text-gray-600 hover:text-blue-600 font-medium">Contact</Link>
                        </li>
                      <li><a href="#" className="hover:text-blue-500">Wishlist</a></li>
                      <li><a href="#" className="hover:text-blue-500">Order Tracking</a></li>
                  </ul>
                  {!isOpen && (
                      <button
                          className="block md:hidden focus:outline-none ml-2"
                          onClick={() => setIsOpen(true)}
                      >
                          <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                          >
                              <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 6h16M4 12h16M4 18h16"
                              />
                          </svg>
                      </button>
                  )}
              </div>

              {/* Right Side: Call Us */}
              <div className="text-xs md:text-sm text-right">
                  Need help? Call Us:{" "}
                  <span className="text-orange-600 font-bold">{siteSetting.phone}</span>
              </div>
          </div>

      </nav>
    </>
  );
}
