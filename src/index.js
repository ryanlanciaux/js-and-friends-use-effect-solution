import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import ItemCardGroup from "./components/ItemCardGroup";

import "./styles.css";
import { getCoffeeData } from "./api/getData";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();

  // Bonus
  const [retries, setRetries] = useState(0);

  useEffect(() => {
    setData([]);
    setLoading(true);
    setError(undefined);

    getCoffeeData()
      .then(items => {
        setLoading(false);
        setData(items);
      })
      .catch(error => setError(error));
  }, [retries]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span>Retries: {retries}</span>
      <button onClick={() => setRetries(retries => retries + 1)}>Retry</button>
      {error ? (
        <span>Oh no. An error occurred. {error}</span>
      ) : isLoading ? (
        <span>Loading</span>
      ) : (
        <ItemCardGroup data={data} onAddToCart={console.log} />
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
