import React, { createContext, useContext, useEffect, useState } from 'react';
import { RecipeList, MongoDBContext } from './@types';
import { useAPI } from './SpoonacularContext';
import { useMongoRequest } from './useMongoRequest';

const MongoContext = createContext<MongoDBContext | undefined>(undefined);

export const MongoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [mongoList, setMongoList] = useState<RecipeList>([]);
	const [isMongoLoading, setIsMongoLoading] = useState(true);
	// const [mongoAdjusted, setMongoAdjusted] = useState(false);

	// const [recipe, setRecipe] = useState<Recipe | null>(null);
	const { recipe } = useAPI();
	const [inMongo, setInMongo] = useState(false);

	const { sendMongoRequest } = useMongoRequest();
	const handleAdd = async () => {
		// setMongoAdjusted(!mongoAdjusted);
		await sendMongoRequest('add', recipe);
		setInMongo(true);
	};
	const handleRemove = async () => {
		await sendMongoRequest('remove', recipe);
		// setMongoAdjusted(!mongoAdjusted);
		setInMongo(false);
	};

	useEffect(() => {
		const getMongo = async () => {
			setIsMongoLoading(true);
			const mongoListRequest = await fetch('http://localhost:3000/recipes/');
			const mongoListResponse = await mongoListRequest.json();
			console.log(mongoListResponse);
			setMongoList(mongoListResponse);
			setIsMongoLoading(false);
			// setMongoAdjusted(true);
		};
		getMongo().catch(console.error);
	}, [inMongo]);

	useEffect(() => {
		const mongoExists = async () => {
			if (recipe !== null) {
				const response = await fetch('http://localhost:3000/recipes/' + recipe.slug);
				if (response.status === 200) {
					const recipeText = await response.text();
					// console.log(recipeText);
					if (recipeText === '') {
						setInMongo(false);
					} else {
						setInMongo(true);
					}
				} else {
					setInMongo(false);
				}
			} else {
				setInMongo(false);
			}
		};
		mongoExists().catch(console.error);
	}, [inMongo, recipe]);

	return (
		<MongoContext.Provider value={{ mongoList, inMongo, isMongoLoading, handleAdd, handleRemove }}>
			{children}
		</MongoContext.Provider>
	);
};

export function useMongo() {
	const context = useContext(MongoContext);
	if (context === undefined) {
		throw new Error('Context must be used within a Provider');
	}
	return context;
}
