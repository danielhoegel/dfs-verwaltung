import { connect } from 'react-redux';

import StudentenListe from './routes/studenten/studentenListe/StudentenListe';
import StudentDetails from './routes/studenten/studentenDetails/StudentDetails';
import StudentUpdate from './routes/studenten/StudentUpdate';
import StudentCreate from './routes/studenten/StudentCreate';
import StudyCourseList from './routes/studienkurse/StudyCourseList';
import StudyRegulation from './routes/studienkurse/StudyRegulation';
import Playground from './routes/playground/Playground';
import Reports from './reports/Reports';

import EditIcon from '@material-ui/icons/EditOutlined';
import { getStudentById } from './redux/entitiesSelector';


/* Custom Breadcrumbs */

const StudentBreadcrumb = connect((state, props) => ({
    student: getStudentById(state, props.match.params.id)
}))(props => props.student
    ? `${props.student.firstName} ${props.student.lastName}`
    : props.match.params.id
);

const ReportBreadcrumb = ({ match }) => {
    switch (match.params.report) {
        case 'studenten': return 'Studentenliste';
        case 'lesb': return 'LESB-Liste';
        case 'ergebnisse': return 'Prüfungsergebnisse';
        default: return match.params.report;
    }
}


/* ROUTES */
export default [
    { path: '/', breadcrumb: 'DFS-Verwaltung', exact: true },
    { path: '/studenten', component: StudentenListe, exact: true, breadcrumb: 'Studenten' },
    { path: '/studenten/create', component: StudentCreate, exact: true, breadcrumb: 'Neuer Student' },
    { path: '/studenten/:id', component: StudentDetails, exact: true, breadcrumb: StudentBreadcrumb },
    { path: '/studenten/:id/update', component: StudentUpdate, breadcrumb: EditIcon },
    { path: '/berichte/:report', component: Reports, breadcrumb: ReportBreadcrumb },
    { path: '/studienkurse', component: StudyCourseList, exact: true, breadcrumb: 'Studienkurse' },
    { path: '/studienkurse/:studyCourseId', component: null, exact: true, breadcrumb: null },
    { path: '/studienkurse/:studyCourseId/studienordnung', component: null, exact: true, breadcrumb: null },
    { path: '/studienkurse/:studyCourseId/studienordnung/:studyRegulationId', component: StudyRegulation, exact: true, breadcrumb: 'Studienordnung' },
    { path: '/studienkurse/:studyCourseId/studienordnung/:studyRegulationId/:subjectId', component: StudyRegulation, breadcrumb: null },
    { path: '/playground/:id?', component: Playground, breadcrumb: 'Playground' },
];
  