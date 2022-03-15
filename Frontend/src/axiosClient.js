
import axios from 'axios';

// Axios instance for optimzed usage
const axiosClient = axios.create();

axiosClient.defaults.baseURL = 'https://planzap.herokuapp.com';

// axiosClient.defaults.headers = {
//   'Content-Type': 'application/json',
//   Accept: 'application/json'
// };

//All request will wait 2 seconds before timeout
axiosClient.defaults.timeout = 2000;

axiosClient.defaults.withCredentials = true;



// making new functions for convenience
export async function getRequest(URL) {
    const response = await axiosClient.get(`/${URL}`);
    return response;
}

export async function postRequest(URL, payload) {
    const response = await axiosClient.post(`/${URL}`, payload);
    return response;
}

export async function putRequest(URL, payload) {
    const response = await axiosClient.put(`/${URL}`, payload);
    return response;
}

export async function patchRequest(URL, payload) {
    const response = await axiosClient.patch(`/${URL}`, payload);
    return response;
}

export async function deleteRequest(URL) {
    const response = await axiosClient.delete(`/${URL}`);
    return response;
}