import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

const HiddenDivider = ({ height }) => {
    const styles = theme => ({
        divider: {
            backgroundColor: 'transparent',
            height: 2 * height * theme.spacing.unit,
        }
    });

    const StyledComponent = withStyles(styles)(({ classes }) =>
        <Divider className={classes.divider} />
    );

    return <StyledComponent />
};

HiddenDivider.propTypes = {
    height: PropTypes.number,
};

HiddenDivider.defaultProps = {
    height: 1
};

export default HiddenDivider;
