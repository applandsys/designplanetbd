"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import AdminMenu from '@/jsons/AdminMenu.json';

const AdminSidebar = () => {
    const [currentDropdown, setCurrentDropdown] = useState('');

    return (
        <div className="p-1 space-y-1 border-r border-r-green-300">
            <div className="text-xl font-bold p-[6px]">BrandName</div>
            <hr />
            <div className="space-y-1">
                {AdminMenu.map((menuItem) => (
                    menuItem.items.length === 0 ? (
                        <a
                            key={menuItem.section}
                            href="#"
                            className="block font-semibold p-2 bg-green-50 hover:bg-green-200 rounded"
                        >
                            {menuItem.section}
                        </a>
                    ) : (
                        <div key={menuItem.section} className="dropdown">
                            <a
                                href="#"
                                className={` block font-semibold p-2 hover:bg-green-200 rounded ${currentDropdown === menuItem.section ? "bg-green-300" : "bg-green-50"}`}
                                onClick={() => setCurrentDropdown(menuItem.section)}
                            >
                                <div className="flex justify-between items-center">
                                    <span>{menuItem.section}</span>
                                    <span className="ml-2">
                                      {currentDropdown === menuItem.section ? (
                                          <FaChevronUp />
                                      ) : (
                                          <FaChevronDown />
                                      )}
                                    </span>
                                </div>

                            </a>
                            <div
                                className={`transition-all duration-300 ease-in-out space-y-1 ml-4 ${currentDropdown === menuItem.section ? "opacity-100 max-h-[200px] visible" : "opacity-0 max-h-0 invisible"}`}
                                style={{ overflow: 'hidden' }}
                            >
                                {menuItem.items.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="mt-2 block p-1 hover:bg-green-200 rounded text-sm"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default AdminSidebar;
