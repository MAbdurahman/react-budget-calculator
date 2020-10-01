/*===========================================
				App.js
===========================================*/
import React, { useState, useEffect } from 'react';
import Alert from './components/Alert';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import uuid from 'uuid/dist/v4';
import './App.css';

const initialExpenses =
	localStorage.getItem('expenses') ? JSON.parse.localStorage.getItem('expenses') : [];

function App() {

	//**************** State Values ****************//
	const [expenses, setExpenses] = useState(initialExpenses);
	const [nameOfExpense, setNameOfExpense] = useState('');
	const [amount, setAmount] = useState('');
	const [alert, setAlert] = useState({ isShowing: false });
	const [edit, setEdit] = useState(false);
	const [id, setId] = useState(0);

	//**************** Hook - UseEffect ****************//
	useEffect(() => {
		localStorage.setItem('expenses', JSON.stringify(expenses));
	}, [expenses]);

	//**************** Functionality ****************//
	const handleNameOfExpense = e => {
		// console.log(`nameOfExpense: ${e.target.value}`);
		setNameOfExpense(e.target.value);
	}

	const handleAmount = e => {
		// console.log(`amount: ${e.target.value}`);
		setAmount(e.target.value);
	}

	const handleAlert = ({ type, text }) => {
		setAlert({ isShowing: true, type, text });
		setTimeout(() => {
			setAlert({ isShowing: false });
		}, 3000);

	};

	const handleDelete = id => {
		// console.log(`expense item deleted: ${id}`);
		let tempExpenses = expenses.filter(expense => expense.id !== id);
		let expenseItem = expenses.find(expense => expense.id === id);
		let { nameOfExpense } = expenseItem;
		setExpenses(tempExpenses);
		handleAlert({ type: 'danger', text: `${nameOfExpense} expense deleted!` });

	};

	const handleEdit = id => {
		// console.log(`expense item edited: ${id}`);
		let expenseItem = expenses.find(expense => expense.id === id);
		let { nameOfExpense, amount } = expenseItem;
		setNameOfExpense(nameOfExpense);
		setAmount(amount);
		setEdit(true);
		setId(id);

	};

	const clearAllExpenses = () => {
		// console.log('cleared all expenses');
		setExpenses([]);
		handleAlert({ type: 'danger', text: 'all expenses deleted!' })

	};

	const handleSubmit = e => {
		e.preventDefault();
		// console.log(nameOfExpense, amount);
		if (nameOfExpense !== '' && amount > 0) {

			if (edit) {
				let tempExpenses = expenses.map(expense => {
					return expense.id === id ? { ...expense, nameOfExpense, amount } : expense;
				});
				let tempExpenseItem = expenses.find(expense => expense.id === id);
				setExpenses(tempExpenses);
				handleAlert({ type: 'success', text: `${tempExpenseItem.nameOfExpense} has been edited` });
				setEdit(false);

			} else {

				const singleExpense = { id: uuid(), nameOfExpense, amount };
				setExpenses([...expenses, singleExpense]);
				handleAlert({ type: 'success', text: `${nameOfExpense} expense added` });

			}

			setNameOfExpense('');
			setAmount('');

		} else if (nameOfExpense === '') {
			handleAlert({ type: 'danger', text: 'name of expense cannot be empty!' });

		} else {
			handleAlert({ type: 'danger', text: 'expense amount must be greater than zero!' });

		}
	};

	return (
		<>
			{alert.isShowing && <Alert type={alert.type} text={alert.text} />}
			<Alert />
			<div>
				<h1>react-budget-calculator</h1>
			</div>
			<main className="App">
				<ExpenseForm
					nameOfExpense={nameOfExpense}
					amount={amount}
					handleAmount={handleAmount}
					handleNameOfExpense={handleNameOfExpense}
					handleSubmit={handleSubmit}
					edit={edit}
				/>
				<ExpenseList
					expenses={expenses}
					handleDelete={handleDelete}
					handleEdit={handleEdit}
					clearAllExpenses={clearAllExpenses} />
			</main>
			<h1>
				total spending :{" "}
				<span className="total">
					$
            {expenses.reduce((acc, curr) => {
					return (acc += parseInt(curr.amount));
				}, 0)}
				</span>
			</h1>
		</>
	);
};

export default App;
