import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from '../dropdown/Dropdown';

const AddDropdown = ({ createStudent }) => {
    return (
        <Dropdown
            label={ <i className='fa fa-plus-square' /> }
            iconSize={'0.5rem'}
            title='Hinzufügen'
            basic
            color='grey'
            labelStyle={{padding: '0.25rem 0.5rem', margin: '0.5rem'}}
            menuAlign='right'
        >
            <Dropdown.Item
                onClick={createStudent}
                content='Student hinzufügen'
            />
            <Dropdown.Item
                onClick={() => alert('Note hinzufügen')}
                content='Note hinzufügen'
            />
        </Dropdown>
    );
};

AddDropdown.propTypes = {
    createStudent: PropTypes.func.isRequired,
};

export default AddDropdown;
