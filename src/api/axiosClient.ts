import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Local } from 'helpers/function';
import queryString from 'query-string';

const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL ?? '',
	headers: {
		'content-type': 'application/json',
	},
	paramsSerializer: {
		encode: (params: any) => queryString.stringify(params),
	},
});

// Add a request interceptor
axiosClient.interceptors.request.use(
	async function (config: AxiosRequestConfig) {
		config.headers = config.headers ?? {};
		// Do something before request is sent
		// let token = await getLocalData(LOCAL_STORAGE_ENUM.TOKEN);
		// console.log("token ne:", token);
		// if (token) {
		// 	config.headers.Authorization = `Bearer ${token}`;
		// }

		return config;
	},
	function (error: any) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor
axiosClient.interceptors.response.use(
	function (response: AxiosResponse) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response.data;
	},
	function (error: any) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error);
	}
);

export default axiosClient;
