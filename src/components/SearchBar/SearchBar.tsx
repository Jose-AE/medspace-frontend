"use client";
import { useState, useEffect } from 'react';
import { FaSearch, FaCalendar, FaClock } from 'react-icons/fa';

type SearchBarProps = {
    /** Default location value */
    defaultLocation?: string;
    /** Default date value */
    defaultDate?: string;
    /** Default time value */
    defaultTime?: string;
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
    onLocationChange,
    onDateChange,
    onTimeChange,
    onSearch 
}: SearchBarProps) => {
    const [location, setLocation] = useState(defaultLocation);
    const [date, setDate] = useState(defaultDate);
    const [time, setTime] = useState(defaultTime);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Update internal state when default values change
    useEffect(() => {
        setLocation(defaultLocation);
    }, [defaultLocation]);

    useEffect(() => {
        setDate(defaultDate);
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
            className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg max-w-4xl mx-auto border border-gray-200"
        >
            <div className="flex-1 relative p-4 md:border-r border-gray-200">
                <div className="relative">
                    <button
                        type="button"
                        className="w-full px-4 py-2 text-left bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-50"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        {location || "Select a city"}
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
                            {["CDMX", "Guadalajara", "Monterrey", "Puebla", "Querétaro"].map((city) => (
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
                <div className="absolute left-7 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FaCalendar />
                </div>
                <input
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex-1 relative p-4">
                <div className="absolute left-7 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FaClock />
                </div>
                <input
                    type="time"
                    value={time}
                    onChange={handleTimeChange}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
                <FaSearch />
                Search
            </button>
        </form>
    );
};

export default SearchBar;