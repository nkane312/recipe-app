import express from 'express';
import cors from 'cors';
// import data from '../src/assets/recipe-list.json';
import data from '../src/assets/recipe-list.js';

const app = express();
const port = 3000;

app.use(cors());

app.get('/recipe/:recipe', (req, res) => {
	console.log('params', req.params);
	console.log('query', req.query);
	const recipe = data.find((element) => element.slug === req.params.recipe);

	res.send(recipe);
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
