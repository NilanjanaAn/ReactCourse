import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementTimer } from "../redux/actions/timerActions";

export const Timer = () => {
  const { isRunning, elapsedTime } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        dispatch(incrementTimer());
        // disptach incrementTimer action here
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  return <b>{elapsedTime}</b>;
};
