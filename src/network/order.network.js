import { privateRequest } from '../config/axios.config'

/* list of resource */
export const index = async (queryParams ) => {
    return await privateRequest.get(`/admin/order?${queryParams}` );
};



