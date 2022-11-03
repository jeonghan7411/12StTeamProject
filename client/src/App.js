import { Reset } from "styled-reset";
import classes from "./App.module.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Regist from "./components/pages/Regist";

function App() {
  return (
    <div className={classes.App}>
      <Reset />
      <Router>
        <Header />
        <Nav />
        <main className={classes.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/regist" element={<Regist />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
