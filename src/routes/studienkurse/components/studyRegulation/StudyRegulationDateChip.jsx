import React from 'react';
import PropTypes from 'prop-types';

import Chip from '@material-ui/core/Chip';
import EventAvailableIcon from '@material-ui/icons/EventAvailableOutlined';

import { formatDate } from '../../../../helper/helper';

const StudyRegulationDateChip = ({date, ...chipProps}) => {
    return (
        <Chip
            label={formatDate(date)}
            icon={<EventAvailableIcon />}
            variant='outlined'
            {...chipProps}
        />
    );
};

StudyRegulationDateChip.propTypes = {
    date: PropTypes.string,
    className: PropTypes.string,
}

export default StudyRegulationDateChip;
