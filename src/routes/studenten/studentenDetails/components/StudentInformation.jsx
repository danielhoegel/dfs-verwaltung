import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';

import { formatDate, copyToClipboard } from '../../../../helper/helper';


const StudentInformation = ({ classes, student }) => {
    const {
        birthDate,
        birthPlace,
        birthCountry,
        address,
        addressExtra,
        postal,
        country,
        city,
        mailPrimary,
        mailSecondary,
        phoneNumber,
        mobileNumber,
        bank,
        accountHolder,
        iban,
        bic
    } = student.studentInformation;

    const copyIban = () => copyToClipboard(iban);
    const copyBic = () => copyToClipboard(bic);


    return (
        <div>
            <Typography component='h3' variant='body1' className={classes.subheading}>Geburtsdatum</Typography>
                <div>
                    <span className={classes.noSelect}>Geburtsdatum: </span>
                    {formatDate(birthDate)}
                </div>
                <div>
                    <span className={classes.noSelect}>Geburtsort: </span>
                    {birthPlace}, {birthCountry}
                </div>
            
            <Typography component='h3' variant='body1' className={classes.subheading}>Adresse</Typography>
                {address} {addressExtra && `, ${addressExtra}`}<br />
                {postal} {city}, {country}

            <Typography component='h3' variant='body1' className={classes.subheading}>E-Mail</Typography>
            <div>
                <span className={classes.noSelect}>Mail (Uni): </span>
                <a href={`mailto:${mailPrimary}`} className={classes.link}>{mailPrimary}</a>
            </div>
            <div>
                <span className={classes.noSelect}>Mail (Privat): </span>
                <a href={`mailto:${mailSecondary}`} className={classes.link}>{mailSecondary}</a>
            </div>
                
            <Typography component='h3' variant='body1' className={classes.subheading}>Telefonnummer</Typography>
            <div>
                <span className={classes.noSelect}>Festnetz: </span>
                <a href={`tel:${phoneNumber}`} className={classes.link}>{phoneNumber}</a>
            </div>
            <div>
                <span className={classes.noSelect}>Mobieltelefon: </span>
                <a href={`tel:${mobileNumber}`} className={classes.link}>{mobileNumber}</a>
            </div>
            
            <Typography component='h3' variant='body1' className={classes.subheading}>Kontodaten</Typography>
            <div>
                <span>
                    <span className={classes.noSelect}>Kontoinhaber: </span>
                    {accountHolder}
                </span>
            </div>
            <div>
                <span>
                    <span className={classes.noSelect}>Bank: </span>
                    {bank}
                </span>
            </div>
            <div className={classes.copyContainer}>
                <span>
                    <span className={classes.noSelect}>IBAN: </span>
                    {iban}
                </span>
                {iban && <FileCopyIcon className={classes.copyIcon} onClick={copyIban} />}
            </div>
            <div className={classes.copyContainer}>
                <span>
                    <span className={classes.noSelect}>BIC: </span>
                    {bic}
                </span>
                {bic && <FileCopyIcon className={classes.copyIcon} onClick={copyBic} />}
            </div>
        </div>
    );
};

StudentInformation.propTypes = {
    student: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

const styles = theme => ({
    subheading: {
        marginBottom: theme.spacing.unit,
        '&:not(:first-child)': {
            marginTop: 3 * theme.spacing.unit,
        }
    },
    link: {
        color: theme.palette.primary.dark,
        textDecoration: 'none',
        display: 'inline-block',
        borderBottom: '1px dashed transparent',
        '&:hover': {
            color: theme.palette.primary.light,
            borderColor: theme.palette.primary.light
        }
    },
    noSelect: {
        userSelect: 'none',
    },
    copyContainer: {
        display: 'flex',
        alignItems: 'center',
        '&:hover $copyIcon': {
            opacity: 1,
        }
    },
    copyIcon: {
        opacity: 0,
        color: 'rgba(0, 0, 0, 0.54)',
        marginLeft: theme.spacing.unit,
        fontSize: '1.5em',
        cursor: 'pointer',
        '&:hover': {
            color: 'rgba(0,0,0, 0.75)',
        },
        '&:active': {
            color: theme.palette.green,
        }
    },
})

export default withStyles(styles)(StudentInformation);
