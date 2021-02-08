import React from 'react';

import './Country.css';


const Country = props => {

	return (
		<div className="Country">
			<div className="row align-items-start">
				<div className="col-12 col-lg-6">
					<h2 className="mb-5">{props.title}</h2>
					<p><strong>Capital: </strong>{props.capital}</p>
					<p><strong>Population: </strong>{props.population}</p>
					<p><strong>CIOC: </strong>{props.cioc}</p>
				</div>
				<div className="col-12 col-lg-6">
					<div className="card">
						<img src={props.image} className="card-img" alt={"Flag " + props.title}/>
					</div>
				</div>
			</div>
			<div className="Border-block mt-5">
				<p><strong>Border with:</strong></p>
				<ul>
					{!props.borders ? null : props.borders.map((li, index) => (
						<li key={index}>{li}</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Country;