import React, { useState } from 'react';

const AlertBox = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-white p-4 rounded-md shadow-md">
                <div className="p-10">
                    <p className="text-lg font-semibold text-gray-800">{message}</p>
                </div>
                <button
                    onClick={onClose}
                    className="w-full py-2.5 px-6 mt-4 text-sm font-medium bg-black text-white rounded-md border-black hover:bg-opacity-50 transition duration-300 cursor-pointer">
                    Close
                </button>
            </div>
        </div>
    );
};

export default AlertBox;