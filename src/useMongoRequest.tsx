import { Recipe } from './@types';

export const useMongoRequest = () => {
	const sendMongoRequest = async (method: string, recipeData: Recipe | null) => {
		const request = await fetch(`http://localhost:3000/${method}/`, {
			method: 'POST',
			body: JSON.stringify(recipeData),
			headers: { 'Content-Type': 'application/json' },
		});
		const mongoReq = await request;
		return mongoReq;
	};
	return { sendMongoRequest };
};
