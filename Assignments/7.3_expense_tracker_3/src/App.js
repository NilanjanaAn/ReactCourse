import { useReducer, useState } from "react";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseInfo from "./components/ExpenseInfo/ExpenseInfo";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import "./App.css";

function expenseReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      return [action.item, ...state];
    }
    case "DELETE": {
      return state.filter((expense) => expense.id !== action.index);
    }
    default:
      return state;
  }
}

function App() {
  // Remove the useState hook and replace it with useReducer hook
  // Implement the functionality to add and remove the transaction in reducer function
  // const [expenses, setExpenses] = useState([]);

  const [expenses, dispatch] = useReducer(expenseReducer, [] );

  const addExpense = (expense) => {
    dispatch({ type: "ADD", item: expense });
    // setExpenses([...expenses, expense]);
  };

  // Create function to delete an expense
  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", index: id });
    // setExpenses((prevExpenses) => {
    //   return prevExpenses.filter((expense) => expense.id !== id);
    // });
  };

  console.log('expenses', expenses);
  return (
    <>
      <h2 className="mainHeading">Expense Tracker</h2>
      <div className="App">
        <ExpenseForm addExpense={addExpense} />
        <div className="expenseContainer">
          <ExpenseInfo expenses={expenses} />
          <ExpenseList expenses={expenses} deleteExpense={deleteExpense} changeExpenseToUpdate={null}/>
        </div>
      </div>
    </>
  );
}

export default App;
