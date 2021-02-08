import React from 'react';

import './ListCountry.css';

const ListCountry = ({printInfo, country}) => {
	return (
		<li className="ListCountry" onClick={printInfo}><span>{country}</span></li>
	);
};

export default ListCountry;