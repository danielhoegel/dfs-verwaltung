import React from 'react';
import { NavLink } from 'react-router-dom';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';

import routes from '../../routes.js';

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
