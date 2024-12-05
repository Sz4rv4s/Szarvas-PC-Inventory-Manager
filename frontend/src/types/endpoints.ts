const API_BASE_URL = 'http://localhost:8000/api';

export const AUTH_ENDPOINTS = {
  AUTHENTICATE: `${API_BASE_URL}/authenticate`,
  CREATE_USER: `${API_BASE_URL}/users/createuser`,
};

export const USER_ENDPOINTS = {
  GET_ALL_PARTS_WITH_WAREHOUSE: `${API_BASE_URL}/user/getallpartswithwarehouse`,
  GET_ALL_WAREHOUSES_WITH_PARTS: `${API_BASE_URL}/user/getallwarehouseswithparts`,
  SEARCH_PART: `${API_BASE_URL}/user/`,
};

export const ADMIN_ENDPOINTS = {
  ADD_PART: `${API_BASE_URL}/admin/addpart/`,
  DELETE_PART: `${API_BASE_URL}/admin/deletepart/`,
};
