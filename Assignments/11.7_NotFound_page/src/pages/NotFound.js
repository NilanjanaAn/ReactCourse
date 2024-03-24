// import hook here
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  // create back funtion here
  const back = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="not-found page">
      <h3>Page not found.</h3>
      <img
        src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
        alt="not found"
      />

      <button
        onClick={(e) => {
          back(e);
        }}
      >
        Back to Home
      </button>
    </div>
  );
};
