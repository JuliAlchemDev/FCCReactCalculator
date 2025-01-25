import { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('0');
  const [expression, setExpression] = useState('');

  // Numbers to display
  const numbers = {
    0: 'zero',
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
  };

  // Operators to display
  const operators = {
    '+': 'add',
    '-': 'subtract',
    '*': 'multiply',
    '/': 'divide',
  };

  // Handle number click
  const handleNumberClick = (number) => {
    if (input === '0' && number !== '.') {
      setInput(number); 
      
    } else {
      setInput((prev) => prev + number);
    }
    setExpression((prev) => prev + number);
  };

  const handleOperatorClick = (operator) => {
    if (/=/.test(expression)) {
      setExpression(`${input}${operator}`); 
      setInput(operator); 
    } else {
      if (operator === '-' && (input === '' || /[\+\-\*\/]$/.test(input))) {
        setInput((prev) => prev + operator);
        setExpression((prev) => prev + operator);
        return;
      }
  
      if (/[+\-*\/]/.test(input[input.length - 1])) {
        if (operator !== '-') {
          setInput((prev) => prev.slice(0, -1) + operator);
          setExpression((prev) => prev.slice(0, -1) + operator);
        }
      } else {
        setInput((prev) => prev + operator);
        setExpression((prev) => prev + operator);
      }
    }
  };
  
  // Handle decimal point click
  const handleDecimalClick = () => {
    const lastNumber = input.split(/[\+\-\*\/]/).pop(); 
    if (!lastNumber.includes('.')) {
      setInput((prev) => prev + '.');
      setExpression((prev) => prev + '.');
    }
  };

  // Function to round numbers to a fixed precision
  const roundToPrecision = (number, precision = 4) => {
    return parseFloat(Number(number).toFixed(precision));
  };

  const handleEqualsClick = () => {
    try {
      let cleanedExpression = expression.replace(/,/g, '.');
      cleanedExpression = cleanedExpression.match(/(\*|\+|\/|-)?(\.|\-)?\d+/g).join('');
      let result = eval(cleanedExpression);
      result = roundToPrecision(result, 4);
      setInput(result.toString());
      setExpression(`${cleanedExpression} = ${result}`);
    } catch (error) {
      setInput('Error');
      setExpression('');
    }
  };
  
  // Handle clear button click
  const handleClear = () => {
    setInput('0');
    setExpression('');
  };

  return (
    <>
    <h2>Calculator App</h2>
      <main id='main__calculator'>
        
        <section className='section__screen'>
          <p className='section__p__expression'>{expression}</p>
          <p className='section__p__input' id='display'>{input}</p>
        </section>

        <section className="section__buttons">
          {/* Button Clear */}
          <button id="clear" onClick={handleClear}>C</button>
          
          {/* Render number buttons */}
          {Object.entries(numbers).map(([num, id]) => (
            <button key={num} id={id} onClick={() => handleNumberClick(num)}>{num}</button>
          ))}
          
          {/* Button Decimal */}
          <button id="decimal" onClick={handleDecimalClick}>.</button>
          
          {/* Render operator buttons */}
          {Object.entries(operators).map(([op, id]) => (
            <button key={op} id={id} onClick={() => handleOperatorClick(op)}>{op}</button>
          ))}
          
          <button id="equals" onClick={handleEqualsClick}>=</button>
        </section>
      </main>
    </>
  );
}

export default App;
