import axios from "axios";

import Toast from "../../components/common/Toast";

const Axios = axios.create({
	baseURL: import.meta.env.VITE_APP_SERVER_URL,
	headers: {
		"Cache-Control": "no-cache",
		"Content-Type": "application/json",
		"Allow-Access-Control-Allow-Origin": "*",
	},
});

const requestHandler = (config) => {
	let token = localStorage.getItem("auth_token");

	if (!config.headers.Authorization) {
		config.headers.Authorization = token ? `Bearer ${token}` : null;
	}

	return Promise.resolve(config);
};

//request interceptor
Axios.interceptors.request.use(
	(config) => requestHandler(config),
	(error) => Promise.reject(error)
);

const errorHandler = async (error) => {
	if (!error.response) {
		Toast.error(error.message || "Network error - something went wrong");
	}

	if (error.response && error.response.data) {
		Toast.error(
			typeof error.response.data.message === "string"
				? error.response.data.message
				: "Something went wrong"
		);

		if (
			["UNAUTHORIZED"].includes(error.response.data.status) ||
			error.response.status === 403
		) {
			// dispatch(clearLogs())
		}
	}
	return Promise.reject(error);
};

//response interceptor
Axios.interceptors.response.use(
	(response) => Promise.resolve(response),
	(error) => errorHandler(error)
);

export default Axios;
