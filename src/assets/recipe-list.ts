type RecipeList = {
	name: string;
	slug: string;
	ingredients: {
		type: string;
		amount: string;
		measurement: string;
	}[];
}[];

const Data: RecipeList = [
	{
		name: 'Pancakes',
		slug: 'pancakes',
		ingredients: [
			{ type: 'butter', amount: '1', measurement: 'tbsp' },
			{ type: 'milk', amount: '1', measurement: 'cup' },
			{ type: 'eggs', amount: '3', measurement: 'egg' },
			{ type: 'flour', amount: '2', measurement: 'cups' },
		],
	},
	{
		name: 'Salsa Verde',
		slug: 'salsa-verde',
		ingredients: [
			{ type: 'butter', amount: '1', measurement: 'tbsp' },
			{ type: 'tomotillo', amount: '1', measurement: 'cup' },
			{ type: 'eggs', amount: '3', measurement: 'eggs' },
			{ type: 'pepper', amount: '1', measurement: 'tsp' },
		],
	},
	{
		name: 'Meatloaf',
		slug: 'meatloaf',
		ingredients: [
			{ type: 'ground beef', amount: '1', measurement: 'lb' },
			{ type: 'chopped onion', amount: '1/4', measurement: 'cup' },
			{ type: 'eggs, beaten', amount: '2', measurement: 'eggs' },
			{ type: 'milk', amount: '1/2', measurement: 'cup' },
			{ type: 'bread crumbs', amount: '1', measurement: 'cup' },
			{ type: 'italian seasoning', amount: '1', measurement: 'tsp' },
			{ type: 'ketchup', amount: '1/2', measurement: 'cup' },
		],
	},
];

export default Data;
