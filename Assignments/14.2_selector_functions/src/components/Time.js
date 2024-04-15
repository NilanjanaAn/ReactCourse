import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementTimer, timerSelector } from "../redux/reducers/timerReducer";

export const Time = () => {
  const dispatch = useDispatch();
  // refactor to use the selector function
  // const { isRunning, elapsedTime } = useSelector((state) => state.timerReducer);
  const { isRunning, elapsedTime } = useSelector(timerSelector);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        dispatch(incrementTimer());
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isRunning, dispatch]);

  return <b>{elapsedTime}</b>;
};
