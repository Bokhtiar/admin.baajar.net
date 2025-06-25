import { privateRequest } from "../config/axios.config";

/* list of resource */
export const index = async (params) => {
  return await privateRequest.get("/admin/rider-list",params);
};


/* resource store */
export const store = async (data) => {
  
  return await privateRequest.post("/admin/rider-list", data);
};

/* resource show */
export const show = async (id) => {
  return await privateRequest.get(`/admin/rider-list/${id}`);
};

/* reosurce update */
export const update = async (id, data) => {
  return await privateRequest.post(`/admin/rider-list/${id}`, data);
};

/* resource destory */
export const destroy = async (id) => {
  return await privateRequest.delete(`/admin/rider-list/${id}`);
};

