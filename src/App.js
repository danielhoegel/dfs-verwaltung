import React, { Component } from 'react';

import './App.scss';
import StudentenListe from './routes/studenten/StudentenListe';
import LESBListe from './routes/lesb/LESBListe';
import Ergebnisse from './routes/ergebnisse/Ergebnisse';

class App extends Component {
  render() {
    return (
      <div className='container'>
        <StudentenListe />
        <hr />
        <Ergebnisse />
        <hr />
        <LESBListe />
      </div>
    );
  }
}

export default App;
