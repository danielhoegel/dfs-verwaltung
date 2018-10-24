import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import HiddenDivider from './HiddenDivider';

const FieldArray = ({
    values,
    component: Component,
    classes,
    prefix,
    removeHandler,
    addHandler,
    addLabel,
    min,
    ...componentProps
}) => {
    const handleRemove = (index) => {
        if (!min || values.length > min) {
            removeHandler(index);
        }
    };

    return (
        <Fragment>
            {values.map((valueSet, index) => (
                <div className={classes.fieldWrapper} key={index}>
                    <div className={classes.componentWrapper}>
                        <Component
                            values={valueSet}
                            prefix={`${prefix}.${index}`}
                            {...componentProps}
                        />
                    </div>
                    <IconButton
                        onClick={() => handleRemove(index)}
                        className={classes.removeButton}
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
            ))}
            <HiddenDivider />
            <Button variant='raised' onClick={addHandler}>
                <AddIcon className={classes.leftIcon} />
                {addLabel}
            </Button>
        </Fragment>
    );
};

const styles = theme => ({
    fieldWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    componentWrapper: {
        flex: 1,
    },
    removeButton: {
        marginLeft: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
});

FieldArray.defaultProps = {
    addLabel: 'Hinzufügen'
};

FieldArray.propTypes = {
    addHandler: PropTypes.func.isRequired,
    removeHandler: PropTypes.func.isRequired,
    addLabel: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
    prefix: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    values: PropTypes.array.isRequired,
    min: PropTypes.number,
}

export default withStyles(styles)(FieldArray);
