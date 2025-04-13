"use client";
import { useState, useEffect, useRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [displayDate, setDisplayDate] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);
    const datePickerRef = useRef<any>(null);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
    const timePickerRef = useRef<HTMLDivElement>(null);

    // Derive selected hour and minute from time
    const selectedHour = time ? time.split(':')[0] : '';
    const selectedMinute = time ? time.split(':')[1] : '';

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

    const handleTimeSelection = (hour: string, minute: string) => {
        const formattedTime = `${hour.padStart(2, '0')}:${minute}`;
        setTime(formattedTime);
        onTimeChange?.(formattedTime);
    };

    const formatDisplayTime = (time: string) => {
        if (!time) return "Select time";
        const [hours, minutes] = time.split(':');
        return `${hours}:${minutes}`;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch({ location, date, time });
    };

    const generateTimeOptions = () => {
        const options = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute of [0, 30]) {
                const period = hour >= 12 ? 'p.m.' : 'a.m.';
                const displayHour = hour % 12 || 12;
                const formattedTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
                const displayTime = `${displayHour}:${String(minute).padStart(2, '0')} ${period}`;
                options.push({ value: formattedTime, display: displayTime });
            }
        }
        return options;
    };

    const timeOptions = generateTimeOptions();

    // Handle click outside to close time picker
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (timePickerRef.current && !timePickerRef.current.contains(event.target as Node)) {
                setIsTimePickerOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
                    className="relative"
                    onClick={() => {
                        const datePicker = document.querySelector('.react-datepicker-wrapper input') as HTMLInputElement;
                        datePicker?.focus();
                    }}
                >
                    <DatePicker
                        ref={datePickerRef}
                        selected={date ? new Date(date) : null}
                        onChange={(newDate) => {
                            if (newDate) {
                                // Adjust for timezone offset
                                const offset = newDate.getTimezoneOffset();
                                newDate.setMinutes(newDate.getMinutes() + offset);
                                const localDate = newDate.toLocaleDateString('en-CA');
                                setDate(localDate);
                                onDateChange?.(localDate);
                                // Close the date picker
                                const datePicker = document.querySelector('.react-datepicker-wrapper input') as HTMLInputElement;
                                datePicker?.blur();
                                // Force close the calendar
                                const calendar = document.querySelector('.react-datepicker-popper');
                                if (calendar) {
                                    calendar.setAttribute('style', 'display: none');
                                }
                                setIsDatePickerOpen(false);
                            }
                        }}
                        onCalendarOpen={() => setIsDatePickerOpen(true)}
                        onCalendarClose={() => setIsDatePickerOpen(false)}
                        dateFormat="MMM d"
                        placeholderText="Select date"
                        className="w-full px-4 py-2 text-left bg-white hover:bg-gray-50"
                        calendarClassName="absolute z-10 mt-1 bg-white border rounded-lg shadow-lg"
                        popperPlacement="bottom-start"
                        customInput={
                            <input
                                className={`w-full px-4 py-2 text-left bg-white ${!isDatePickerOpen ? 'hover:bg-gray-50' : ''} cursor-pointer focus:outline-none focus:ring-0`}
                                style={{ 
                                    caretColor: 'transparent',
                                    border: isDatePickerOpen ? '1px solid #e5e7eb' : 'none'
                                }}
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
                            changeYear,
                            changeMonth,
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
                        className="w-full px-4 py-2 text-left bg-white hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                            setIsTimePickerOpen(!isTimePickerOpen);
                            if (timePickerRef.current) {
                                const rect = timePickerRef.current.getBoundingClientRect();
                                setDropdownPosition({
                                    top: rect.bottom + window.scrollY,
                                    left: rect.left + window.scrollX
                                });
                            }
                        }}
                    >
                        {formatDisplayTime(time)}
                    </div>
                    {isTimePickerOpen && (
                        <div 
                            className="fixed z-10 mt-1 bg-white border rounded-lg shadow-lg"
                            style={{
                                top: `${dropdownPosition.top}px`,
                                left: `${dropdownPosition.left}px`
                            }}
                        >
                            <div className="flex">
                                {/* Hours Column */}
                                <div className="w-16 border-r">
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
                                            >
                                                {String(hour).padStart(2, '0')}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Minutes Column */}
                                <div className="w-16">
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