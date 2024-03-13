import "./App.css";
import React, { useState } from "react";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseInfo from "./components/ExpenseInfo/ExpenseInfo";
import ExpenseList from "./components/ExpenseList/ExpenseList";

export default function App() {
  // Create state for the expenses here
  let [total, setTotal] = useState(0);
  let [positive, setPositive] = useState(0);
  let [negative, setNegative] = useState(0);
  const [transactions, setTransactions] = useState([]);

  console.log(transactions);
  return (
    <>
      <h2 className="mainHeading">Expense Tracker</h2>
      <div className="App">
        {/* Render expense form here */}
        <ExpenseForm
          total={total}
          positive={positive}
          negative={negative}
          setNegative={setNegative}
          setPositive={setPositive}
          setTotal={setTotal}
          transactions={transactions}
          setTransactions={setTransactions}
        />
        <div className="expenseContainer">
          {/* Render Expense Info here
            Render Expense List here */}
          <ExpenseInfo total={total} positive={positive} negative={negative} />
          <ExpenseList transactions={transactions} />
        </div>
      </div>
    </>
  );
}
