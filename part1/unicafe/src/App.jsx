import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  /**
   * the feedback values are: good 1, neutral 0, bad -1
   */
  const total = good + neutral + bad;

  const calculateAverage = () => {
    return (good * 1 + bad * -1) / total;
  };

  const calculatePercent = () => {
    return (good / total) * 100;
  };

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>

      <p>
        good {good}
        <br />
        neutral {neutral}
        <br />
        bad {bad}
        <br />
        all {total}
        <br />
        average {calculateAverage()}
        <br />
        positive {calculatePercent()} %
        <br />
      </p>
    </div>
  );
};

export default App;
