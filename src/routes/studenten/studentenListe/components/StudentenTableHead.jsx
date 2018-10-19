import React, { Component } from "react";
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';


class StudentenTableHead extends Component {
    shouldComponentUpdate(nextProps) {
        return (
            (nextProps.numSelected !== this.props.numSelected) ||
            (nextProps.rowCount !== this.props.rowCount)
        );
    }

    checked() {
        const { numSelected, rowCount } = this.props;
        return numSelected > 0 && numSelected === rowCount;
    }

    indeterminate() {
        const { numSelected, rowCount } = this.props;
        return numSelected > 0 && numSelected < rowCount;
    }

    render() {
        const { classes } = this.props;
        return (
            <TableHead>
                <TableRow>
                    <TableCell
                        className={classes.tableHeadCell}
                        padding='checkbox'
                        aria-checked={this.checked()}
                        onClick={this.props.onSelectAllClick}
                        style={{ width: '5%'}}
                    >
                        <Checkbox
                            indeterminate={this.indeterminate()}
                            checked={this.checked()}
                            color='primary'
                            disabled={this.props.rowCount === 0}
                        />
                    </TableCell>
                    {this.props.columns.map(column => (
                        <TableCell
                            key={column.id}
                            style={{ width: column.width }}
                            className={classes.tableHeadCell}
                            padding={column.padding ? column.padding : 'default'}
                        >
                            {column.label}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }
}

const styles = theme => ({
    tableHeadCell: {
        color: theme.palette.primary.main,
        borderBottom: `2px solid ${theme.palette.primary.main}`,
        whiteSpace: 'nowrap'
    },
});

StudentenTableHead.propTypes = {
    columns: PropTypes.array.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(StudentenTableHead);
