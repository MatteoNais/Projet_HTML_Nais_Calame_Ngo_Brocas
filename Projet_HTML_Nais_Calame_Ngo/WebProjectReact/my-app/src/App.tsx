import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>Baptiste a les mains dans le cambouis</p>
        <MyMessage message='Bien vu Baptou'/>
      </header>
    </div>
  );
}

interface MyMessageProps {
  message: string;
}

function MyMessage(props: MyMessageProps) {
  return <div>My message is: {props.message}</div>;
}

export default App;
