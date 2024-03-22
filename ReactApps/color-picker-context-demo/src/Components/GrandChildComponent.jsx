// through useContext

import { useContext } from "react";
import { colorContext } from "../context";

const GrandChildComponent = () => {
  const colorState = useContext(colorContext); // passed as "value" but can be stored in any named variable
  return <p style={{ color: colorState.color }}><b>Color: {colorState.color}</b></p>;
};

export default GrandChildComponent;

// ---------------------------------------------------------------------------------------------------------

// through Consumer

// import { colorContext } from "../context";

// const GrandChildComponent = () => {
//   return (
//       <colorContext.Consumer>
//         {(colorState) => (
//           <p style={{ color: colorState.color }}>
//             <b>Color: {colorState.color}</b>
//           </p>
//         )}
//       </colorContext.Consumer>
//   );
// };

// export default GrandChildComponent;
