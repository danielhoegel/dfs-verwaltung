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
        street,
        streetNumber,
        addressExtra,
        postal,
        country,
        city,
        mailUni,
        mailPrivate,
        phoneNumber,
        mobileNumber,
        iban,
        bic
    } = student.studentInformation;

    const copyIban = () => copyToClipboard(iban);
    const copyBic = () => copyToClipboard(bic);


    return (
        <div>
            <Typography as='h3' variant='body2' className={classes.subheading}>Geburtsdatum</Typography>
                geboren am {formatDate(birthDate)}<br />
                in {birthPlace}, {birthCountry}
            
            <Typography as='h3' variant='body2' className={classes.subheading}>Adresse</Typography>
                {street} {streetNumber} {addressExtra && `, ${addressExtra}`}<br />
                {postal} {city}, {country}

            {(mailUni || mailPrivate) && (
                <>
                    <Typography as='h3' variant='body2' className={classes.subheading}>E-Mail</Typography>
                    {mailUni && <><span className={classes.noSelect}>Mail (Uni): </span><a href={`mailto:${mailUni}`} className={classes.link}>{mailUni}</a><br /></>}
                    {mailPrivate && <><span className={classes.noSelect}>Mail (Privat): </span><a href={`mailto:${mailPrivate}`} className={classes.link}>{mailPrivate}</a></>}
                </>
            )}
                
            {(phoneNumber || mobileNumber) && (
                <>
                    <Typography as='h3' variant='body2' className={classes.subheading}>Telefonnummer</Typography>
                    {phoneNumber && <><span className={classes.noSelect}>Festnetz: </span><a href={`tel:${phoneNumber}`} className={classes.link}>{phoneNumber}</a><br /></>}
                    {mobileNumber && <><span className={classes.noSelect}>Mobieltelefon: </span><a href={`tel:${mobileNumber}`} className={classes.link}>{mobileNumber}</a></>}
                </>
            )}
            {(iban || bic) && (
                <>
                    <Typography as='h3' variant='body2' className={classes.subheading}>Kontodaten</Typography>
                    {iban && (
                        <div className={classes.copyContainer}>
                            <span>
                                <span className={classes.noSelect}>IBAN: </span>
                                {iban}
                            </span>
                            <FileCopyIcon className={classes.copyIcon} onClick={copyIban} />
                        </div>
                    )}
                    {bic && (
                        <div className={classes.copyContainer}>
                            <span>
                                <span className={classes.noSelect}>BIC: </span>
                                {bic}
                            </span>
                            <FileCopyIcon className={classes.copyIcon} onClick={copyBic} />
                        </div>
                    )}
                </>
            )}
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
