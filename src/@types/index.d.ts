import { SetStateAction } from 'react';

export interface Recipe {
	_id?: string;
	spoonacularId: number;
	timestamp: Date | string;
	name: string;
	slug: string;
	ingredients: {
		name: string;
		amount: string;
		unit: string;
	}[];
	image: string;
	summary: string;
	servings: number;
	cookTime: number;
	diet: {
		vegetarian: boolean;
		vegan: boolean;
		glutenFree: boolean;
		dairyFree: boolean;
	};
	instructions: { number: number; step: string }[];
}

export type SearchFunction = (ingredient: string, e: FormEvent<HTMLDivElement>) => void;

type MongoFunction = () => void;

export type RecipeList = Recipe[];

export interface MongoDBContext {
	mongoList: RecipeList;
	inMongo: boolean;
	isMongoLoading: boolean;
	handleAdd: MongoFunction;
	handleRemove: MongoFunction;
}

export interface SpoonacularAPIContext {
	runSearch: SearchFunction;
	recipeId: string;
	setRecipeId: SetStateAction;
	recipe: Recipe | null;
	newRecipes?: { id: number; image: string; title: string }[];
	isLoading: boolean;
	newRecipeIndex: number;
}
