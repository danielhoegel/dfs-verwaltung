import React, { Component } from 'react';

import StudentenListe from './routes/studenten/StudentenListe';
import LESBListe from './routes/lesb/LESBListe';

class App extends Component {
  render() {
    return (
      <div>
        <StudentenListe />
        <hr />
        <LESBListe />
      </div>
    );
  }
}

export default App;
