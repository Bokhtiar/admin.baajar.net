import { privateRequest } from '../config/axios.config'

/* list of resource */
export const index = async ( ) => {
    return await privateRequest.get(`/category` );
};

/* parent category list */
export const parentList = async() => {
    return await privateRequest.get('/admin/category/parent')
}

/* resource store */
export const store = async(data) => {
    
    return await privateRequest.post('/category', data)
}

/* resource show */
export const show = async(id) => {
    return await privateRequest.get(`/category/${id}`)
}

/* reosurce update */
export const update = async(id, data) => {
    return await privateRequest.post(`/category/${id}`, data)
}

/* resource destory */
export const destroy = async (id) => {
    return await privateRequest.delete(`/category/${id}`)
}

/* resource destory */
export const bulkDestroy = async (ids) => {
    return await privateRequest.post(`/admin/bulk-destroy-category`,ids)
}
