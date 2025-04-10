import '@testing-library/jest-dom';
import '@testing-library/jest-dom/jest-globals';
import { afterEach, jest, beforeEach } from '@jest/globals';
import { TextEncoder } from 'util';
import SpoonacularRecipe642583 from './__mocks__/recipe-642583.json';

import SpoonacularRecipe642584 from './__mocks__/recipe-642584.json';
import SpoonacularRecipeList from './__mocks__/pastaRecipes.json';
import MongoList from './__mocks__/mongoList.json';

global.TextEncoder = TextEncoder;
// global.TextDecoder = TextDecoder;
const assetsFetchMock = (url: RequestInfo | URL) => {
	console.log(url.toString());
	const mock = url.toString().endsWith('recipes/')
		? MongoList
		: url.toString().includes('search/')
		? SpoonacularRecipeList
		: url.toString().includes('recipe-bulk/')
		? [SpoonacularRecipe642583, SpoonacularRecipe642584]
		: url.toString().includes('recipe/642583')
		? SpoonacularRecipe642583
		: SpoonacularRecipe642584;

	return Promise.resolve({
		json: () => Promise.resolve(mock),
	} as Response);
};

beforeEach(() => {
	jest.resetAllMocks();
	global.fetch = jest.fn(assetsFetchMock);
	// jest.spyOn(global, 'fetch').mockImplementation(assetsFetchMock);
});

afterEach(() => {
	window.localStorage.clear();
});
