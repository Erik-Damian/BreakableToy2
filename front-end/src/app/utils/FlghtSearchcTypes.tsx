export interface FlightSegment {
  departure: {
    iataCode: string;
    terminal?: string;
    at: string;
    airportName?: string;
  };
  arrival: {
    iataCode: string;
    terminal?: string;
    at: string;
    airportName?: string;
  };
  carrierCode: string;
  number: string;
  aircraft: {
    code: string;
  };
  operating?: {
    carrierCode: string;
  };
  duration: string;
  id: string;
  numberOfStops: number;
  blacklistedInEU: boolean;
}

export interface Itinerary {
  duration: string;
  segments: FlightSegment[];
}

export interface Fee {
  amount: string;
  type: string;
}

export interface Price {
  currency: string;
  total: string;
  base: string;
  fees: Fee[];
  grandTotal: string;
}

export interface PricingOptions {
  fareType: string[];
  includedCheckedBagsOnly: boolean;
}

export interface TravelerPricing {
  travelerId: string;
  fareOption: string;
  travelerType: string;
  price: {
    currency: string;
    total: string;
    base: string;
  };
  fareDetailsBySegment: FareDetail[];
}

export interface FareDetail {
  segmentId: string;
  cabin: string;
  fareBasis: string;
  brandedFare: string;
  brandedFareLabel: string;
  class: string;
  includedCheckedBags: {
    quantity: number;
  };
  amenities?: Amenity[];
}

export interface Amenity {
  description: string;
  isChargeable: boolean;
  amenityType: string;
  amenityProvider: {
    name: string;
  };
}

export interface FlightOffer {
  type: string;
  id: string;
  source: string;
  instantTicketingRequired: boolean;
  nonHomogeneous?: boolean;
  oneWay: boolean;
  isUpsellOffer?: boolean;
  lastTicketingDate: string;
  lastTicketingDateTime?: string;
  numberOfBookableSeats: number;
  itineraries: Itinerary[];
  price: Price;
  pricingOptions?: PricingOptions;
  validatingAirlineCodes: string[];
  travelerPricings: TravelerPricing[];
  airlineName: string;
}

export interface FlightResponse {
  page: number;
  pageSize: number;
  data: FlightOffer[];
}