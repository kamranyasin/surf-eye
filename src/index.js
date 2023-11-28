import React from "react";
import { hydrate, render } from "react-dom";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import Root from "./Root";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Root />
  </Router>
);

// "postbuild": "react-snap"

// const App = (
//   <Router>
//     <Root />
//   </Router>
// );

// if (rootElement.hasChildNodes()) {
//   hydrate(App, rootElement);
// } else {
//   render(App, rootElement);
// }
reportWebVitals();
