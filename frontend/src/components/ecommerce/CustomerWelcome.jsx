import { useSelector } from 'react-redux';
import UserIcon from "@/components/icons/UserIcon";
import React from "react";

const CustomerWelcome = ({name}) => {
    return (
        <div>
            <h3 className="font-bold xs:text-xs "><span>Welcome,</span> <span className="text-green-600">{name}</span> </h3>
        </div>
    );
};

export default CustomerWelcome;
