'use client';

import React, { Dispatch, SetStateAction } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

interface DatePickerProps {
    value: Date | null;
    onChange: Dispatch<SetStateAction<Date | null>>;
    placeholder?: string;
    disabled?: boolean;
}

const CustomDatePicker = ({ value, onChange, placeholder, disabled }: DatePickerProps) => {
    return (
        <div className={`flex items-center rounded-md color-black  border border-gray-300 ${disabled ? "bg-gray-100" : "bg-white"}`}>
                         <button
                    className={`px-4 py-2 rounded-l-md ${disabled ? "bg-gray-400" : "bg-cyan-600 hover:bg-cyan-900"} transition-colors flex-shrink-0`}
                    disabled={disabled}
                    onClick={() => {onChange(new Date())}}
                >
                    <p className={`duration-100`}>X</p>
                </button>
            <DatePicker
                selected={value}
                onChange={(date) => onChange(date)}
                showIcon
                dateFormat="yyyy-MM-dd"
                className={`flex-1 px-4 py-2 rounded-r-md ${disabled ? "text-gray-400" : "text-black"} focus:outline-none`}
                disabled={disabled}
                minDate={new Date()}
                icon="fa fa-calendar"
            />
        </div>
    );
};

export default CustomDatePicker;