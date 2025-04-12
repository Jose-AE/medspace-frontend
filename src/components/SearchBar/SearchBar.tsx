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
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);

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

    // Update dropdown position when it opens
    useEffect(() => {
        if (isDropdownOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setDropdownPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX
            });
        }
    }, [isDropdownOpen]);

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
            className="flex flex-col md:flex-row bg-white rounded-full max-w-4xl mx-auto border border-gray-200 shadow-lg"
        >
            <div className="flex-1 relative px-4 py-2" ref={dropdownRef}>
                <div className="relative">
                    <button
                        type="button"
                        ref={buttonRef}
                        className="w-full px-4 py-2 text-left bg-white hover:bg-gray-50"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        {location || "Select a city"}
                    </button>
                    {isDropdownOpen && (
                        <div 
                            className="fixed z-10 mt-1 bg-white border rounded-lg shadow-lg overflow-visible"
                            style={{
                                top: `${dropdownPosition.top}px`,
                                left: `${dropdownPosition.left}px`
                            }}
                        >
                            <div className="min-w-[200px]">
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
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center">
                <div className="h-8 w-px bg-gray-200"></div>
            </div>

            <div className="flex-1 relative px-4 py-2">
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

            <div className="flex items-center">
                <div className="h-8 w-px bg-gray-200"></div>
            </div>

            <div className="flex-1 relative px-4 py-2">
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
                className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
            >
                Search
            </button>
        </form>
    );
};

export default SearchBar;