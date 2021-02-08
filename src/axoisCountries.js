import axios from "axios";

const axiosCountries = axios.create({
	baseURL: 'https://restcountries.eu/rest/v2'
});

export default axiosCountries;