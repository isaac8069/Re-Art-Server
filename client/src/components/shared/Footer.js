import React from "react";
import { Link } from "react-router-dom";

const style = {
    color: 'black',
    padding: '30px',
    margin: '10px',
    textAlign: 'center',
    fontSize: '25px',
    textDecoration: 'none',
}
const Footer = () => {
  return (
    <div style={style}>
      <Link to='about' style={style}>About</Link>
      <Link to='about' style={style}>Contact Us</Link>
      <Link to='faqs' style={style}>FAQs</Link>
    </div>
  )
}

export default Footer