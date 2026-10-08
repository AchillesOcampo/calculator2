import { useState } from 'react'
import './App.css'

function CalcDisplay({ DisplayValue }) {
  return (
    <div className='Display'>
      {DisplayValue}
    </div>
  );
}

function CalcButton({ buttonLabel, onClick, className = '' }) {
  return (
    <button 
      className={`Button ${className}`.trim()} 
      onClick={onClick}
    >
      {buttonLabel}
    </button>
  );
}

function App() {
  const [DisplayValue, setDisplayValue] = useState('0');

  const [operand1, setOperand1] = useState(null);
  const [operand2, setOperand2] = useState(null);
  const [operator, setOperator] = useState(null);
  const [shouldReset, setShouldReset] = useState(false);

  const buttonClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    // 1. Clear button
    if (value === 'C') {
      setDisplayValue('0');
      setOperand1(null);
      setOperand2(null);
      setOperator(null);
      setShouldReset(false);
      return;
    }

    // 2. Ocampo button
    if (value === 'Ocampo') {
      setDisplayValue('Achilles Isaiah Ocampo');
      setShouldReset(true);
      return;
    }

    // 3. Operator keys (+, -, x, ÷) -> Show operator on screen
    if (['+', '-', 'x', '÷'].includes(value)) {
      setOperator(value);
      setDisplayValue(value); // Display the pressed operator
      setShouldReset(false);
      return;
    }

    // 4. Equals key (=) -> Calculate and set shouldReset flag
    if (value === '=') {
      if (operand1 !== null && operand2 !== null && operator !== null) {
        let result = 0;

        if (operator === '+') {
          result = parseFloat(operand1) + parseFloat(operand2);
        } else if (operator === '-') {
          result = parseFloat(operand1) - parseFloat(operand2);
        } else if (operator === 'x') {
          result = parseFloat(operand1) * parseFloat(operand2);
        } else if (operator === '÷') {
          result = parseFloat(operand2) !== 0 ? parseFloat(operand1) / parseFloat(operand2) : 'Error';
        }

        const formattedResult = String(result);
        setDisplayValue(formattedResult);
        setOperand1(formattedResult);
        setOperand2(null);
        setOperator(null);
        setShouldReset(true); // Ensures next number replaces this result
      }
      return;
    }

    // 5. Number Entry Logic
    if (operator === null) {
      // First number (operand1)
      if (operand1 === null || shouldReset) {
        setOperand1(value);
        setDisplayValue(value);
        setShouldReset(false); // Reset complete, continue typing normally
      } else {
        const stackedValue = operand1 + value;
        setOperand1(stackedValue);
        setDisplayValue(stackedValue);
      }
    } else {
      // Second number (operand2)
      if (operand2 === null) {
        setOperand2(value);
        setDisplayValue(value);
      } else {
        const stackedValue = operand2 + value;
        setOperand2(stackedValue);
        setDisplayValue(stackedValue);
      }
    }
  };

  return (
    <div className='App'>
      <div className='Header'>Calculator of Achilles Isaiah Ocampo - IT3A</div>
      <div className='Calculator'>
        <CalcDisplay DisplayValue={DisplayValue} />
        <div className='Keypad'>
          {/* Row 1 */}
          <CalcButton buttonLabel={7} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={8} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={9} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={'÷'} className='OperatorButton' onClick={buttonClickHandler}/>
          
          {/* Row 2 */}
          <CalcButton buttonLabel={4} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={5} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={6} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={'x'} className='OperatorButton' onClick={buttonClickHandler}/>
          
          {/* Row 3 */}
          <CalcButton buttonLabel={1} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={2} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={3} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={'-'} className='OperatorButton' onClick={buttonClickHandler}/>
          
          {/* Row 4 */}
          <CalcButton buttonLabel={"C"} className='ClearButton' onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={0} onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={'='} className='EqualsButton' onClick={buttonClickHandler}/>
          <CalcButton buttonLabel={'+'} className='OperatorButton' onClick={buttonClickHandler}/>

          {/* Row 5 - Full Width Ocampo Button */}
          <CalcButton buttonLabel={"Ocampo"} className='OcampoButton' onClick={buttonClickHandler}/>
        </div>
      </div>
    </div>
  );
}

export default App;
