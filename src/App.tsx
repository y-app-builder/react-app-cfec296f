import React, { useState } from 'react';

const App: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [currentValue, setCurrentValue] = useState<string>('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);

  const clearAll = (): void => {
    setDisplay('0');
    setCurrentValue('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const inputDigit = (digit: string): void => {
    if (waitingForOperand) {
      setCurrentValue(digit);
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setCurrentValue(currentValue === '0' ? digit : currentValue + digit);
      setDisplay(currentValue === '0' ? digit : currentValue + digit);
    }
  };

  const inputDecimal = (): void => {
    if (waitingForOperand) {
      setCurrentValue('0.');
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (currentValue.indexOf('.') === -1) {
      setCurrentValue(currentValue + '.');
      setDisplay(currentValue + '.');
    }
  };

  const performOperation = (nextOperation: string): void => {
    const inputValue = parseFloat(currentValue);

    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const currentValueNum = parseFloat(currentValue);
      const previousValueNum = parseFloat(previousValue);
      let newValue: number;

      switch (operation) {
        case '+':
          newValue = previousValueNum + currentValueNum;
          break;
        case '-':
          newValue = previousValueNum - currentValueNum;
          break;
        case '*':
          newValue = previousValueNum * currentValueNum;
          break;
        case '/':
          newValue = previousValueNum / currentValueNum;
          break;
        default:
          newValue = currentValueNum;
      }

      setPreviousValue(String(newValue));
      setDisplay(String(newValue));
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const handleEquals = (): void => {
    if (!previousValue || !operation) {
      return;
    }

    performOperation('=');
    setOperation(null);
  };

  const handlePercentage = (): void => {
    const value = parseFloat(currentValue) / 100;
    setCurrentValue(String(value));
    setDisplay(String(value));
  };

  const toggleSign = (): void => {
    const value = parseFloat(currentValue) * -1;
    setCurrentValue(String(value));
    setDisplay(String(value));
  };

  return (
    <div style={styles.calculator}>
      <div style={styles.display}>{display}</div>
      <div style={styles.buttonRow}>
        <button style={styles.functionButton} onClick={clearAll}>AC</button>
        <button style={styles.functionButton} onClick={toggleSign}>+/-</button>
        <button style={styles.functionButton} onClick={handlePercentage}>%</button>
        <button style={styles.operationButton} onClick={() => performOperation('/')}>/</button>
      </div>
      <div style={styles.buttonRow}>
        <button style={styles.digitButton} onClick={() => inputDigit('7')}>7</button>
        <button style={styles.digitButton} onClick={() => inputDigit('8')}>8</button>
        <button style={styles.digitButton} onClick={() => inputDigit('9')}>9</button>
        <button style={styles.operationButton} onClick={() => performOperation('*')}>×</button>
      </div>
      <div style={styles.buttonRow}>
        <button style={styles.digitButton} onClick={() => inputDigit('4')}>4</button>
        <button style={styles.digitButton} onClick={() => inputDigit('5')}>5</button>
        <button style={styles.digitButton} onClick={() => inputDigit('6')}>6</button>
        <button style={styles.operationButton} onClick={() => performOperation('-')}>-</button>
      </div>
      <div style={styles.buttonRow}>
        <button style={styles.digitButton} onClick={() => inputDigit('1')}>1</button>
        <button style={styles.digitButton} onClick={() => inputDigit('2')}>2</button>
        <button style={styles.digitButton} onClick={() => inputDigit('3')}>3</button>
        <button style={styles.operationButton} onClick={() => performOperation('+')}>+</button>
      </div>
      <div style={styles.buttonRow}>
        <button style={styles.zeroButton} onClick={() => inputDigit('0')}>0</button>
        <button style={styles.digitButton} onClick={inputDecimal}>.</button>
        <button style={styles.operationButton} onClick={handleEquals}>=</button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  calculator: {
    width: '320px',
    margin: '0 auto',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  display: {
    backgroundColor: '#fff',
    padding: '20px',
    textAlign: 'right',
    fontSize: '36px',
    marginBottom: '20px',
    borderRadius: '5px',
    boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  buttonRow: {
    display: 'flex',
    marginBottom: '10px',
  },
  digitButton: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    border: 'none',
    borderRadius: '5px',
    margin: '0 5px',
    padding: '15px 0',
    fontSize: '24px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  operationButton: {
    flex: 1,
    backgroundColor: '#ff9500',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    margin: '0 5px',
    padding: '15px 0',
    fontSize: '24px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  functionButton: {
    flex: 1,
    backgroundColor: '#d8d8d8',
    border: 'none',
    borderRadius: '5px',
    margin: '0 5px',
    padding: '15px 0',
    fontSize: '24px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  zeroButton: {
    flex: 2,
    backgroundColor: '#e0e0e0',
    border: 'none',
    borderRadius: '5px',
    margin: '0 5px',
    padding: '15px 0',
    fontSize: '24px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};

export default App;