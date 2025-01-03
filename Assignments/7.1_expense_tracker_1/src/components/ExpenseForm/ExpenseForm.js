import React, { useRef } from "react";
import styles from "./ExpenseForm.module.css";

const ExpenseForm = (props) => {
  // Create state or ref for the inputs here
  const expenseTextInput = useRef();
  const expenseAmountInput = useRef();
  let { addExpense } = props;

  const onSubmitHandler = (e) => {
    e.preventDefault();
    addExpense({
      id: new Date().getTime(),
      text: expenseTextInput.current.value,
      amount: Number(expenseAmountInput.current.value),
    });
  };

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        onSubmitHandler(e);
      }}
    >
      <h3>Add new transaction</h3>
      <label htmlFor="expenseText">Text</label>
      <input
        id="expenseText"
        className={styles.input}
        type="text"
        placeholder="Enter text..."
        required
        ref={expenseTextInput}
      />
      <div>
        <label htmlFor="expenseAmount">Amount</label>
        <div>(negative - expense, positive - income)</div>
      </div>
      <input
        className={styles.input}
        id="expenseAmount"
        type="number"
        placeholder="Enter amount..."
        required
        ref={expenseAmountInput}
      />
      <button className={styles.submitBtn}>Add Transaction</button>
    </form>
  );
};

export default ExpenseForm;
