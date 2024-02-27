// All types of styling

import React, { Component } from "react";

import styled from "styled-components";

import navstyle from "./navstyle.module.css";

const CartCount = styled.span`
  background-color: #d90945;
  border-radius: 50%;
  padding: 3px 8px;
  position: absolute;
  right: 15px;
  top: 5px;
  font-size: 12;
  color: #ffffff;
  visibility: ${(props) => (props.$show ? "visible" : "hidden")};
  &:hover {
    border-radius: 0%;
    transition-duration: 0.5s;
  }
`;

function Navbar(props) {
  const { cartItemCount } = props;
  return (
    <>
      <div
        className="nav-head"
        style={{
          width: "100%",
          height: "70px",
          background: "linear-gradient(0.25turn,  #f69d3c, #ebf8e1,#3f87a6)",
          // backgroundColor: "#FFFFFF",
          // backgroundImage: "URL(https://static.vecteezy.com/system/resources/previews/001/987/871/non_2x/abstract-black-stripes-diagonal-background-free-vector.jpg)",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={styles.title} className="left" col="#ffffff">
          Movie App
        </div>
        <div className="right">
          <img
            src="https://cdn-icons-png.flaticon.com/128/891/891462.png"
            alt="cart"
            className={navstyle.cartImg}
          />
          <CartCount $show={cartItemCount ? true : false}>
            {cartItemCount}
          </CartCount>
        </div>
      </div>
    </>
  );
}

const styles = {
  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: 600,
    marginTop: 15,
    marginLeft: 20,
    textTransform: "uppercase",
  },
  anythingElse: {
    // . . .
  },
};

export default Navbar;
