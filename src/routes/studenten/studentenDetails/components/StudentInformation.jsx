import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';

import { formatDate } from '../../../../helper/helper';


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
        mobileNumber
    } = student.studentInformation;
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
                    {mailUni && <>Mail (Uni): <a href={`mailto:${mailUni}`} className={classes.link}>{mailUni}</a><br /></>}
                    {mailPrivate && <>Mail (Privat): <a href={`mailto:${mailPrivate}`} className={classes.link}>{mailPrivate}</a></>}
                </>
            )}
                
            {(phoneNumber || mobileNumber) && (
                <>
                    <Typography as='h3' variant='body2' className={classes.subheading}>Telefonnummer</Typography>
                    {phoneNumber && <>Festnetz: <a href={`tel:${phoneNumber}`} className={classes.link}>{phoneNumber}</a><br /></>}
                    {mobileNumber && <>Mobieltelefon: <a href={`tel:${mobileNumber}`} className={classes.link}>{mobileNumber}</a></>}
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
    }
})

export default withStyles(styles)(StudentInformation);