import { TimerActions } from "../components/TimerActions";
import { Time } from "../components/Time";
import { alertSelector, alertActions } from "../redux/reducers/alertReducer";
import { useSelector, useDispatch } from "react-redux";

export const Timer = () => {
  // get alert message here
  // create effect to reset alert message here
  const message = useSelector(alertSelector);
  const dispatch = useDispatch();

  if (message) {
    setTimeout(() => {
      dispatch(alertActions.reset());
    }, 2000);
  }

  return (
    <div className="page">
      {/* conditionally show the below div with alert message */}
      {message ? (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          {message}
        </div>
      ) : null}
      <div className="alert"></div>
      <h1>Simple Timer</h1>
      <Time />
      <TimerActions />
    </div>
  );
};
