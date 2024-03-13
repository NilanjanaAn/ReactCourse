import React from "react";
import styles from "./ExpenseList.module.css";
import Transaction from "../Transaction/Transaction";

export default function ExpenseList (props) {
  const {transactions}=props;
    return (
      <div className={styles.expenseListContainer}>
        <h3>Transactions</h3>
        <ul className={styles.transactionList}>
          {/* Display transactions here */}
          {transactions.map((t, index)=>(
            <Transaction expense={t} key={index}/>
          ))}
        </ul>
      </div>
    );
}
