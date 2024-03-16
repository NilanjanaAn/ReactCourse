import React, { useEffect, useRef } from "react";
import styles from "./ExpenseForm.module.css";

const ExpenseForm = ({ addExpense, edit, exp, updateExpense }) => {
  const expenseTextInput = useRef();
  const expenseAmountInput = useRef();

  // Use the useEffect hook here, to check if an expense is to be updated
  // If yes, the autofill the form values with the text and amount of the expense

  useEffect(() => {
    {
      edit ? (expenseTextInput.current.value = exp.text) : clearInput();
    }
    {
      edit ? (expenseAmountInput.current.value = exp.amount) : clearInput();
    }
  }, [edit]);

  const onSubmitHandler = (e, type) => {
    e.preventDefault();
    const expenseText = expenseTextInput.current.value;
    const expenseAmount = expenseAmountInput.current.value;

    if (type === "ADD") {
      if (parseInt(expenseAmount) === 0) {
        return;
      }

      const expense = {
        text: expenseText,
        amount: expenseAmount,
        id: new Date().getTime(),
      };
      addExpense(expense);
      clearInput();
      return;
    } else {
      // Logic to update expense here
      updateExpense(expenseText, expenseAmount);
    }
  };

  const clearInput = () => {
    expenseAmountInput.current.value = "";
    expenseTextInput.current.value = "";
  };

  return (
    <form className={styles.form} onSubmit={(e)=>{e.preventDefault();return edit?onSubmitHandler(e,"EDIT"):onSubmitHandler(e,"ADD")}}>
      {/* Change text to Edit Transaction if an expense is to be updated */}
      <h3>{edit ? "Edit Transaction" : "Add new transaction"}</h3>
      <label htmlFor="expenseText">Text</label>
      <input
        id="expenseText"
        className={styles.input}
        type="text"
        placeholder="Enter text..."
        ref={expenseTextInput}
        required
      />
      <div>
        <label htmlFor="expenseAmount">Amount</label>
        <div>(negative - expense,positive-income)</div>
      </div>
      <input
        className={styles.input}
        id="expenseAmount"
        type="number"
        ref={expenseAmountInput}
        required
        placeholder="Enter amount..."
      />
      <button className={styles.submitBtn}>
        {/* Change text to Edit Transaction if an expense is to be updated */}
        {edit ? "Edit Transaction" : "Add Transaction"}
      </button>
    </form>
  );
};

export default ExpenseForm;
