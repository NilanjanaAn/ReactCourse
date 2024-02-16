import { Component } from "react";
import MovieCard from "./MovieCard";

function MovieList(props) {
  const { movies, addStar, minusStar, toggleCart, toggleFav } = props;
  return (
    <>
      {/* <h3 className="heading">Movie List</h3> */}
      {movies.map((movie, index) => (
        <MovieCard
          movieInfo={movie}
          addStar={addStar}
          minusStar={minusStar}
          toggleCart={toggleCart}
          toggleFav={toggleFav}
          key={index}
        />
      ))}
      <MovieCard />
    </>
  );
}

MovieCard.defaultProps = {
  movieInfo: {
    title: "Movie",
    plot: "A nice movie",
    price: "$0",
    rating: 0.0,
    poster:
      "https://media.istockphoto.com/id/1244034031/vector/cinema-poster-with-cola-film-strip-and-clapper-vector.jpg?s=612x612&w=0&k=20&c=JN4E5qJgcq3qm89rSc2BIJT6AZ80MvRJie__r3OENY8=",
    starCount: 0,
    fav: false,
    inCart: false,
  },
  addStar: () => {},
  minusStar: () => {},
  toggleCart: () => {},
  toggleFav: () => {},
};

export default MovieList;
