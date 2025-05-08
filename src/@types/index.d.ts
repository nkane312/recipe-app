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

export interface SpoonacularRecipe {
	id: number;
	image: string;
	imageType: string;
	title: string;
	readyInMinutes: number;
	servings: number;
	sourceUrl: string;
	vegetarian: boolean;
	vegan: boolean;
	glutenFree: boolean;
	dairyFree: boolean;
	veryHealthy: boolean;
	cheap: boolean;
	veryPopular: boolean;
	sustainable: boolean;
	lowFodmap: boolean;
	weightWatcherSmartPoints: number;
	gaps: string;
	preparationMinutes: number | null;
	cookingMinutes: number | null;
	aggregateLikes: number;
	healthScore: numbernumber;
	creditsText: string;
	license: null;
	sourceName: string;
	pricePerServing: number;
	extendedIngredients: {
		id: number;
		aisle: string;
		image: string;
		consistency: string;
		name: string;
		nameClean: string;
		original: string;
		originalName: string;
		amount: number;
		unit: string;
		meta: string[];
		measures: {
			us: { amount: number; unitShort: string; unitLong: string };
			metric: { amount: number; unitShort: string; unitLong: string };
		};
	}[];
	summary: string;
	cuisines: string[];
	dishTypes: string[];
	diets: string[];
	occasions: string[];
	instructions: string;
	analyzedInstructions: {
		name: string;
		steps: {
			number: number;
			step: string;
			ingredients: {
				id: number;
				name: string;
				localizedName: string;
				image: string;
			}[];
			equipment: {
				id: number;
				name: string;
				localizedName: string;
				image: string;
			}[];
			length?: { number: number; unit: string };
		}[];
	}[];
	originalId: null;
	spoonacularScore: number;
	spoonacularSourceUrl: string;
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
	newRecipes?: { id: number; image: string; title: string; imageType: string }[];
	isLoading: boolean;
	newRecipeIndex: number;
}
