import MovieList from "./MovieList";
import Navbar from "./Navbar";
import React, { Component } from "react";
import { movies } from "./moviesData";

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: movies,
      cartItemCount: 0,
    };
    // this.addStar=this.addStar.bind(this);
    // this.minusStar=this.minusStar.bind(this);
  }

  addStar = (movie) => {
    const { movies } = this.state;
    const id = movies.indexOf(movie);
    if (movies[id].starCount < 5) {
      movies[id].starCount += 0.5;
      this.setState({
        movies, // equivalent to writing movies: movies,
      });
    }
  };
  minusStar = (movie) => {
    const { movies } = this.state;
    const id = movies.indexOf(movie);
    if (movies[id].starCount > 0) {
      movies[id].starCount -= 0.5;
      this.setState({
        movies,
      });
    }
  };
  toggleFav = (movie) => {
    const { movies } = this.state;
    const id = movies.indexOf(movie);
    movies[id].fav = !movies[id].fav;
    this.setState({
      movies,
    });
  };
  toggleCart = (movie) => {
    let { movies, cartItemCount } = this.state;
    const id = movies.indexOf(movie);
    cartItemCount+=movies[id].inCart?-1:1;
    movies[id].inCart = !movies[id].inCart;
    this.setState({
      movies,
      cartItemCount
    });
  };

  render() {
    const { movies, cartItemCount } = this.state;
    return (
      <>
        <Navbar cartItemCount={cartItemCount}/>
        <img
          className="bg"
          src="https://img.freepik.com/free-photo/movie-background-collage_23-2149876014.jpg?w=1060&t=st=1708065724~exp=1708066324~hmac=aedca96d36a02ef8a6a41a3acabc0a7e17ebeca540ba6e210682ad01e58de1b9"
          alt="bg"
        />
        {/* <h1 className="heading">Movie App</h1> */}
        <MovieList
          movies={movies}
          addStar={this.addStar}
          minusStar={this.minusStar}
          toggleCart={this.toggleCart}
          toggleFav={this.toggleFav}
        />
      </>
    );
  }
}

export default App;
