import { useState } from "react";

const Button = (props) => (
  <button onClick={props.clicksHandler}>{props.text}</button>
);
const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td> {props.value}</td>
  </tr>
);

const Statistics = (props) => {
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.total} />
        <StatisticLine text="average" value={props.average} />
        <StatisticLine text="positive" value={props.positive} />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [selected, setSelected] = useState(0);
  const [votes, setVote] = useState(Array(8).fill(0));

  const setGoodFeed = () => setGood(good + 1);

  const setNeutralFeed = () => setNeutral(neutral + 1);

  const setBadFeed = () => setBad(bad + 1);

  const getTotal = () => good + neutral + bad;

  const getAverage = () => (good * 1 + neutral * 0 + bad * -1) / getTotal();

  const getPositivePercent = () => (good / getTotal()) * 100;

  const getRandomInt = (max, min) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const anecdote = () => {
    setSelected(getRandomInt(0, anecdotes.length));
  };
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const voteForAnecdotes = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVote(newVotes);
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]}</div>
      <div> has {votes[selected]} votes</div>
      <Button clicksHandler={voteForAnecdotes} text="vote" />
      <Button clicksHandler={anecdote} text="next anecdote" />

      <h2>Anecdote with most votes</h2>
      <div>{anecdotes[votes.indexOf(Math.max(...votes))]}</div>
      <div> has {Math.max(...votes)} votes</div>
      <h2>give feedback</h2>
      <Button clicksHandler={setGoodFeed} text="Good" />
      <Button clicksHandler={setNeutralFeed} text="Neutral" />
      <Button clicksHandler={setBadFeed} text="Bad" />
      <h2>statistics</h2>
      {getTotal() > 0 ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={getTotal()}
          average={getAverage().toFixed(2)}
          positive={getPositivePercent().toFixed(2) + " %"}
        />
      ) : (
        <div> No feedback given</div>
      )}
    </div>
  );
};

export default App;
