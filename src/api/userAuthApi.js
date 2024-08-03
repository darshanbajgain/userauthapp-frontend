import axios from "axios";

const AUTH_REST_API_BASE_URL = 'http://localhost:8080/api/user'


// Registration API call
export const registerUserApi = (userDetails) => axios.post(AUTH_REST_API_BASE_URL + '/register', userDetails);

// Login API call
export const loginUserApi = (userCredidentals) => axios.post(AUTH_REST_API_BASE_URL + '/login', userCredidentals);
