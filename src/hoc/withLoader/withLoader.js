import React, {useEffect, useState} from 'react';
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";

const withLoader = (CountriesWrapper, axios) => {

	return function WithLoader(props) {
		const [loading, setLoading] = useState(false);
		const [error, setError] = useState(false)

		useEffect(() => {
				axios.interceptors.request.use(req => {
					setLoading(true);
					return req;
				});
		}, []);

		useEffect(() => {
			axios.interceptors.response.use(res => {
					setLoading(false);
					return res;
				}, error => {
					setLoading(false);
					setError(true);
					throw error;
			});
		}, []);

		const errorDismissed = () => {
			setError(false);
		};

		return (
			<>
				<Modal show={error} closed={errorDismissed}>
					{error && (error.message || "Network error")}
				</Modal>
				{loading && <Spinner/>}
				<CountriesWrapper {...props} />
			</>
		)
	}
};

export default withLoader;