/*===========================================
            components/ExpenseList.js
===========================================*/
import React from 'react';
import { MdDelete } from "react-icons/md";
import Item from './ExpenseItem';

const ExpenseList = ({expenses}) => {

   return (
      <>
         <ul className="list">
            {expenses.map(expense => {
               return <Item key={expense.id} expense={expense} />;
            })}
         </ul>
         {expenses.length > 0 && (
            <button className="btn">
               clear expenses
               <MdDelete className="btn-icon" />
            </button>
         )}
      </>
   );
};

export default ExpenseList;
