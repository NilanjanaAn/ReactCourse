import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { List } from "../components/List";
// import async thunk action here
import {
  fetchError,
  fetchStart,
  fetchSuccess,
  getInitStateAsync,
} from "../redux/reducers/commentsReducer";

export const Home = () => {
  const disptach = useDispatch();

  // remove this function and use it inside comments async thunk
  const getComments = async () => {
    // try {
    //   const response = await fetch(
    //     "https://jsonplaceholder.typicode.com/comments"
    //   );
    //   const data = await response.json();
    //   disptach(fetchSuccess(data));
    // } catch (e) {
    //   disptach(fetchError());
    // }
    disptach(getInitStateAsync());
  };

  useEffect(() => {
    disptach(fetchStart());
    // remove this and dispatch async thunk action here
    getComments();
  }, []);

  return (
    <div className="home">
      <h3>Internet Comments</h3>
      <List />
    </div>
  );
};
