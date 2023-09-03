import React from 'react';
import './App.css';
import Header from './top/Header';
import Main from './body/Main';
//import Footer from './bottom/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
      <div style={{height: "50px", width: "100%"}}></div>
    </div>
    );
}

export default App;
