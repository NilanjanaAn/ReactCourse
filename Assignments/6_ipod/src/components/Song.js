import { Component } from "react";
import styles from './css/song.module.css';

class Song extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
    };
    this.musicInterval = "";
  }

  componentDidMount() {
    const { audio, playing, setAudio, togglePlayPause, startPlay } = this.props;
    this.setState({ currentTime: audio.currentTime });
    this.musicInterval = setInterval(() => {
      this.setState({ currentTime: this.props.audio.currentTime });
    }, 100);
    setAudio(audio);
  }

  componentWillUnmount() {
    clearInterval(this.musicInterval);
  }

  render() {
    const { name, playing, audio, url } = this.props;
    var currentTimeRender =
      Math.floor(this.state.currentTime / 60) +
      ":" +
      Math.floor(this.state.currentTime % 60);
    var durationRender =
      Math.floor(audio.duration / 60) + ":" + Math.floor(audio.duration % 60);
    const percentageComplete = {
      width: (this.state.currentTime / audio.duration) * 100 + "%",
    };
    if (durationRender === "NaN:NaN") {
      durationRender = "0:00";
    }
    if (Math.floor(this.state.currentTime % 60 < 10)) {
      currentTimeRender =
        Math.floor(this.state.currentTime / 60) +
        ":0" +
        Math.floor(this.state.currentTime % 60);
    }
    return (
      <div className={styles.songPlaying} id="music">
        <div className={styles.songDetails}>
          <img src={url} alt="album-cover"></img>
          <div>
            <h1>{name}</h1>
            {playing && <h5 className="play-pause-nav">Playing</h5>}
            {!playing && <h5 className="play-pause-nav">Paused</h5>}
          </div>
        </div>
        <div className={styles.status}>
          {currentTimeRender}
          <div id={styles.progress}>
            <div style={percentageComplete} id="progress-bar"></div>
          </div>
          {durationRender}
        </div>
      </div>
    );
  }
}

export default Song;
