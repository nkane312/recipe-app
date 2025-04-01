// import { useState, useEffect } from 'react';
import { Recipe } from './@types';

export const useMongoRequest = () => {
	// const [mongoResponse, setMongoResponse] = useState('');

	const sendMongoRequest = async (method: string, recipeData: Recipe | null) => {
		const request = await fetch(`http://localhost:3000/${method}/`, {
			method: 'POST',
			body: JSON.stringify(recipeData),
			headers: { 'Content-Type': 'application/json' },
		});
		const mongoReq = await request;
		console.log(mongoReq);
		console.log(mongoReq.text());
		return mongoReq;
	};
	return { sendMongoRequest };
};
