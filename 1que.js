import React, { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";

const WINDOW_SIZE = 10;
const BASE_URL = "http://your-api-server-address/numbers/";

function AverageCalculator() {
  const [numberId, setNumberId] = useState("");
  const [windowPrevState, setWindowPrevState] = useState([]);
  const [windowCurrState, setWindowCurrState] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [average, setAverage] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!numberId) return;

    setError(null);
    setWindowPrevState(windowCurrState);

    try {
      const response = await axios.get(BASE_URL + numberId);
      setNumbers(response.data.numbers);
      setWindowCurrState(response.data.windowCurrState);
      setAverage(response.data.avg);
    } catch (error) {
      setError("Error fetching data");
    }
  };

  const handleNumberIdChange = (event) => {
    setNumberId(event.target.value);
  };

  const debouncedFetchData = _.debounce(fetchData, 300);

  useEffect(() => {
    debouncedFetchData();
  }, [numberId]);

  return (
    <div>
      <input
        key="input"
        type="text"
        placeholder="Enter number ID (p, f, e, r)"
        value={numberId}
        onChange={handleNumberIdChange}
      />
      <button key="button" onClick={debouncedFetchData}>
        Fetch Data
      </button>{" "}
      {}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {windowPrevState.length > 0 && (
        <div>
          <h3>Window State</h3>
          <p>Previous: {windowPrevState.join(", ")}</p>
          <p>Current: {windowCurrState.join(", ")}</p>
          <p>Received Numbers: {numbers.join(", ")}</p>
          <p>Average: {average?.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

export default AverageCalculator;
