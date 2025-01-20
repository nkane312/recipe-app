import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;

app.use(cors());

app.get('/recipe/:recipe', (req, res) => {
  console.log('params', req.params)
  console.log('query', req.query)
  const recipe = {
    name: 'pancakes',
    ingredients: [{type: 'butter', amount: 1, measurement: 'tbsp'}, {type: 'milk', amount: 1, measurement: 'cup'}, {type: 'eggs', amount: 3, measurement: 'egg'}, {type: 'flour', amount: 2, measurement: 'cup'}]
  }
  
  res.send(recipe)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})