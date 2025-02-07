'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAirports } from '@/lib/slices/airportsSlice';
import { RootState, AppDispatch } from '@/lib/store';
import DropdownCard from '../../atoms/dropdownCard/DropdownCard';
import DropdownError from '../../atoms/dropdownError/DropdownError';
import DropdownModal from '../../atoms/dropdownModal/DropdownModal';
import { DropdownItem } from '@/app/utils/DropDownItemType';

interface Props {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    nonQuery?: boolean;
    values?: DropdownItem[];
}

const DynamicDropdown = ({ value, setValue, nonQuery = false, values = [] }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const { results, loading, error } = useSelector((state: RootState) => state.airports);
    const [isOpen, setIsOpen] = useState(false);
    const debouncer = useRef<NodeJS.Timeout | null>(null);

    // Fetch airports when the input value changes
    useEffect(() => {
        if (debouncer.current) {
            clearTimeout(debouncer.current);
        }

        if (value && !nonQuery) {
            debouncer.current = setTimeout(() => {
                dispatch(fetchAirports(value));
            }, 500);
        }

        return () => {
            if (debouncer.current) {
                clearTimeout(debouncer.current);
            }
        };
    }, [value, dispatch, nonQuery]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        setIsOpen(true);
    };

    const handleItemClick = (item: DropdownItem) => () => {
        setValue(item.iataCode);
        setIsOpen(false);
    };

    const handleBlur = () => {
        setTimeout(() => setIsOpen(false), 200);
    };

    return (
        <div className="relative flex-1">
            <div className="flex items-center rounded-md color-black border border-gray-300">
                <input
                    type="text"
                    className="flex-1 px-4 py-2 rounded-l-md text-black focus:outline-none"
                    value={value}
                    onChange={handleInputChange}
                    onFocus={() => setIsOpen(true)}
                    onBlur={handleBlur}
                    placeholder="Search..."
                />
                <button
                    className="px-4 py-2 bg-cyan-600 rounded-r-md hover:bg-cyan-900 transition-colors flex-shrink-0"
                    onClick={() => setIsOpen(!isOpen)}
                    onBlur={handleBlur}
                >
                    <p className={`duration-100 font-bold ${isOpen ? "rotate-180" : ""}`}>V</p>
                </button>
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 bg-white rounded-b-md shadow-lg z-10 max-h-60 overflow-y-auto mt-1">
                    {loading && !nonQuery ? (
                        <DropdownModal />
                    ) : nonQuery === false ? (
                        results.length > 0 ? (
                            results.map((item, index) => (
                                <DropdownCard
                                    item={item}
                                    key={index}
                                    onMouseDown={handleItemClick(item)} // Pass a function reference
                                />
                            ))
                        ) : (
                            <DropdownError />
                        )
                    ) : (
                        values.map((item, index) => (
                            <DropdownCard
                                item={item}
                                key={index}
                                onMouseDown={handleItemClick(item)} // Pass a function reference
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default DynamicDropdown;