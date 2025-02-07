'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

const FlightDetailsPage = ({params} : {params:Promise<{ id: string }>}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { results, loading, error } = useSelector((state: RootState) => state.flights);

  const resolvedParams = React.use(params)

  const flight = results[parseInt(resolvedParams.id)]
  if (!flight) {
    console.log(results.toString)
    return (
      <div className="max-w-7xl mx-auto p-8 bg-gray-100">
        <h1 className="text-2xl font-bold text-red-500">Flight not found</h1>
        <button
          onClick={() => router.back()}
          className="mt-4 bg-blue-600 text-black px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Back to Results
        </button>
      </div>
    );
  }
  const formatDate = (dateTime: string) => new Date(dateTime).toLocaleString();
  //const getDuration = (duration: string) => duration.replace('PT', '').toLowerCase();

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gray-100">
      <button
        onClick={() => router.back()}
        className="bg-cyan-600 text-white px-4 py-2 rounded-md mb-6 hover:bg-cyan-700 transition-colors"
      >
        Back to Results
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section: Flight and Segment Details */}
        <div className="col-span-2 bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-black mb-4">{flight.airlineName} - Flight Details</h1>

          {flight.itineraries.map((itinerary, itineraryIndex) => (
            <div key={itineraryIndex} className="mb-6">
              <h2 className="text-lg font-semibold text-black mb-4">
                {itineraryIndex === 0 ? 'Departure Flight' : 'Return Flight'}
              </h2>

              {itinerary.segments.map((segment, segmentIndex) => (
                <div key={segmentIndex} className="mb-6 border-b border-gray-200 pb-4">
                  <h3 className="text-md font-semibold text-gray-800 mb-2">Segment {segmentIndex + 1}</h3>
                  <p className="text-sm text-gray-800">
                    <strong>Departure:</strong> {segment.departure.airportName} ({segment.departure.iataCode}) —{' '}
                    {formatDate(segment.departure.at)}
                  </p>
                  <p className="text-sm text-gray-800">
                    <strong>Arrival:</strong> {segment.arrival.airportName} ({segment.arrival.iataCode}) —{' '}
                    {formatDate(segment.arrival.at)}
                  </p>
                  <p className="text-sm text-gray-800">
                    <strong>Airline:</strong> {segment.carrierCode} ({flight.airlineName})
                  </p>
                  {segment.operating && (
                    <p className="text-sm text-gray-800">
                      <strong>Operating Airline:</strong> {segment.operating.carrierCode}
                    </p>
                  )}
                  <p className="text-sm text-gray-800">
                    <strong>Aircraft Type:</strong> {segment.aircraft.code}
                  </p>

                  {/* Traveler Fare Details */}
                  <h4 className="text-md font-semibold text-gray-700 mt-4">Traveler Fare Details:</h4>
                  {flight.travelerPricings.map((traveler, travelerIndex) => (
                    <div key={travelerIndex} className="ml-4 mb-4">
                      <p className="text-sm text-gray-800">
                        <strong>Traveler {traveler.travelerId}:</strong> {traveler.travelerType}
                      </p>
                      {traveler.fareDetailsBySegment
                        .filter((fare) => fare.segmentId === segment.id)
                        .map((fareDetail, fareIndex) => (
                          <div key={fareIndex} className="ml-4">
                            <p className="text-sm text-gray-800">
                              <strong>Cabin:</strong> {fareDetail.cabin}
                            </p>
                            <p className="text-sm text-gray-800">
                              <strong>Class:</strong> {fareDetail.class}
                            </p>
                            <h5 className="text-sm font-semibold text-black mt-2">Amenities:</h5>
                            {fareDetail.amenities?.map((amenity, amenityIndex) => (
                              <p key={amenityIndex} className="text-sm text-gray-700">
                                <strong>{amenity.description}</strong> — {amenity.isChargeable ? 'Chargeable' : 'Free'}
                              </p>
                            ))}
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Right Section: Price Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-black mb-4">Price Breakdown</h2>
          <p className="text-sm text-gray-800">
            <strong>Base Price:</strong> {flight.price.base} {flight.price.currency}
          </p>
          <p className="text-sm text-gray-800">
            <strong>Total Price:</strong> {flight.price.total} {flight.price.currency}
          </p>
          {flight.price.fees.map((fee, feeIndex) => (
            <p key={feeIndex} className="text-sm text-gray-800">
              <strong>{fee.type} Fee:</strong> {fee.amount} {flight.price.currency}
            </p>
          ))}
          <h3 className="text-lg font-semibold text-black mt-4">Price Per Traveler:</h3>
          {flight.travelerPricings.map((traveler, index) => (
            <p key={index} className="text-sm text-gray-800">
              Traveler {traveler.travelerId}: {traveler.price.total} {traveler.price.currency}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};


export default FlightDetailsPage;
