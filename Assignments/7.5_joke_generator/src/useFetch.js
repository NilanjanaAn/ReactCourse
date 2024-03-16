// import { useEffect, useState } from "react";

// // Complete the following hook
// const useFetch = (url) => {
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState("");
//   const [error, setError] = useState(false);
//   const getJoke = async () => {
//     setLoading(true);
//     fetch(url)
//       .then((response) => response.json())
//       .then((res) => setData(res))
//       .then((res) => setError(res?res.error:false))
//       .then(() => setLoading(false));
//   };
//   //It should return data returned from fetch, loading, error and getJoke
//   return { data, loading, error, getJoke };
// };
// // export the useFetch hook as a default export
// export default useFetch;


import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getJoke = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data)
      setData(data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getJoke();
  }, []);

  return { data, loading, error, getJoke };
};

export default useFetch;