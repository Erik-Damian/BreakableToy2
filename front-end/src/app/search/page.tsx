'use client';

import { useState } from 'react';
import DynamicDropdown from '../components/molecules/dynamicDropdown/DynamicDropdown';
import DateSelect from '../components/molecules/dateSelect/DateSelect';
import { useDispatch, useSelector } from 'react-redux';
import { Currency } from '../utils/Currencies';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { useRouter } from 'next/navigation';
import { AppDispatch, RootState } from '@/lib/store';
import { fetchFlights } from '@/lib/slices/flightsSlice';

export default function Search() {
    const [departureAirport, setDepartureAirport] = useState('');
    const [arrivalAirport, setArrivalAirport] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [flightType, setFlightType] = useState<'single' | 'round'>('single');
    const [departureDate, setDepartureDate] = useState<Date | null>(new Date());
    const [returnDate, setReturnDate] = useState<Date | null>(new Date());
    const [nonStop, setNonStop] = useState(false);
    const [adults, setAdults] = useState(1);
    const [showError, setShowError] = useState(false);

    const { results, loading, error } = useSelector((state: RootState) => state.flights);

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const isFormValid =
    departureAirport.length > 0 &&
    arrivalAirport.length > 0 &&
    departureDate !== null &&
    currency &&
    adults > 0;

    const handleSearch = () => {
        setShowError(false);
        console.log(!isFormValid || (departureAirport.length !== 3 || arrivalAirport.length !== 3))
        if (!isFormValid || (departureAirport.length !== 3 || arrivalAirport.length !== 3)) {
            setShowError(true);
            return;
          }

        const searchParams = {
            origin: departureAirport,
            destination: arrivalAirport,
            departureDate: departureDate?.toISOString().split('T')[0],
            returnDate: flightType === 'round' ? returnDate?.toISOString().split('T')[0] : undefined,
            currency,
            nonStop,
            adults,
            sort: 'PRICE',
            page: 1,
          };
      
          dispatch(fetchFlights(searchParams))
          router.push('/results');
    };

    return (
        <div className="mx-auto max-w-4xl p-8 sm:p-4 font-circle text-black bgcolor-cyan-900">
            <div className="bg-gray-100 rounded-lg shadow-lg p-10">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-cyan-700">Flights Search</h1>
                </div>

                <div className="space-y-4">
                    {/* Departure and Arrival Airports */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b-2 border-gray-300 pb-5">
                        <div>
                            <label htmlFor="departureAirport" className="block text-lg font-medium mb-2">
                                Departure Airport:
                                <span
                                    data-tooltip-id="departureAirport-tooltip"
                                    data-tooltip-content="The airport from which your flight will depart."
                                    className="ml-2 text-gray-500 cursor-pointer"
                                >
                                    ?
                                </span>
                                <Tooltip id="departureAirport-tooltip" />
                            </label>
                            <DynamicDropdown value={departureAirport} setValue={setDepartureAirport} />
                            {showError && departureAirport.length !== 3 && (
                                <p className="text-red-500 text-sm">Please enter a valid 3-character IATA code or search for one.</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="arrivalAirport" className="block text-lg font-medium mb-2">
                                Arrival Airport:
                                <span
                                    data-tooltip-id="arrivalAirport-tooltip"
                                    data-tooltip-content="The airport where your flight will arrive."
                                    className="ml-2 text-gray-500 cursor-pointer"
                                >
                                    ?
                                </span>
                                <Tooltip id="arrivalAirport-tooltip" />
                            </label>
                            <DynamicDropdown value={arrivalAirport} setValue={setArrivalAirport} />
                            {showError && departureAirport.length !== 3 && (
                                <p className="text-red-500 text-sm">Please enter a valid 3-character IATA code or search for one.</p>
                            )}
                        </div>
                    </div>

                    {/* Flight Type Radio Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center border-b-2 border-gray-300 pb-5">
                        <label className="col-span-1 text-lg font-medium">
                            Type of flight:
                            <span
                                data-tooltip-id="flightType-tooltip"
                                data-tooltip-content="Choose 'Single Flight' for one-way trips or 'Round Flight' for round trips."
                                className="ml-2 text-gray-500 cursor-pointer"
                            >
                                ?
                            </span>
                            <Tooltip id="flightType-tooltip" />
                        </label>
                        <div className="col-span-3 flex items-center space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="flightType"
                                    value="single"
                                    checked={flightType === 'single'}
                                    onChange={() => setFlightType('single')}
                                    className="mr-2"
                                />
                                Single Flight
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="flightType"
                                    value="round"
                                    checked={flightType === 'round'}
                                    onChange={() => setFlightType('round')}
                                    className="mr-2"
                                />
                                Round Flight
                            </label>
                        </div>
                    </div>

                    {/* Departure and Return Dates */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b-2 border-gray-300 pb-5">
                        <div>
                            <label htmlFor="departureDate" className="block text-lg font-medium mb-2">
                                Departure Date:
                                <span
                                    data-tooltip-id="departureDate-tooltip"
                                    data-tooltip-content="The date on which your flight will depart."
                                    className="ml-2 text-gray-500 cursor-pointer"
                                >
                                    ?
                                </span>
                                <Tooltip id="departureDate-tooltip" />
                            </label>
                            <DateSelect
                                value={departureDate}
                                onChange={setDepartureDate}
                                placeholder="Select departure date"
                            />
                        </div>
                        <div>
                            <label htmlFor="returnDate" className="block text-lg font-medium mb-2">
                                Return Date:
                                <span
                                    data-tooltip-id="returnDate-tooltip"
                                    data-tooltip-content="The date on which your flight will return (only for round trips)."
                                    className="ml-2 text-gray-500 cursor-pointer"
                                >
                                    ?
                                </span>
                                <Tooltip id="returnDate-tooltip" />
                            </label>
                            <DateSelect
                                value={returnDate}
                                onChange={setReturnDate}
                                placeholder="Select return date"
                                disabled={flightType === 'single'}
                            />
                        </div>
                    </div>

                    {/* Currency, N° of Adults, and Non-Stop */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b-2 border-gray-300 pb-5">
                        <div>
                            <label htmlFor="currency" className="block text-lg font-medium mb-2">
                                Currency:
                                <span
                                    data-tooltip-id="currency-tooltip"
                                    data-tooltip-content="The currency in which flight prices will be displayed."
                                    className="ml-2 text-gray-500 cursor-pointer"
                                >
                                    ?
                                </span>
                                <Tooltip id="currency-tooltip" />
                            </label>
                            <DynamicDropdown value={currency} setValue={setCurrency} values={Currency} nonQuery />
                        </div>
                        <div>
                            <label htmlFor="adults" className="block text-lg font-medium mb-2">
                                N° of Adults:
                                <span
                                    data-tooltip-id="adults-tooltip"
                                    data-tooltip-content="The number of adults traveling."
                                    className="ml-2 text-gray-500 cursor-pointer"
                                >
                                    ?
                                </span>
                                <Tooltip id="adults-tooltip" />
                            </label>
                            <input
                                type="number"
                                id="adults"
                                value={adults}
                                min={1}
                                onChange={(e) => setAdults(Number(e.target.value))}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="nonStop" className="block text-lg font-medium mb-2">
                                Non-Stop:
                                <span
                                    data-tooltip-id="nonStop-tooltip"
                                    data-tooltip-content="Check this box if you prefer flights with no layovers."
                                    className="ml-2 text-gray-500 cursor-pointer"
                                >
                                    ?
                                </span>
                                <Tooltip id="nonStop-tooltip" />
                            </label>
                            <input
                                type="checkbox"
                                id="nonStop"
                                checked={nonStop}
                                onChange={(e) => setNonStop(e.target.checked)}
                                className="w-5 h-5"
                            />
                        </div>
                    </div>

                    {/* Search Button */}
                    <div className="text-center">
                        <button
                            onClick={handleSearch}
                            disabled={!isFormValid}
                            className={`px-6 py-3 rounded-md transition-colors ${
                              isFormValid ? 'bg-cyan-600 text-black hover:bg-cyan-900' : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                            }`}
                        >
                            Search Flights
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}