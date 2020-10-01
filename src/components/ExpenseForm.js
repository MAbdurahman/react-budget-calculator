/*===========================================
            ExpenseForm.js
===========================================*/
import React from 'react';
import { MdSend } from "react-icons/md";


const ExpenseForm = ({nameOfExpense, amount, handleNameOfExpense, handleAmount, handleSubmit, edit}) => {
   return (
      <form onSubmit={handleSubmit}>
         <div className="form-center">
            <div className="form-group">
               <label htmlFor="nameOfExpense">expense</label>
               <input
                  type="text"
                  className="form-control"
                  id="nameOfExpense"
                  name="nameOfExpense"
                  placeholder="e.g. name of expense"
                  value={nameOfExpense}
                  onChange={handleNameOfExpense}
               />
            </div>
            <div className="form-group">
               <label htmlFor="amount">amount</label>
               <input
                  type="number"
                  className="form-control"
                  id="amount"
                  name="amount"
                  placeholder="e.g. expense amount"
                  value={amount}
                  onChange={handleAmount}
                  
               />
            </div>
         </div>
         <button type="submit" className="btn">
            {edit ? 'edit' : 'submit'}
         <MdSend className="btn-icon" />
         </button>
      </form>
   );
};

export default ExpenseForm;

