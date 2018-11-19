import React from 'react';
import Main from './Main.js';
import Analysis from './Analysis.js';

const App = () => {
  return (
    <div className='page-container'>
      <div id="left">
        <Main />
      </div>
      <div id="right">
        <Analysis />
      </div>
    </div>
  )
}

export default App;
