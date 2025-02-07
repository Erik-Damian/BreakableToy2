'use client';
import React from 'react';
import { FlightOffer } from '@/app/utils/FlghtSearchcTypes';
  import { useRouter } from 'next/navigation';
interface FlightCardProps {
  flight: FlightOffer,
  id: number
}

const FlightCard = ({ flight, id }: FlightCardProps) => {
  const formatDate = (dateTime: string) => new Date(dateTime).toLocaleString();
  const getDuration = (duration: string) => duration.replace('PT', '').toLowerCase();
    const router = useRouter();
    

  return (
    <div className="md:flex border border-gray-300 rounded-lg shadow-md p-4 mb-6 bg-white duration-100 hover:cursor-pointer hover:bg-cyan-100/50 hover:drop-shadow-xl" onClick={() => router.push(`/details/${flight.id}`)}>
        <div className=' w-full'>
            {/* Flight Information */}
      {flight.itineraries.map((itinerary, index) => (
        <div key={index} className="mb-6 border-t-2 border-gray-500/25 border-gray-400">
          <h2 className="text-lg font-semibold mb-2 text-gray-900">
            {index === 0 ? 'Departure Flight' : 'Return Flight'}
          </h2>
          <div className="flex flex-col md:flex-row md:justify-between">
            {/* Left Section: Flight Info */}
            <div className="md:flex-2 space-y-2">
              <p className="text-sm text-gray-800">
                <strong>From:</strong> {itinerary.segments[0].departure.airportName} ({itinerary.segments[0].departure.iataCode}) —{' '}
                <span>{formatDate(itinerary.segments[0].departure.at)}</span>
              </p>
              <p className="text-sm text-gray-800">
                <strong>To:</strong> {itinerary.segments[itinerary.segments.length - 1].arrival.airportName} ({itinerary.segments[itinerary.segments.length - 1].arrival.iataCode}) —{' '}
                <span>{formatDate(itinerary.segments[itinerary.segments.length - 1].arrival.at)}</span>
              </p>
              <p className="text-sm text-gray-600">
                <strong>Airline:</strong> {flight.airlineName} ({itinerary.segments[0].carrierCode})
              </p>
            </div>

            {/* Middle Section: Total Duration and Stops */}
            <div className="mt-4 md:mt-0 md:ml-6 text-right md:flex-1">
              <p className="text-sm text-gray-800">
                <strong>Total Flight Time:</strong> {getDuration(itinerary.duration)}
              </p>
              <p className="text-sm text-gray-800">
                <strong>Stops:</strong> {itinerary.segments.length - 1}
              </p>
              {itinerary.segments.length > 1 &&
                itinerary.segments.slice(1).map((segment, i) => (
                  <p key={i} className="text-sm text-gray-800">
                    <strong>Layover:</strong> {segment.departure.airportName} ({segment.departure.iataCode})
                  </p>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>

      {/* Price Information (Outside the Map) */}
      <div className="mt-4 md:mt-0 md:ml-6 w-52 bg-gray-100 rounded-lg px-4 py-8 flex flex-col justify-center items-center justify-self-center self-center drop-shadow-[5px_5px_0px_rgba(0,0,0,0.10)]">
        <h3 className="text-2xl text-center font-bold text-gray-800 w-full">{flight.price.total} {flight.price.currency}</h3>
        <p className="text-sm text-gray-500">Total Price</p>
        {flight.travelerPricings.length >= 1 && (
          <>
            <h4 className="font-bold text-gray-400 pt-3">{flight.travelerPricings[0].price.total} {flight.price.currency}</h4>
            <p className="text-xs text-gray-400">Per Traveler ({flight.travelerPricings.length})</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FlightCard;
