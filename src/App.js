/*===========================================
				App.js
===========================================*/
import React, { useState } from 'react';
import Alert from './components/Alert';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import uuid from 'uuid/dist/v4';
import './App.css';

const initialExpenses = [
	{ id: uuid(), nameOfExpense: 'rent', amount: 1600 },
	{ id: uuid(), nameOfExpense: 'food', amount: 500 },
	{ id: uuid(), nameOfExpense: 'car', amount: 900 },
];


function App() {

	const [expenses, setExpenses] = useState(initialExpenses);


	return (
		<>
			<Alert />
			<div>
				<h1>react-budget-calculator</h1>
			</div>
			<main className="App">
				<ExpenseForm />
				<ExpenseList expenses={expenses} />
			</main>
			<h1>
				total spending :{" "}
				<span className="total">
					$
            {expenses.reduce((acc, curr) => {
					return (acc += curr.amount);
				}, 0)}
				</span>
			</h1>

		</>
	);
};

export default App;
