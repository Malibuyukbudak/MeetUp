import axios from "axios";

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
		return Promise.reject(error);
	}
);

apiClient.interceptors.response.use(response => {
	return response;
}, (error) => {
	if (error.response?.status === 401 || error.response?.status === 403) {
		window.location.href = "/login";
		localStorage.removeItem('token')
	}
	return error;
});


export default apiClient;