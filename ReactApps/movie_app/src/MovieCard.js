import React from "react";
// or <import {Component} from "react">
// and use <extends Component> directly

function MovieCard (props) {
    // const {movieInfo: data}=props; // renaming
    // const { title, plot, price, rating, poster, starCount, fav, inCart } = data;
    const { addStar, minusStar, toggleCart, toggleFav, movieInfo } = props;
    const { title, plot, price, rating, poster, starCount, fav, inCart } = movieInfo;
    return (
      <div className="main">
        <div className="movie-card">
          <div className="left">
            <img alt="poster" src={poster} />
          </div>
          <div className="right">
            <div className="title">{title}</div>
            <div className="plot">{plot}</div>
            <div className="price">{price}</div>
            <div className="footer">
              <div className="rating">{rating}</div>
              <div className="star-dis">
                <img
                  className="star-btn"
                  alt="minus"
                  src="https://cdn-icons-png.flaticon.com/128/10308/10308996.png"
                  onClick={() => {
                    minusStar(movieInfo);
                  }}
                ></img>
                <img
                  className="stars"
                  alt="star"
                  src="https://cdn-icons-png.flaticon.com/128/7656/7656139.png"
                />
                <img
                  className="star-btn"
                  alt="plus"
                  src="https://cdn-icons-png.flaticon.com/128/4315/4315609.png"
                  onClick={() => {
                    addStar(movieInfo);
                  }}
                ></img>
                <span>&nbsp;{starCount}</span>
              </div>
              {fav ? (
                <>
                  <button
                    className="unfavourite-btn"
                    onClick={() => {
                      toggleFav(movieInfo);
                    }}
                  >
                    Un-Favourite&nbsp;&nbsp;
                    <img
                      className="btn-img"
                      alt="un-favourite"
                      src="https://cdn-icons-png.flaticon.com/128/11662/11662773.png"
                    />
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="favourite-btn"
                    onClick={() => {
                      toggleFav(movieInfo);
                    }}
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp;Favourite&nbsp;&nbsp;&nbsp;&nbsp;
                    <img
                      className="btn-img"
                      alt="favourite"
                      src="https://cdn-icons-png.flaticon.com/128/4340/4340223.png"
                    />
                  </button>
                </>
              )}

              {inCart ? (
                <>
                  <button
                    className="remove-cart-btn"
                    onClick={() => {
                      toggleCart(movieInfo);
                    }}
                  >
                    Remove from Cart&nbsp;
                    <img
                      className="btn-img"
                      alt="remove-cart"
                      src="https://cdn-icons-png.flaticon.com/128/4379/4379649.png"
                    ></img>
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="add-cart-btn"
                    onClick={() => {
                      toggleCart(movieInfo);
                    }}
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Add to
                    Cart&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <img
                      className="btn-img"
                      alt="add-cart"
                      src="https://cdn-icons-png.flaticon.com/128/4379/4379632.png"
                    ></img>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
}

export default MovieCard;
