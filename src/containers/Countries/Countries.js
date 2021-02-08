import React, {useState, useEffect} from 'react';

import Country from "../../components/Country/Country";
import ListCountry from "../../components/ListCountry/ListCountry";
import axiosCountries from "../../axoisCountries";
import withLoader from "../../hoc/withLoader/withLoader";

import './Countries.css';


const Countries = () => {
	const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState({});

	const getCountries = async () => {
		try {
				await Promise.all([
				await axiosCountries.get('/all')
			])
				.then(response => {
					const listCountries = response[0].data.map(country => {
						return (
							country
						)
					});
					setCountries(listCountries);
				})
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getCountries().then(console.error);
	}, []);

	const printInfo = (e) => {
		const text = e.target.textContent;
		countries.forEach( async (item) => {
			if (text === item.name) {
				const borders = [];

				for (let i = 0; i < item.borders.length; i++) {
					await axiosCountries.get('/alpha/' + item.borders[i])
						.then(response => {
							const url = response.data.name;
							borders.push(url);
						})
				}

					setCountry({
						name: item.name,
						capital: item.capital,
						population: item.population,
						region: item.region,
						flag: item.flag,
						borders,
						cioc: item.cioc
					});
			}
		})
	};


	return (
		<>
			<div className="container mt-3">
				<div className="row align-items-start">
					<div className="col-12 col-lg-4">
						<div className="ListCountries">
							<ul className="pt-2 pb-3">
								{countries.map((country, index) => {
									return (
										<ListCountry key={index} country={country.name} printInfo={printInfo}/>
									)
								})}
							</ul>
						</div>
					</div>
					<div className="col-12 col-lg-8">
						<Country
							title={country.name}
							capital={country.capital}
							population={country.population}
							image={country.flag}
							cioc={country.cioc}
							borders={country.borders}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default withLoader(Countries, axiosCountries);