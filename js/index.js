// // JS code
// const heading = document.createElement("h2");
// heading.textContent = "Hello World";
// heading.className = "header";
// document.getElementById("root").append(heading);
// console.log(heading);

// // React with JS
// const reactHeading = React.createElement(
//   "h2",
//   {
//     className: "header",
//     id: "header",
//   },
//   "Hello React"
// ); // Type of element, attributes, content
// console.log(reactHeading);
// ReactDOM.createRoot(document.getElementById("root")).render(reactHeading);

// // React with JSX
// // Single parent must be there
// const jsxHeading = (
//   <div>
//     <h1>Hello JSX</h1>
//     <p>This is created using JSX</p>
//   </div>
// );

// // React fragment
// const jsxHeading = (
//   <React.Fragment>
//     <h1>Hello JSX</h1>
//     <p>This is created using JSX</p>
//   </React.Fragment>
// );

// Empty fragment
const jsxHeading = (
  <>
    <h1>Hello JSX</h1>
    <p>This is created using JSX</p>
  </>
);
ReactDOM.createRoot(document.getElementById("root")).render(jsxHeading);
