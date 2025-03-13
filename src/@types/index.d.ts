export type Recipe = {
	_id: string;
	name: string;
	slug: string;
	ingredients: {
		type: string;
		amount: string;
		measurement: string;
	}[];
};

export type RecipeList = Recipe[];
