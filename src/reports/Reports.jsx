import React, { Component } from 'react';
import { connect } from 'react-redux';
import { renderToString } from 'react-dom/server';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PrintIcon from '@material-ui/icons/PrintOutlined';

import HiddenDivider from '../components/HiddenDivider';
import Placeholder from '../components/placeholder/Placeholder';

import StudentenFilter from '../routes/studenten/components/StudentenFilter';
import { getFilteredStudenten, getStudentenFetching, getStudentenFilter } from '../routes/studenten//redux/studentenSelectors';
import { fetchStudenten } from '../routes/studenten//redux/studentenActions';

import StudentListReport from './studentList/StudentListReport';
import studentListReportStyles from './studentList/studentListReportStyles';
import LESBListReport from './lesbList/LESBListReport';
import lesbListReportStyles from './lesbList/lesbListReportStyles';
import ErgebnisseReport from './ergebnisse/ErgebnisseReport';
import ergebnisseReportStyles from './ergebnisse/ergebnisseReportStyles';
import juice from 'juice';
import { printPage } from '../components/Printing';


const StudentenlisteLoading = () => (
    <Placeholder>
        <Placeholder.Item height='2.5rem' />
        <Placeholder.Item height='2rem' width='70%' />
        <Placeholder.Item height='2rem' width='60%' />
        <Placeholder.Item height='2rem' width='90%' />
        <Placeholder.Item height='2rem' width='80%' />
    </Placeholder>
);

class Reports extends Component {
    state = {
        fileName: '',
        orientation: '',
        styles: '',
        html: ''
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_STUDENTEN',
            request: {
                url: '/students?_embed=studies&_embed=studentInformations&_sort=lastName,firstName,matrikelnummer,id'
            }
        });
    }

    componentDidUpdate(prevProps) {
        const { match, filteredStudenten, filter } = this.props;
        if (prevProps.match !== match || prevProps.filteredStudenten !== filteredStudenten) {
            switch (match.params.report) {
                case 'studenten': this.setState({
                    fileName: 'Studentenliste',
                    orientation: 'landscape',
                    styles: studentListReportStyles,
                    html: renderToString(<StudentListReport students={filteredStudenten} filter={filter} />)
                });
                break;
            
                case 'lesb': this.setState({
                    fileName: 'LESB-Liste',
                    orientation: 'portrait',
                    styles: lesbListReportStyles,
                    html: renderToString(<LESBListReport students={filteredStudenten} filter={filter} />)
                });
                break;
    
                case 'ergebnisse': this.setState({
                    fileName: 'Prüfungsergebnisse',
                    orientation: 'portrait',
                    styles: ergebnisseReportStyles,
                    html: renderToString(<ErgebnisseReport students={filteredStudenten} filter={filter} />)
                });
                break;
    
                default: break;
            }
        }
    }

    __htmlString() {
        const { html, styles } = this.state;
        return juice(`<style>${styles}</style>\n${html}`);
    }

    __printPage = () => {
        const { fileName, orientation, styles, html } = this.state;
        printPage({ fileName, orientation, styles, html });
    }

    render() {
        const { fetching, classes, match } = this.props;
        return (
            <div>
                {fetching ? <StudentenlisteLoading /> : (
                    <div>
                        <Typography variant="display1">
                            Report: {this.state.fileName}
                        </Typography>
                        <HiddenDivider height={2} />
                        <StudentenFilter />
                        <HiddenDivider height={2} />
                        <Paper className={classes.paper}>
                            {match.params.report
                                ? <div
                                    dangerouslySetInnerHTML={{ __html: this.__htmlString() }}
                                    className={classes.container}
                                />
                                : '404 - Kein Report gefunden.'
                            }
                        </Paper>
                        <Button
                            variant='fab'
                            color='primary'
                            className={classes.printButton}
                            onClick={this.__printPage}
                        >
                            <PrintIcon />
                        </Button>
                    </div>
                )}
            </div>
        )
    };
}

const styles = theme => ({
    flexbox: {
        display: 'flex',
        alignItems: 'center',
    },
    paper: {
        padding: 4 * theme.spacing.unit,
    },
    printButton: {
        position: 'absolute',
        bottom: 4 * theme.spacing.unit,
        right: 4 * theme.spacing.unit,
        boxShadow: theme.shadows[6],
        '&:hover': {
            boxShadow: theme.shadows[12],
        }
    },
    container: {
        overflow: 'auto'
    }
});

const mapStateToProps = state => ({
    filteredStudenten: getFilteredStudenten(state),
    fetching: getStudentenFetching(state),
    filter: getStudentenFilter(state)
});

export default connect(mapStateToProps, { fetchStudenten, dispatch: action => action })(
    withStyles(styles)(Reports)
);
