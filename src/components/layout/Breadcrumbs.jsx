import React from 'react';
import { NavLink } from 'react-router-dom';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';

import studentenData from '../../data/studenten';

// breadcrumbs can be any type of component or string
const StudentBreadcrumb = ({ match }) => {
    const student = studentenData.filter(s => s.id === parseInt(match.params.id, 10))[0];
    return student.name;
}

// define some custom breadcrumbs for certain routes (optional)
const routes = [
  { path: '/', breadcrumb: 'DFS-Verwaltung' },
  { path: '/studenten', breadcrumb: 'Studenten' },
  { path: '/studenten/:id', breadcrumb: StudentBreadcrumb },
  { path: '/lesb-liste', breadcrumb: 'LESB-Liste' },
  { path: '/ergebnisse', breadcrumb: 'Prüfungsergebnisse' }
];

// map & render your breadcrumb components however you want.
// each `breadcrumb` has the props `key`, `location`, and `match` included!
const Breadcrumbs = ({ breadcrumbs }) => (
  <span className='breadcrumbs'>
    {breadcrumbs.map((breadcrumb, index) => (
        <span key={breadcrumb.key}>
            {(index === 0 || index === breadcrumbs.length -1 ) ? (
                <span>{breadcrumb}</span>
            ) : (
                <NavLink to={breadcrumb.props.match.url}>
                    {breadcrumb}
                </NavLink>
            )}
            {(index < breadcrumbs.length - 1) && <i> \ </i>}
        </span>
    ))}
  </span>
);

export default withBreadcrumbs(routes)(Breadcrumbs);
