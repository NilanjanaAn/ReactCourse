import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Error() {
  const navigate = useNavigate();

  useEffect(() => {
    // setTimeout(() => navigate("/"), 3000); // go to a specific route
    setTimeout(() => navigate(-1), 3000); // go one page before
  }, []);
  return (
    <>
      <main>
        <h1>Oops!</h1>
      </main>
    </>
  );
}

export default Error;
