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

// export interface SpoonacularRecipe extends CustomRecipe {
// 	image: string;
// 	summary: string;
// 	servings: number;
// 	time: number;
// 	diet: {
// 		vegetarian: boolean;
// 		vegan: boolean;
// 		glutenFree: boolean;
// 		dairyFree: boolean;
// 	};
// 	instructions: { number: number; step: string }[];
// }

export type SearchFunction = (ingredient: string, e: FormEvent<HTMLDivElement>) => void;

export type RecipeList = Recipe[];
