"use client";
import { useState, useEffect, useRef } from 'react';

type SearchBarProps = {
    /** Default location value */
    defaultLocation?: string;
    /** Default date value */
    defaultDate?: string;
    /** Default time value */
    defaultTime?: string;
    /** List of available locations */
    locations?: string[];
    /** Callback when location changes */
    onLocationChange?: (location: string) => void;
    /** Callback when date changes */
    onDateChange?: (date: string) => void;
    /** Callback when time changes */
    onTimeChange?: (time: string) => void;
    /** Callback when search is triggered */
    onSearch: (searchParams: {
        location: string;
        date: string;
        time: string;
    }) => void;
};

const SearchBar = ({ 
    defaultLocation = "",
    defaultDate = "",
    defaultTime = "",
    locations = [],
    onLocationChange,
    onDateChange,
    onTimeChange,
    onSearch 
}: SearchBarProps) => {
    const [location, setLocation] = useState(defaultLocation);
    const [date, setDate] = useState(defaultDate);
    const [time, setTime] = useState(defaultTime);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [displayDate, setDisplayDate] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Update internal state when default values change
    useEffect(() => {
        setLocation(defaultLocation);
    }, [defaultLocation]);

    useEffect(() => {
        setDate(defaultDate);
        if (defaultDate) {
            const dateObj = new Date(defaultDate);
            const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            setDisplayDate(formattedDate);
        }
    }, [defaultDate]);

    useEffect(() => {
        setTime(defaultTime);
    }, [defaultTime]);

    const handleLocationChange = (newLocation: string) => {
        setLocation(newLocation);
        onLocationChange?.(newLocation);
        setIsDropdownOpen(false);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value;
        setDate(newDate);
        const dateObj = new Date(newDate);
        const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        setDisplayDate(formattedDate);
        onDateChange?.(newDate);
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = e.target.value;
        setTime(newTime);
        onTimeChange?.(newTime);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch({ location, date, time });
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg max-w-4xl mx-auto"
        >
            <div className="flex-1 relative p-4 md:border-r border-gray-200" ref={dropdownRef}>
                <div className="relative">
                    <button
                        type="button"
                        className="w-full px-4 py-2 text-left bg-white hover:bg-gray-50"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        {location || "Select a city"}
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
                            {locations.map((city) => (
                                <div
                                    key={city}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                                    onClick={() => handleLocationChange(city)}
                                >
                                    <div className="w-4 h-4 border rounded-full mr-2 flex items-center justify-center">
                                        {location === city && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                                    </div>
                                    {city}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1 relative p-4 md:border-r border-gray-200">
                <div 
                    className="relative cursor-pointer hover:bg-gray-50 px-4 py-2"
                    onClick={() => {
                        const dateInput = document.querySelector('input[type="date"]') as HTMLInputElement;
                        dateInput?.showPicker();
                        setIsDropdownOpen(false);
                    }}
                >
                    <input
                        type="date"
                        value={date}
                        onChange={handleDateChange}
                        className="absolute inset-0 w-full h-full opacity-0"
                    />
                    <div>
                        {displayDate || "Select date"}
                    </div>
                </div>
            </div>

            <div className="flex-1 relative p-4">
                <div 
                    className="relative cursor-pointer hover:bg-gray-50 px-4 py-2"
                    onClick={() => {
                        const timeInput = document.querySelector('input[type="time"]') as HTMLInputElement;
                        timeInput?.showPicker();
                        setIsDropdownOpen(false);
                    }}
                >
                    <input
                        type="time"
                        value={time}
                        onChange={handleTimeChange}
                        className="absolute inset-0 w-full h-full opacity-0"
                    />
                    <div>
                        {time || "Select time"}
                    </div>
                </div>
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
                Search
            </button>
        </form>
    );
};

export default SearchBar;