import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import cn from 'classnames';

class FieldGroup extends PureComponent {
    render() {
        const { width, children, style, className, classes, ...fieldGroupProps } = this.props;
        return (
            <div
                style={{ width, ...style }}
                className={cn(classes.fieldGroup, className)}
                {...fieldGroupProps}
            >
                {children}
            </div>
        );
    }
}

const styles = theme => ({
    fieldGroup: {
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column'
        }
    },
});

export default withStyles(styles)(FieldGroup);
