export interface Recipe {
	_id: string;
	name: string;
	slug: string;
	ingredients: {
		type: string;
		amount: string;
		measurement: string;
	}[];
}

export interface SpoonacularRecipe extends Recipe {
	image: string;
}

export type SearchFunction = (ingredient: string, e: FormEvent<HTMLDivElement>) => void;

export type RecipeList = Recipe[];
