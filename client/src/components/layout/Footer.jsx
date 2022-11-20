import React from "react";
import classes from "./Footer.module.css";

const Footer = () => {
  if (window.location.pathname === "/http://localhost:3000/adminindex")
    return <footer className={classes.footer}>sdad</footer>;
};

export default Footer;
