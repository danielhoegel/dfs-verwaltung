import { getStudentForId } from './helper/selectors';

import StudentenListe from './routes/studenten/StudentenListe';
import StudentDetails from './routes/studenten/StudentDetails';
import StudentUpdate from './routes/studenten/StudentUpdate';
import LESBListe from './routes/lesb/LESBListe';
import Ergebnisse from './routes/ergebnisse/Ergebnisse';


/* Custom Breadcrumbs */
const StudentBreadcrumb = ({ match }) => {
    return getStudentForId(match.params.id).name;
}

/* ROUTES */
export default [
    { path: '/', breadcrumb: 'DFS-Verwaltung', exact: true },
    { path: '/studenten', component: StudentenListe, exact: true, breadcrumb: 'Studenten' },
    { path: '/studenten/:id', component: StudentDetails, exact: true, breadcrumb: StudentBreadcrumb },
    { path: '/studenten/:id/update', component: StudentUpdate, breadcrumb: 'Bearbeiten' },
    // { path: '/studenten/:studentID/note/:veranstaltungID?', component: StudentUpdate, breadcrumb: 'Bearbeiten' },
    { path: '/lesb-liste', component: LESBListe,  breadcrumb: 'LESB-Liste' },
    { path: '/ergebnisse', component: Ergebnisse, breadcrumb: 'Prüfungsergebnisse' },
];
  