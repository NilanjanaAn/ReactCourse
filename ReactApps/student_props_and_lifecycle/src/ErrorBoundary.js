import { Component } from "react";
import './index.css'

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state={
        hasError:false
    }
  }

  static getDerivedStateFromError(error)
  {
    return {
        hasError:true
    };
  }

  componentDidCatch(error, info) {
    console.log("Error: "+error);
    console.log("Info: "+info);
  }

  render(){
    if(this.state.hasError)
    {
        return(<><h1>Something went wrong. Contact Admin.</h1></>);
    }
    else
    {
        return(
            this.props.children
        )
    }
  }
}

export default ErrorBoundary;