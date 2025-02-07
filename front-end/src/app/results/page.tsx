'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store';
import { fetchFlights } from '@/lib/slices/flightsSlice';
import FlightCard from '../components/organisms/flightCard/FlightCard';
import { useRouter } from 'next/navigation';
import LoadingScreen from '../components/atoms/loadingScreen/LoadingScreen';
import { FlightOffer } from '../utils/FlghtSearchcTypes';

export default function ResultsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { results, loading, params } = useSelector((state: RootState) => state.flights);
  const [sortMode, setSortMode] = useState<'price' | 'duration'>('price');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSortChange = (mode: 'price' | 'duration') => {
    setSortMode(mode);
    setCurrentPage(1);
    const updatedParams = { ...params, page: currentPage, filter: sortMode };
    dispatch(fetchFlights(updatedParams));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const updatedParams = { ...params, page: page, filter: sortMode };
    dispatch(fetchFlights(updatedParams));
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      {loading && <LoadingScreen type={sortMode} />}

      <nav className="bg-cyan-900 shadow-md p-4 flex flex-wrap items-center justify-between">
        <button
          onClick={() => router.push('/search')}
          className="bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700 transition-colors mb-2 sm:mb-0"
        >
          Back to Search
        </button>

        <div className="flex items-center flex-wrap mb-2 sm:mb-0">
          <p className="mr-3 text-white">Sort by:</p>
          <button
            onClick={() => handleSortChange('price')}
            className={`px-4 py-2 rounded-l-md ${
              sortMode === 'price'
                ? 'bg-cyan-600 text-white cursor-default'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Price
          </button>
          <button
            onClick={() => handleSortChange('duration')}
            className={`px-4 py-2 rounded-r-md ${
              sortMode === 'duration'
                ? 'bg-cyan-600 text-white cursor-default'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Duration
          </button>
        </div>

        <div className="flex items-center flex-wrap space-x-2">
          <button
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
          >
            🢀
          </button>
          <span className="text-lg font-medium text-white">{`Page ${currentPage}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
          >
            🢂
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto p-6">
        {!loading && results.length !== 0 ? (
          results.map((flight: FlightOffer, index) => (
            <FlightCard key={flight.id} flight={flight} id={index} />
          ))
        ) : (
          <p className="text-center text-lg font-medium mt-10">
            {loading ? 'Loading flight results...' : 'No flight results found.'}
          </p>
        )}
      </div>

      <div className="flex justify-center items-center space-x-4 mt-8 pb-4">
        <button
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
          disabled={currentPage === 1}
        >
          🢀
        </button>
        <span className="text-lg font-medium text-black">{`Page ${currentPage}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
        >
          🢂
        </button>
      </div>
    </div>
  );
}
