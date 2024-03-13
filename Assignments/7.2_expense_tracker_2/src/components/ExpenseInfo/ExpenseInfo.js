import React from "react";
import styles from "./ExpenseInfo.module.css";

const ExpenseInfo = (props) => {
  // Add logic here to calculate the grand total, profit and expense amount here
  const { expenses } = props;
  let balance = 0,
    expense = 0,
    income = 0;
  expenses.forEach((ex) => {
    if (ex.amount < 0) expense += ex.amount;
    else income += ex.amount;
  });
  balance = income + expense;
  return (
    <div className={styles.expenseInfoContainer}>
      <div className={styles.balance}>
        <h4>YOUR BALANCE</h4>
        <h1>${balance}</h1>
      </div>
      <div className={styles.incomeExpenseContainer}>
        <div>
          <h4>Income</h4>
          <p id="money-plus" className={`${styles.money} ${styles.plus}`}>
            +${income}
          </p>
        </div>
        <div>
          <h4>Expense</h4>
          <p id="money-minus" className={`${styles.money} ${styles.minus}`}>
            -${Math.abs(expense)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExpenseInfo;
