import express from 'express';
import cors from 'cors';
// import data from '../src/assets/recipe-list.json';
import data from '../src/assets/recipe-list.js';
import { MongoClient, ServerApiVersion } from 'mongodb';
import 'dotenv/config';

type Recipe = {
	name: string;
	slug: string;
	ingredients: {
		type: string;
		amount: string;
		measurement: string;
	}[];
};

const uri = `mongodb+srv://${process.env.MONGODUSER}:${process.env.MONGODPASS}@dev-recipeapp.yonre.mongodb.net/?retryWrites=true&w=majority&appName=dev-recipeapp`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function run(document?: Recipe | { slug: string }, mongoMethod?: string) {
	// document = document === undefined ? {} : document;
	try {
		// Connect the client to the server	(optional starting in v4.7)
		await client.connect();
		// Send a ping to confirm a successful connection
		await client.db('admin').command({ ping: 1 });
		const collection = client.db('recipeapp').collection('recipes');
		if (document === undefined) {
			const findResult = await collection.find({}).toArray();
			return findResult;
		} else {
			if (
				(await collection.findOne({ slug: document.slug })) !== null &&
				mongoMethod === 'remove'
			) {
				const removeRecipe = await collection.deleteOne({ slug: document.slug });
				if (removeRecipe.acknowledged) {
					return 'Recipe removed!';
				} else {
					return 'Failed to remove recipe.';
				}
			} else if (
				(await collection.findOne({ slug: document.slug })) !== null &&
				mongoMethod === 'add'
			) {
				return 'Recipe already exists in database!';
			} else if (
				(await collection.findOne({ slug: document.slug })) === null &&
				mongoMethod === 'add'
			) {
				const addRecipe = await collection.insertOne(document);
				if (addRecipe.acknowledged) {
					return 'Recipe Added!';
				} else {
					return 'Failed to add recipe.';
				}
			} else {
				const recipe = await collection.findOne({ slug: document.slug });
				return recipe;
			}
		}
	} catch (err) {
		console.error(err);
		await client.close();
	}
	// finally {
	// 	// Ensures that the client will close when you finish/error
	// 	await client.close();
	// }
}

const app = express();
const port = 3000;

app.use(cors());

app.get('/recipe', (req, res) => {
	// const recipes = data;
	res.send(data);
});

// app.get('/recipe/:recipe', (req, res) => {
// 	const recipe = data.find((element) => element.slug === req.params.recipe);

// 	res.send(recipe);
// });

//API Endpoint

app.get('/search/:ingredient', (req, res) => {
	fetch(
		'https://api.spoonacular.com/recipes/complexSearch?apiKey=' +
			process.env.SPOONACULAR_KEY +
			'&query=' +
			req.params.ingredient,
	)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok ' + response.statusText);
			}
			return response.json();
		})
		.then((data) => {
			res.send(data);
		})
		.catch((error) => {
			console.error('There was a problem with the fetch operation:', error);
		});
});

app.get('/recipe/:id', (req, res) => {
	fetch(
		'https://api.spoonacular.com/recipes/' +
			req.params.id +
			'/information?apiKey=' +
			process.env.SPOONACULAR_KEY,
	)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok ' + response.statusText);
			}
			return response.json();
		})
		.then((data) => {
			res.send(data);
		})
		.catch((error) => {
			console.error('There was a problem with the fetch operation:', error);
		});
});

//MongoDB Recipes Endpoints
app.get('/recipes', async (req, res) => {
	const recipes = await run().catch(console.dir);
	res.send(recipes);
});

app.get('/recipes/:recipe', async (req, res) => {
	const recipeReq = { slug: req.params.recipe };
	// console.log(recipeReq);
	const recipe = await run(recipeReq).catch(console.dir);
	// console.log(recipe);
	// const recipe = data.find((element) => element.slug === req.params.recipe);

	res.send(recipe);
});

app.use(express.json());

app.post('/add', async (req, res) => {
	const added = await run(req.body, 'add').catch(console.dir);
	res.send(added);
});

app.post('/remove', async (req, res) => {
	const removed = await run(req.body, 'remove').catch(console.dir);
	res.send(removed);
});
// End MongoDB Recipes Endpoints

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
