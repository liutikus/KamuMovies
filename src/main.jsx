import ReactDOM from "react-dom/client";
import React from "react";
import './index.css'
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import App from './App.jsx'


const root = document.getElementById("root");

ReactDOM.createRoot(root).render(



  <Router >
   <App/>
  </Router>


);