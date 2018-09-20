import React, { Component } from 'react';

import studentenData from '../../data/studenten';
import veranstaltungenData from '../../data/veranstaltungen';
import faecherData from '../../data/faecher';
import notenData from '../../data/noten';

class StudentenListe extends Component {
  state = {
    studenten: studentenData,
    veranstaltungen: veranstaltungenData,
    faecher: faecherData,
    noten: notenData,
  }

  render() {
    return (
      <div>
        <h1>LESB-Liste</h1>
        <div className='studenten'>
          {this.state.studenten.map(student => (
            <div className='student' key={student.id}>
              <div className='student__header'>
                <h3>{student.name}</h3>
              </div>
              <div className='student__faecher'>
                {this.state.faecher.map(fach => {
                  const veranstaltungen = this.state.veranstaltungen.filter(veranstaltung =>
                    veranstaltung.fachID === fach.id && veranstaltung.typ === 'Vorlesung');
                  return veranstaltungen.map(veranstaltung => {
                    const note = this.state.noten.filter(n =>
                      n.studentID === student.id && n.veranstaltungID == veranstaltungen.id);
                    return (
                      <div className='student__fach' key={`${fach.id}_${veranstaltung.id}`}>
                        {fach.name}, {veranstaltung.name} ({veranstaltung.typ}): {note.punkte}
                      </div>
                    );
                  })
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default StudentenListe;
