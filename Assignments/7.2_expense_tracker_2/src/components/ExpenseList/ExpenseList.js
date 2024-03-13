import React from "react";
import styles from "./ExpenseList.module.css";
import Transaction from "../Transaction/Transaction";

const ExpenseList = (props) => {
  const {expenses, deleteExpense}=props;
  return (
    <div className={styles.expenseListContainer}>
      <h3>Transactions</h3>
      <ul className={styles.transactionList}>
        {/* Display transactions here */}
        {expenses.map((ex, index)=>(
            <Transaction expense={ex} key={ex.id} deleteExpense={deleteExpense} index={index}/>
          ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
