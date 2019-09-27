import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

class Faecher extends Component {
    static propTypes = {
        ue: PropTypes.number.isRequired,
        student: PropTypes.object.isRequired,
        semester: PropTypes.number.isRequired,
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.semester !== prevState.lastSemester) {
            return {
                ...prevState,
                faecher: nextProps.getFaecherDataForUEAndSemester(nextProps.ue, nextProps.semester),
                lastSemester: nextProps.semester
            };
        }
        return prevState;
    }

    state = {
        faecher: [],
        lastSemester: null
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                {this.state.faecher.map(fach => {
                    const veranstaltungen = this.props.getVeranstaltungenForFach(fach.id);
                    return (
                        <tbody key={fach.id}>
                            {veranstaltungen.map((veranstaltung, index) => (
                                <tr key={`${fach.id}_${veranstaltung.id}`}>
                                    {index === 0 && (
                                        <td rowSpan={veranstaltungen.length}>{fach.title}</td>
                                    )}
                                    <td>
                                        {veranstaltung.type}
                                        {veranstaltung.title && `, (${veranstaltung.title})`}
                                    </td>
                                    <td>{veranstaltung.credits}</td>
                                    <td>
                                        {veranstaltung.participationType === 'Teilnahme'
                                            ? <span className={classes.teilnahme}>Teilnahme</span>
                                            : this.props.getPunkteForVeranstaltungAndStudent(
                                                veranstaltung.id,
                                                this.props.student.id
                                            )
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )
                })}
            </Fragment>
        );
    }
}

const styles = theme => ({
    teilnahme: {
        opacity: 0.75
    }
});

export default withStyles(styles)(Faecher);
