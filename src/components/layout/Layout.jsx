import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import './Layout.scss';
import Breadcrumbs from './Breadcrumbs';
import StudentenFilter from '../filter/StudentenFilter';

const Layout = (props) => {
    return (
        <Fragment>
            <div className='topbar'>
                <div className='left'>
                    <Breadcrumbs />
                </div>
                <div className='right'>
                    <StudentenFilter />
                </div>
            </div>

            <div className='container'>
                <aside className='navmenu'>
                    <nav>
                        <ul>
                            <li>
                                <NavLink to='/studenten'>Studenten</NavLink>
                            </li>
                            <li>
                                <NavLink to='/lesb-liste'>LESB-Liste</NavLink>
                            </li>
                            <li>
                                <NavLink to='/ergebnisse'>Prüfungsergebnisse</NavLink>
                            </li>
                        </ul>
                    </nav>
                </aside>

                <main>
                    <div className='main__inside'>
                        {props.children}
                    </div>
                </main>
            </div>
            
        </Fragment>
    );
};

export default Layout;
