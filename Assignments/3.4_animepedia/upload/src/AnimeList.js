import { Component } from "react";
import AnimeCard from './AnimeCard'

// Complete the AnimeList Component
class AnimeList extends Component {
  render() {
    console.log(this.props);
    const {anime} = this.props;
    return <div className="anime-list">
      {anime.map((ani, index)=>(<AnimeCard info={ani} key={index}/>))}
    </div>;
  }
}

export default AnimeList;
