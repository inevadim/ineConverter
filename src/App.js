import { useEffect, useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './App.css';

function App() {
  const [info, setInfo] = useState([]);
  const [input, setInput] = useState(0);
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('byn');
  const [options, setOptions] = useState([]);
  const [output, setOutput] = useState(0);

  useEffect(() => {
    Axios.get(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`,
    ).then(res => {
      setInfo(res.data[from]);
    });
  }, [from]);

  useEffect(() => {
    setOptions(Object.keys(info));
    convert();
  }, [info]);

  function convert() {
    var rate = info[to];
    setOutput(input * rate);
  }

  function flip() {
    var temp = from;
    setFrom(to);
    setTo(temp);
  }

  return (
    <div className="App">
      <div className="heading">
        <h1>Конвертер Валют</h1>
      </div>
      <div className="container">
        <div className="left">
          <h3>Колличество</h3>
          <input type="text" placeholder="Введите число" onChange={e => setInput(e.target.value)} />
        </div>
        <div className="middle">
          <h3>Валюта 1</h3>
          <Dropdown
            options={options}
            onChange={e => {
              setFrom(e.value);
            }}
            value={from}
            placeholder="From"
          />
        </div>

        <div
          className="switchSpan"
          onClick={() => {
            flip();
          }}>
          Поменять
        </div>

        <div className="right">
          <h3>Валюта 2</h3>
          <Dropdown
            options={options}
            onChange={e => {
              setTo(e.value);
            }}
            value={to}
            placeholder="To"
          />
        </div>
      </div>
      <div className="result">
        <button
          onClick={() => {
            convert();
          }}>
          Конвертировать
        </button>
        <h2>Результат:</h2>
        <p>{input + ' ' + from + ' = ' + output.toFixed(2) + ' ' + to}</p>
      </div>
    </div>
  );
}

export default App;
