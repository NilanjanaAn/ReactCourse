import { useDispatch, useSelector } from "react-redux";
import {
  decrementCounter,
  incrementCounter,
  resetCounter,
  counterSelector,
} from "../redux/reducers/counterReducer";

export const CounterActions = () => {
  const dispatch = useDispatch();
  // refactor to use the selector function
  // const { count } = useSelector((state) => state.counterReducer);
  const { count } = useSelector(counterSelector);

  return (
    <div className="actions">
      <button
        disabled={count <= 0}
        onClick={() => dispatch(decrementCounter())}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/992/992683.png"
          alt="dec"
        />
      </button>
      <button
        disabled={count >= 10}
        onClick={() => dispatch(incrementCounter())}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/992/992651.png"
          alt="inc"
        />
      </button>
      <button onClick={() => dispatch(resetCounter())}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/9923/9923627.png"
          alt="reset"
        />
      </button>
    </div>
  );
};
