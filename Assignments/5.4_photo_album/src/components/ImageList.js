import React from "react";
import Image from "./Image";

export default class ImageList extends React.Component {
  // Create Lifecycle method to prevent re render of the list if some spaces are present.
  // Use the shouldComponentUpdate lifecycle method here

  shouldComponentUpdate(nextProps, nextState) {
    console.log("Nextprops: ",nextProps);
    console.log("Nextstate: ",nextState);
    if(nextProps.images.length===this.props.images.length)
      return false;
    return true;
  }

  render() {
    return (
      <div className="image-list">
        {this.props.images.map((image, index) => {
          return <Image key={index} image={image} />;
        })}
      </div>
    );
  }
}
