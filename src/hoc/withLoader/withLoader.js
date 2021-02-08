import React from 'react';
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";

const withLoader = (CountriesWrapper, axios) => {

	return function WithLoader(props) {
		const [loading, setLoading] = React.useState(false);
		const [error, setError] = React.useState(null)

		React.useEffect(() => {
			setTimeout(() => {
				axios.interceptors.request.use(req => {
					setLoading(true);
					return req;
				});
			}, 2000);
		}, []);

		const errorData = React.useMemo(() => {
			return axios.interceptors.response.use(res => res, error => {
				console.log('Error ErrorData');
				setError(error);
				setLoading(false);
				throw error;
			});
		}, []);

		React.useEffect(() => {
			return () => {
				axios.interceptors.response.eject(errorData);
			}
		}, [errorData]);

		const errorDismissed = () => {
			setError(null);
		};

		let CountriesOutput = (
			<>
				<Modal show={!!error} closed={errorDismissed}>
					{error && "Network error"}
				</Modal>
				<CountriesWrapper {...props} />
			</>
		);

		if (loading) {
			CountriesOutput = <Spinner/>
		}

		return CountriesOutput;
	}
};

export default withLoader;