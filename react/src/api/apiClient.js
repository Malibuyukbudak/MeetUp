import axios from "axios";
import { toast } from "react-toastify";

const apiClient = axios.create({
	baseURL: localStorage.getItem('url'),
	headers: {
		"Content-Type": "application/json",
	}});

apiClient.interceptors.request.use(
	(config) => {
		config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`
		return config
	},
	(error) => {
		toast.error('Error: ' + error);
		return Promise.reject(error);
	}
);

apiClient.interceptors.response.use(response => {
	return response;
}, (error) => {
	if (error.response?.status === 401 || error.response?.status === 403) {
		toast.error('Unauthorized! Redirecting to login...');
		window.location.href = "/login";
		localStorage.removeItem('token')
	}
	toast.error('Error: ' + error);
	return error;
});


export default apiClient;