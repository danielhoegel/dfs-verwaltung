import React, { Component } from 'react';
import cn from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button';

import { isNotEmpty } from '../helper/helper';


class SelectButton extends Component {
    state = {
        value: isNotEmpty(this.props.options) ? this.props.options[0].value : null
    }

    changeValue = e => {
        this.setState({ value: e.target.value });
    }

    clickHandler = () => {
        this.props.onClick(this.state.value);
    }

    buttonTitle() {
        const { options } = this.props;
        const { value } = this.state;
        const option = options.find(option => option.value === value);
        return option ? `${option.label} Hinzufügen` : 'Bitte wählen Sie eine Option aus!';
    }

    render() {
        const { classes } = this.props;
        return (
            <TextField
                select
                variant='standard'
                className={cn(classes.textField, this.props.className)}
                value={this.state.value}
                onChange={this.changeValue}
                SelectProps={{
                    classes: {
                        root: classes.select,
                        selectMenu: classes.selectMenu,
                        icon: classes.selectIcon
                    }
                }}
                InputProps={{
                    disableUnderline: true,
                    startAdornment: (
                        <InputAdornment
                        variant='standard'
                        position='start'
                        className={classes.adornment}
                        >
                            <Button
                                onClick={this.clickHandler}
                                color='inherit'
                                size='small'
                                className={classes.button}
                                title={this.buttonTitle()}
                            >
                            {this.props.icon}
                            </Button>
                        </InputAdornment>
                    ),
                }}
            >
                {this.props.options.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        );
    }
}

const styles = theme => ({
    textField: {
        borderRadius: theme.shape.borderRadius,
        overflow: 'hidden',
        backgroundColor: fade(theme.palette.common.white, 0.15),
    },
    button: {
        minWidth: 0,
        paddingLeft: theme.spacing.unit * 1.5,
        borderRadius: 0,
        fontSize: '1em',
        color: 'white',
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
    },
    select: {
        color: 'white',
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
    },
    selectMenu: {
        paddingTop: theme.spacing.unit,
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit * 5,
        paddingBottom: theme.spacing.unit,
        lineHeight: 1,
        minHeight: 0,
    },
    selectIcon: {
        color: 'inherit',
        right: theme.spacing.unit,
    },
    adornment: {
        margin: 0,
    }
});

export default withStyles(styles)(SelectButton);
