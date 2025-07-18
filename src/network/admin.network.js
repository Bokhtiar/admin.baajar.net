import { privateRequest } from "../config/axios.config";

/* list of resource */
export const index = async (queryParams) => {
  return await privateRequest.get(`/admin/user-list?role=admin&${queryParams}`);
};

/* resource store */
export const store = async (data) => {
  
  return await privateRequest.post("/admin/user-list", data);
};

/* resource show */
export const show = async (id) => {
  return await privateRequest.get(`/admin/user-list/${id}`);
};

/* reosurce update */
export const update = async (id, data) => {
  return await privateRequest.post(`/admin/user-list/${id}`, data);
};

/* resource destory */
export const destroy = async (id) => {
  return await privateRequest.delete(`/admin/user-list/${id}`);
};


/* profail show*/
export const Profail = async () => {
  return await privateRequest.get(`/admin/profile`);
};
export const ProfailUpdate = async (data) => {
  return await privateRequest.post(`/user/update-profile`,data);
};

