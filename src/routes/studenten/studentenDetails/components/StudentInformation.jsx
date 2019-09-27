import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
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
    const copyMailPrimary = () => copyToClipboard(mailPrimary);
    const copyMailSecondary = () => copyToClipboard(mailSecondary);
    const copyPhoneNumber = () => copyToClipboard(phoneNumber);
    const copyMobileNumber = () => copyToClipboard(mobileNumber);

    return (
        <div>
            <Typography component='h3' variant='body1' className={classes.subheading}>Geburtsdatum</Typography>
                <div>
                    <span className={classes.noSelect}>Geburtsdatum: </span>
                    {formatDate(birthDate)}
                </div>
                <div>
                    <span className={classes.noSelect}>Geburtsort: </span>
                    {birthPlace}{birthPlace && birthCountry && ', '}{birthCountry}
                </div>

            <Typography component='h3' variant='body1' className={classes.subheading}>Adresse</Typography>
                {address && address}{address && addressExtra && ', '}{addressExtra}{address && <br />}
                {postal}{postal && city && ' '}{city}{(postal || city) && country && ', '}{country}

            <Typography component='h3' variant='body1' className={classes.subheading}>E-Mail</Typography>
            <div className={classes.copyContainer}>
                <span>
                    <span className={classes.noSelect}>Mail (Uni): </span>
                    <a href={`mailto:${mailPrimary}`} className={classes.link}>{mailPrimary}</a>
                </span>
                {mailPrimary && <FileCopyIcon className={classes.copyIcon} onClick={copyMailPrimary} />}
            </div>
            <div className={classes.copyContainer}>
                <span>
                    <span className={classes.noSelect}>Mail (Privat): </span>
                    <a href={`mailto:${mailSecondary}`} className={classes.link}>{mailSecondary}</a>
                </span>
                {mailSecondary && <FileCopyIcon className={classes.copyIcon} onClick={copyMailSecondary} />}
            </div>

            <Typography component='h3' variant='body1' className={classes.subheading}>Telefonnummer</Typography>
            <div className={classes.copyContainer}>
                <span>
                    <span className={classes.noSelect}>Festnetz: </span>
                    <a href={`tel:${phoneNumber}`} className={classes.link}>{phoneNumber}</a>
                </span>
                {phoneNumber && <FileCopyIcon className={classes.copyIcon} onClick={copyPhoneNumber} />}
            </div>
            <div className={classes.copyContainer}>
                <span>
                    <span className={classes.noSelect}>Mobieltelefon: </span>
                    <a href={`tel:${mobileNumber}`} className={classes.link}>{mobileNumber}</a>
                </span>
                {mobileNumber && <FileCopyIcon className={classes.copyIcon} onClick={copyMobileNumber} />}
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
        '&:hover': {
            color: theme.palette.primary.light,
            textDecoration: 'underline'
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
});

export default withStyles(styles)(StudentInformation);
