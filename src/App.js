import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [amount, setAmount] = useState(null);
  const [rate, setRate] = useState(null);
  const [time, setTime] = useState(null);
  const [result, setResult] = useState(false);
  const handleInputChange = (e) => {
    setResult(false)
    const { id, value } = e.target;
    switch (id) {
      case 'amount':
        setAmount(value);
        break;
      case 'rate':
        setRate(value);
        break;
      case 'time':
        setTime(value);
        break;
    }
  }

  const handleSubmit  = () => {
    setResult(true)
    console.log(amount, rate, time);
    let ammountPlusInterest = parseFloat(amount);
    let totalInterest = 0;
    for (let t = 1; t <= time * 12; t++) {
      const interest = ammountPlusInterest * rate / 100;
      console.log(`${t} ${ammountPlusInterest.toFixed(2)} : ${interest.toFixed(2)}`);
      ammountPlusInterest += interest;
      totalInterest += interest;
    }
    console.log("Amount After 5 years: "+ammountPlusInterest.toFixed(2)+", total interest After 5 years: "+totalInterest.toFixed(2));
  }

  const printCalulation = () => {
    let ammountPlusInterest = parseFloat(amount);
    let totalInterest = 0;
    return [ ...Array(time*12).keys() ].map(f => {
      const interest = ammountPlusInterest * rate / 100;
      console.log(`${f+1} ${ammountPlusInterest.toFixed(2)} : ${interest.toFixed(2)}`);
      ammountPlusInterest += interest;
      return (<tr>
      <td>{f+1}</td>
      <td>{interest.toFixed(2)}</td>
      <td>{ammountPlusInterest.toFixed(2)}</td>
    </tr>);
      
  })
  }
  return (
    <div>
      <header>
        <h1>
          Interest Calculator
        </h1>
      </header>
      <main>
        <div className='container'>
        <div>
          <label htmlFor="amount">Enter Amount: </label>
          <input type="number" id='amount' onChange={(e) => handleInputChange(e)} />
        </div>
        <div>
          <label htmlFor="rate">Monthly Interest Rate: </label>
          <input type="number" id='rate' onChange={(e) => handleInputChange(e)} />
        </div>
        <div>
          <label htmlFor="time">Enter Year: </label>
          <input type="number" id='time' onChange={(e) => handleInputChange(e)} />
        </div>
        <div>
          <button onClick={()=>handleSubmit()} type="submit">Calculate</button>
        </div>
        </div>
        <br/>
        {result && 
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Interest</th>
              <th>Amount + Interest</th>
            </tr>
          </thead>
          <tbody>
          {printCalulation()}
          </tbody>
        </table>
        }
      </main>
    </div>
  );
}

export default App;
