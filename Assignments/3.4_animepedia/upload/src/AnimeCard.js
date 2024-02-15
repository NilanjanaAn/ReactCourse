import { Component } from "react";

// Complete the AnimeCard Component
class AnimeCard extends Component {
  render() {
    const {info}=this.props;
    return <div className="anime-card">
      <img src={info.image} alt={info.name} />
        <p>{info.name}</p>
    </div>;
  }
}

export default AnimeCard;
