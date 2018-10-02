import { connect } from 'react-redux';

// import { getStudentForId } from './helper/selectors';
import { getStudentForId } from './routes/studenten/redux/studentenSelectors';

import StudentenListe from './routes/studenten/StudentenListe';
import StudentDetails from './routes/studenten/StudentDetails';
import StudentUpdate from './routes/studenten/StudentUpdate';
import StudentCreate from './routes/studenten/StudentCreate';
import LESBListe from './routes/lesb/LESBListe';
import Ergebnisse from './routes/ergebnisse/Ergebnisse';


/* Custom Breadcrumbs */
const StudentBreadcrumb = connect((state, props) => ({
    student: getStudentForId(state, props.match.params.id)
}))(props => props.student
    ? `${props.student.firstName} ${props.student.lastName}`
    : props.match.params.id
);



/* ROUTES */
export default [
    { path: '/', breadcrumb: 'DFS-Verwaltung', exact: true },
    { path: '/studenten', component: StudentenListe, exact: true, breadcrumb: 'Studenten' },
    { path: '/studenten/create', component: StudentCreate, exact: true, breadcrumb: 'Neuer Student' },
    { path: '/studenten/:id', component: StudentDetails, exact: true, breadcrumb: StudentBreadcrumb },
    { path: '/studenten/:id/update', component: StudentUpdate, breadcrumb: 'Student Bearbeiten' },
    // { path: '/studenten/:studentID/note/:veranstaltungID?', component: StudentUpdate, breadcrumb: 'Bearbeiten' },
    { path: '/lesb-liste', component: LESBListe,  breadcrumb: 'LESB-Liste' },
    { path: '/ergebnisse', component: Ergebnisse, breadcrumb: 'Prüfungsergebnisse' },
];
  