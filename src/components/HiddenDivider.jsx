import React from 'react';

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

export default HiddenDivider;
