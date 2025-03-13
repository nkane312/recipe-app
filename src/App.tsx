// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';
import { Helmet } from 'react-helmet';
import { Navigation } from './Navigation';
import Dashboard from './Dashboard';

// const recipeRequest = await fetch('http://localhost:3000/recipe/meatloaf');
// const recipe = await recipeRequest.json();

const recipesListRequest = await fetch('http://localhost:3000/recipes/pasta');
const recipesList = await recipesListRequest.json();

const mongoListRequest = await fetch('http://localhost:3000/recipes/');
const mongoList = await mongoListRequest.json();

// const mongoAddRequest = await fetch('http://localhost:3000/add/', {
// 	method: 'POST',
// 	body: JSON.stringify({
// 		name: 'Mac and Cheese',
// 		slug: 'mac-and-cheese',
// 		ingredients: [
// 			{ type: 'cheddar cheese', amount: '2', measurement: 'cups' },
// 			{ type: 'elbow macaroni', amount: '1', measurement: 'box' },
// 			{ type: 'butter', amount: '1/4', measurement: 'cup' },
// 			{ type: 'milk', amount: '2', measurement: 'cups' },
// 		],
// 	}),
// 	headers: { 'Content-Type': 'application/json' },
// });
// const mongoAdd = await mongoAddRequest.text();

// const mongoRemoveRequest = await fetch('http://localhost:3000/remove/', {
// 	method: 'POST',
// 	body: JSON.stringify({
// 		name: 'Mac and Cheese',
// 		slug: 'mac-and-cheese',
// 		ingredients: [
// 			{ type: 'cheddar cheese', amount: '2', measurement: 'cups' },
// 			{ type: 'elbow macaroni', amount: '1', measurement: 'box' },
// 			{ type: 'butter', amount: '1/4', measurement: 'cup' },
// 			{ type: 'milk', amount: '2', measurement: 'cups' },
// 		],
// 	}),
// 	headers: { 'Content-Type': 'application/json' },
// });
// const mongoRemove = await mongoRemoveRequest.text();

function App() {
	// console.log(mongoList);
	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1, width=device-width" />
				<title>Recipe Dashboard</title>
			</Helmet>
			{/* <div>
				<a href="https://vite.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div> */}
			<Navigation />
			<h1>Vite + React</h1>
			<div className="card">
				<p></p>
			</div>
			<div className="card">
				{/* <p>{JSON.stringify(recipe)}</p> */}
				<p>{JSON.stringify(recipesList)}</p>
				{/* <p>MongoDB data: {JSON.stringify(mongoList)}</p> */}
				{/* <p>{mongoAdd}</p> */}
				{/* <p>{mongoRemove}</p> */}
			</div>
			<Dashboard data={mongoList} />
		</>
	);
}

export default App;
