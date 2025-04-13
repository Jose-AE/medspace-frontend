"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch } from 'react-icons/fa';
import { FaSpinner } from 'react-icons/fa';

type SearchParams = {
    location: string;
    date: string;
    time: string;
};

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
    onSearch: (searchParams: SearchParams) => void;
    /** Whether the component is in a loading state */
    isLoading?: boolean;
    /** Whether the component is disabled */
    isDisabled?: boolean;
};

const SearchBar = ({ 
    defaultLocation = "",
    defaultDate = "",
    defaultTime = "",
    locations = [],
    onLocationChange,
    onDateChange,
    onTimeChange,
    onSearch,
    isLoading = false,
    isDisabled = false
}: SearchBarProps) => {
    const [location, setLocation] = useState(defaultLocation);
    const [date, setDate] = useState(defaultDate);
    const [time, setTime] = useState(defaultTime);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const datePickerRef = useRef<any>(null);
    const datePickerInputRef = useRef<HTMLInputElement>(null);
    const timePickerRef = useRef<HTMLDivElement>(null);
    const locationButtonRef = useRef<HTMLButtonElement>(null);
    const timeButtonRef = useRef<HTMLDivElement>(null);

    // Derive selected hour and minute from time
    const selectedHour = time ? time.split(':')[0] : '';
    const selectedMinute = time ? time.split(':')[1] : '';

    // Memoize click outside handlers
    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
        }
        if (timePickerRef.current && !timePickerRef.current.contains(event.target as Node)) {
            setIsTimePickerOpen(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

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

    const handleTimeSelection = (hour: string, minute: string) => {
        const formattedTime = `${hour.padStart(2, '0')}:${minute}`;
        setTime(formattedTime);
        onTimeChange?.(formattedTime);
    };

    const formatDisplayTime = (time: string) => {
        if (!time) return "Select time";
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const period = hour >= 12 ? 'p.m.' : 'a.m.';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${period}`;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch({ 
            location: location || '', 
            date: date || '', 
            time: time || '' 
        });
    };

    // Get location dropdown position
    const getLocationDropdownPosition = useCallback(() => {
        if (locationButtonRef.current) {
            const rect = locationButtonRef.current.getBoundingClientRect();
            return {
                top: '100%',
                left: 0,
                minWidth: rect.width
            };
        }
        return { top: 0, left: 0 };
    }, []);

    // Get time picker position
    const getTimePickerPosition = useCallback(() => {
        if (timeButtonRef.current) {
            const rect = timeButtonRef.current.getBoundingClientRect();
            return {
                top: '100%',
                left: 0,
                minWidth: rect.width
            };
        }
        return { top: 0, left: 0 };
    }, []);

    // Handle keyboard navigation for time picker
    const handleTimeKeyDown = (e: React.KeyboardEvent, hour: string, minute: string) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleTimeSelection(hour, minute);
        }
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className="flex flex-col md:flex-row bg-white rounded-full max-w-4xl mx-auto border border-gray-200 shadow-lg"
            role="search"
            aria-label="Search for medical appointments"
        >
            <div className="flex-1 relative px-4 py-2" ref={dropdownRef}>
                <div className="relative">
                    <button
                        type="button"
                        ref={locationButtonRef}
                        className="w-full px-4 py-2 text-left bg-white hover:bg-gray-50"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        aria-expanded={isDropdownOpen}
                        aria-haspopup="listbox"
                        aria-label="Select location"
                        disabled={isDisabled}
                    >
                        {location || "Select a city"}
                    </button>
                    {isDropdownOpen && (
                        <div 
                            className="absolute z-10 mt-1 bg-white border rounded-lg shadow-lg overflow-visible"
                            style={getLocationDropdownPosition()}
                            role="listbox"
                            aria-label="Available locations"
                        >
                            <div className="w-full">
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
                    className="relative"
                    onClick={() => {
                        datePickerInputRef.current?.focus();
                    }}
                >
                    <DatePicker
                        ref={datePickerRef}
                        selected={date ? new Date(date + 'T00:00:00') : null}
                        onChange={(newDate) => {
                            if (newDate) {
                                try {
                                    // Format the date as YYYY-MM-DD without timezone conversion
                                    const year = newDate.getFullYear();
                                    const month = String(newDate.getMonth() + 1).padStart(2, '0');
                                    const day = String(newDate.getDate()).padStart(2, '0');
                                    const formattedDate = `${year}-${month}-${day}`;
                                    
                                    setDate(formattedDate);
                                    onDateChange?.(formattedDate);
                                    
                                    datePickerInputRef.current?.blur();
                                    const calendar = document.querySelector('.react-datepicker-popper');
                                    if (calendar) {
                                        calendar.setAttribute('style', 'display: none');
                                    }
                                } catch (error) {
                                    // Reset to previous date if there's an error
                                    setDate(date);
                                }
                            }
                        }}
                        dateFormat="MMM d"
                        placeholderText="Select date"
                        className="w-full px-4 py-2 text-left bg-white hover:bg-gray-50"
                        calendarClassName="absolute z-10 mt-1 bg-white border rounded-lg shadow-lg"
                        popperPlacement="bottom-start"
                        customInput={
                            <input
                                ref={datePickerInputRef}
                                className="w-full px-4 py-2 text-left bg-white hover:bg-gray-50 cursor-pointer focus:outline-none focus:ring-0"
                                style={{ caretColor: 'transparent' }}
                            />
                        }
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        dayClassName={() => "w-8 h-8 flex items-center justify-center m-0.5 text-gray-700"}
                        renderDayContents={(day) => (
                            <div className="w-8 h-8 flex items-center justify-center">
                                {day}
                            </div>
                        )}
                        renderCustomHeader={({
                            date,
                            decreaseMonth,
                            increaseMonth,
                            prevMonthButtonDisabled,
                            nextMonthButtonDisabled,
                        }) => (
                            <div className="flex justify-between items-center px-2 py-2">
                                <button
                                    onClick={decreaseMonth}
                                    disabled={prevMonthButtonDisabled}
                                    type="button"
                                    className="p-1"
                                >
                                    {"<"}
                                </button>
                                <span className="text-gray-900 font-medium">
                                    {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
                                </span>
                                <button
                                    onClick={increaseMonth}
                                    disabled={nextMonthButtonDisabled}
                                    type="button"
                                    className="p-1"
                                >
                                    {">"}
                                </button>
                            </div>
                        )}
                    />
                </div>
            </div>

            <div className="flex items-center">
                <div className="h-8 w-px bg-gray-200"></div>
            </div>

            <div className="flex-1 relative px-4 py-2">
                <div 
                    ref={timePickerRef}
                    className="relative"
                >
                    <div
                        ref={timeButtonRef}
                        className="w-full px-4 py-2 text-left bg-white hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                            setIsTimePickerOpen(!isTimePickerOpen);
                        }}
                        role="button"
                        aria-expanded={isTimePickerOpen}
                        aria-haspopup="listbox"
                        aria-label="Select time"
                    >
                        {formatDisplayTime(time)}
                    </div>
                    {isTimePickerOpen && (
                        <div 
                            className="absolute z-10 mt-1 bg-white border rounded-lg shadow-lg"
                            style={getTimePickerPosition()}
                            role="listbox"
                            aria-label="Available times"
                        >
                            <div className="flex w-full">
                                {/* Hours Column */}
                                <div className="w-1/2 border-r">
                                    <div className="max-h-[200px] overflow-y-auto">
                                        {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                                            <div
                                                key={hour}
                                                className={`px-3 py-2 text-center cursor-pointer ${
                                                    selectedHour === String(hour).padStart(2, '0') ? 'bg-blue-100' : 'hover:bg-gray-100'
                                                }`}
                                                onClick={() => {
                                                    handleTimeSelection(String(hour).padStart(2, '0'), selectedMinute || '00');
                                                }}
                                                onKeyDown={(e) => handleTimeKeyDown(e, String(hour).padStart(2, '0'), selectedMinute || '00')}
                                                role="option"
                                                aria-selected={selectedHour === String(hour).padStart(2, '0')}
                                                tabIndex={0}
                                            >
                                                {String(hour).padStart(2, '0')}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Minutes Column */}
                                <div className="w-1/2">
                                    <div className="max-h-[200px] overflow-y-auto">
                                        {['00', '30'].map((minute) => (
                                            <div
                                                key={minute}
                                                className={`px-3 py-2 text-center cursor-pointer ${
                                                    selectedMinute === minute ? 'bg-blue-100' : 'hover:bg-gray-100'
                                                }`}
                                                onClick={() => {
                                                    handleTimeSelection(selectedHour || '00', minute);
                                                }}
                                                onKeyDown={(e) => handleTimeKeyDown(e, selectedHour || '00', minute)}
                                                role="option"
                                                aria-selected={selectedMinute === minute}
                                                tabIndex={0}
                                            >
                                                {minute}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center pr-1">
                <button
                    type="submit"
                    className={`bg-blue-500 text-white p-3 rounded-full transition-colors flex items-center justify-center w-10 h-10 ${
                        isLoading || isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                    }`}
                    disabled={isLoading || isDisabled}
                    aria-label="Search"
                >
                    {isLoading ? (
                        <FaSpinner className="animate-spin h-5 w-5" />
                    ) : (
                        <FaSearch className="h-5 w-5" />
                    )}
                </button>
            </div>
        </form>
    );
};

export default SearchBar;