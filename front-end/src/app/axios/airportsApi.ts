import axiosInstance from './axiosInstance';
import { DropdownItem } from '../utils/DropDownItemType';

export const searchAirports = async (keyword: string): Promise<DropdownItem[]> => {
    try {
        const response = await axiosInstance.get<DropdownItem[]>('/location', {
            params: {
                subType: 'AIRPORT',
                keyword, 
            },
        });
        return response.data; 
    } catch (error) {
        throw error;
    }
};
