import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import HiddenDivider from './HiddenDivider';

class FieldArray extends PureComponent {
    // shouldComponentUpdate(nextProps) {
    //     return (
    //         (nextProps.values !== this.props.values) ||
    //         (nextProps.values.length !== this.props.values.length)
    //     );
    // }

    handleRemove = (index) => {
        const { min, values, removeHandler } = this.props;
        if (!min || values.length > min) {
            removeHandler(index);
        }
    };

    handleAdd = () => {
        const { max, values, addHandler } = this.props;
        if (!max || values.length < max) {
            addHandler(values.length);
        }
    }

    render() {
        const {
            values,
            component: Component,
            classes,
            prefix,
            addLabel,
            removeLabel,
            ...componentProps
        } = this.props;
        return (
            <Fragment>
                {values.map((valueSet, index) => (
                    <div className={classes.fieldWrapper} key={index}>
                        <Component
                            values={valueSet}
                            prefix={`${prefix}[${index}]`}
                            {...componentProps}
                        />
                        <Button
                            variant='outlined'
                            size='small'
                            onClick={() => this.handleRemove(index)}
                            className={classes.removeButton}
                        >
                            <CloseIcon className={classes.leftIcon} />
                            {removeLabel}
                        </Button>
                    </div>
                ))}
                <HiddenDivider />
                <Button variant='outlined' onClick={this.handleAdd} size='small'>
                    <AddIcon className={classes.leftIcon} />
                    {addLabel}
                </Button>
            </Fragment>
        );
    }
}

const styles = theme => ({
    fieldWrapper: {
        display: 'flex',
        flexDirection: 'column'
    },
    removeButton: {
        marginLeft: 'auto',
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
});

FieldArray.defaultProps = {
    addLabel: 'Hinzufügen',
    removeLabel: 'Entfernen',
    values: []
};

FieldArray.propTypes = {
    addHandler: PropTypes.func.isRequired,
    removeHandler: PropTypes.func.isRequired,
    addLabel: PropTypes.string,
    removeLabel: PropTypes.string,
    component: PropTypes.func.isRequired,
    prefix: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    values: PropTypes.array.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
};

export default withStyles(styles)(FieldArray);
