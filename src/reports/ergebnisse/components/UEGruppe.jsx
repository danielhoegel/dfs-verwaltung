import React, { Component } from 'react';
import PropTypes from 'prop-types'

import Faecher from './Faecher';

class UEGruppe extends Component {
    static propTypes = {
        ue: PropTypes.number.isRequired,
        student: PropTypes.object.isRequired,
        semester: PropTypes.number.isRequired,
    }

    render() {
        return (
            <table className='ue-table striped--body'>
                <thead>
                    <tr>
                        <th style={{width: '30%'}}>UE {this.props.ue}</th>
                        <th style={{width: '55%'}}>Veranstaltung</th>
                        <th style={{width: '7.5%'}}>Credits</th>
                        <th style={{width: '7.5%'}}>Note</th>
                    </tr>
                </thead>
                <Faecher {...this.props} />
            </table>
        );
    }
}

export default UEGruppe;