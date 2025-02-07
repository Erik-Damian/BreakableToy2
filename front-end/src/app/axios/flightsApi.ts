import { FlightOffer, FlightResponse } from '../utils/FlghtSearchcTypes';
import axiosInstance from './axiosInstance';  // Assuming axiosInstance is the pre-configured instance.


export const fetchFlightsApi = async (params: any): Promise<FlightOffer[]> => {
  const response = await axiosInstance.get<FlightOffer[]>('http://localhost:8080/api/flights/search', {
    params,
  });
  console.log(response);
  return response.data;
};
