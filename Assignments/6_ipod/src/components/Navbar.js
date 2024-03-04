import { Component } from "react";
import styles from "./css/navbar.module.css";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      time: this.getTime(),
    };
    this.timer = null;
  }

  getTime = () => {
    let date = new Date();
    let time = date.getHours();
    if (date.getMinutes() < 10) time += ":0" + date.getMinutes();
    else time += ":" + date.getMinutes();
    return time;
  };

  render() {
    const { time } = this.state;
    return (
      <>
        <div className={styles.nav}>
          <div className={styles.wifi}>
            <i className="fa fa-wifi" aria-hidden="true"></i>
          </div>
          <div className={styles.time}>{this.state.time}</div>
          <div className={styles.battery}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/664/664883.png"
              alt="battery"
              className={styles.batteryicon}
            />
          </div>
        </div>
      </>
    );
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ time: this.getTime() });
    }, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
}

export default Navbar;
