import { useState, useReducer } from "react";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseInfo from "./components/ExpenseInfo/ExpenseInfo";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import "./App.css";

const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case "ADD_EXPENSE": {
      return {
        expenses: [payload.expense, ...state.expenses],
      };
    }
    case "REMOVE_EXPENSE": {
      return {
        expenses: state.expenses.filter((expense) => expense.id !== payload.id),
      };
    }
    case "SET_EDIT": {
      return {
        expenses: state.expenses,
        edit: payload,
      };
    }
    //add logic for updating the expense here
    case "UPDATE_EXPENSE": {
      const updatedExpenses = state.expenses.map((ex) => {
        if (ex.id === payload.idToUpdate) {
          return {
            ...ex,
            text: payload.text,
            amount: payload.amount,
          };
        }
        return ex;
      });
      return { ...state, expenses: updatedExpenses, edit: false };
    }
    default:
      return state;
  }
};
// Use proper state management for populating the form in the expenseForm component on clicking the edit icon in the Transaction component
function App() {
  const [state, dispatch] = useReducer(reducer, { expenses: [], edit: false });
  const [exp, setExp] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(0);

  const addExpense = (expense) => {
    dispatch({ type: "ADD_EXPENSE", payload: { expense } });
  };

  const deleteExpense = (id) => {
    dispatch({ type: "REMOVE_EXPENSE", payload: { id } });
  };

  const updateExpense = (text, amount) => {
    dispatch({ type: "UPDATE_EXPENSE", payload: { idToUpdate, text, amount } });
  };

  // Add dispatch function for updation

  const changeExpenseToUpdate = (id) => {
    dispatch({ type: "SET_EDIT", payload: true });
    setExp(state.expenses.filter((ex) => ex.id === id)[0]);
    setIdToUpdate(id);
  };

  return (
    <>
      <h2 className="mainHeading">Expense Tracker</h2>
      <div className="App">
        <ExpenseForm
          addExpense={addExpense}
          // Pass the props for populating the form with expense text and amount
          edit={state.edit}
          exp={exp}
          updateExpense={updateExpense}
        />
        <div className="expenseContainer">
          <ExpenseInfo expenses={state.expenses} />
          <ExpenseList
            expenses={state.expenses}
            deleteExpense={deleteExpense}
            // Pass props to update a transacation
            changeExpenseToUpdate={changeExpenseToUpdate}
          />
        </div>
      </div>
    </>
  );
}

export default App;
