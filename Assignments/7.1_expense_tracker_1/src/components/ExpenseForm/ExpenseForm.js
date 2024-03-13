import React, { createRef } from "react";
import styles from "./ExpenseForm.module.css";



export default function ExpenseForm(props) {
  // Create state or ref for the inputs here
  const textRef = createRef();
  const valueRef = createRef();
  let {total, positive, negative, setTotal, setNegative, setPositive, transactions, setTransactions} = props;

  function handleAddTransaction(e)
  {
    e.preventDefault();
    setTransactions([
      ...transactions,
      { text: textRef.current.value, amount: valueRef.current.value }
    ]);
    console.log(valueRef.current.value, positive, negative)
    if(valueRef.current.value<0)
    {
      setNegative(Number(negative)+Number(valueRef.current.value));
      setTotal(Number(total)+Number(valueRef.current.value));
    }
    else
    {
      setPositive(Number(positive)+Number(valueRef.current.value));
      setTotal(Number(total)+Number(valueRef.current.value));
    }
  }
  return (
    <form className={styles.form} onSubmit={(e) => {handleAddTransaction(e)}}>
      <h3>Add new transaction</h3>
      <label htmlFor="expenseText">Text</label>
      <input
        id="expenseText"
        className={styles.input}
        type="text"
        placeholder="Enter text..."
        required
        ref={textRef}
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
        ref={valueRef}
      />
      <button className={styles.submitBtn}>Add Transaction</button>
    </form>
  );
}
