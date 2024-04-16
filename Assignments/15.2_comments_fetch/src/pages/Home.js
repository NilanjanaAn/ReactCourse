import { useEffect } from "react";
import { List } from "../components/List";
// import comments actions here
import { useDispatch } from "react-redux";
import { commentsActions } from "../redux/reducers/commentsReducer";

export const Home = () => {
  const dispatch = useDispatch();

  const getComments = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/coments"
      );
      const data = await response.json();

      // dispatch fetch success action here
      dispatch(commentsActions.setInit(data));
    } catch (e) {
      // dispatch fetch error action here
      dispatch(commentsActions.showError());
    }
  };

  useEffect(() => {
    // dispatch fetch start action here
    dispatch(commentsActions.load());
    // execute the getComments function here
    getComments();
  }, []);

  return (
    <div className="home">
      <h3>Internet Comments</h3>
      <List />
    </div>
  );
};
