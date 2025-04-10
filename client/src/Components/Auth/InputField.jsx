import React from 'react';

const InputField = ({ name, placeholder, label, value, onChange, type = "text" }) => {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name} className="text-sm font-medium text-black dark:text-white">{label}</label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="p-2 rounded-lg bg-white dark:bg-stone-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
            />
        </div>
    );
};

export default InputField;
