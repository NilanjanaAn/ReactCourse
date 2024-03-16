import { useEffect } from "react";
import "./styles.css";
import useFetch from "./useFetch";

// import the custom hook to use in this document
export default function App() {
  const url = "https://v2.jokeapi.dev/joke/Programming?type=single";
  // const url = "https://v2.jokeapi.dev/joke/Programming?lang=okay"; // to check for error
  // Use the custom hook here
  const { data, loading, error, getJoke } = useFetch(url);

  // Display loading text here
  if (loading) {
    return <p>Loading...</p>;
  }

  // Display something went wrong here
  if (error) {
    return <p>Something went wrong...</p>;
  }

  // useEffect(() => {
  //   getJoke();
  //   const btn=document.getElementsByClassName("btn");
  //   btn[0].addEventListener('click',getJoke);
  // }, []);

  // useEffect(() => {
  //   const app = document.getElementsByClassName("App");
  //   if (loading || (data && error)) {
  //     for (const child of app[0].children) {
  //       if (child.classList.contains("message")) {
  //         continue;
  //       }
  //       child.hidden=true;
  //     }
  //   }
  //   else
  //   {
  //     for (const child of app[0].children) {
  //       child.hidden=false;
  //     }
  //   }
  // }, [loading, error, data]);


  return (
    <div className="App">
      <h1>Joke Generator</h1>
      {/* Do not modify the below code */}
      <h2>{data.joke}</h2>
      <button className="btn" onClick={getJoke}>New Joke</button>
    </div>
  );
}

// import { useEffect } from "react";
// import "./styles.css";
// import useFetch from "./useFetch";

// // import the custom hook to use in this document
// export default function App() {
//   const url = "https://v2.jokeapi.dev/joke/Programming?type=single";
//   // Use the custom hook here
//   const { data, loading, getJoke } = useFetch(url);

//   useEffect(() => {
//     getJoke();
//   }, []);

//   return (
//     <>
//       {loading ? (
//         <p>Loading...</p>
//       ) : data.error? (
//         <p>Something went wrong…...</p>
//       ):
//       (
//         <div className="App">
//           <h1>Joke Generator</h1>
//           {/* Do not modify the below code */}
//           <h2>{data.joke}</h2>
//           <button className="btn" onClick={getJoke}>
//             New Joke
//           </button>
//         </div>
//       )}
//     </>
//   );
// }
