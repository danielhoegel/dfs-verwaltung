import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const Loader = ({ loading, strength, classes }) => {
    return loading
        ? (
            <div className={classes.loader} style={{
                backgroundColor: strength ? `rgba(255, 255, 255, ${strength})` : null
            }}>
                <CircularProgress />
            </div>
        ) : null
}

Loader.defaultProps = {
    loading: true
};

const styles = {
    loader: {
        zIndex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export default withStyles(styles)(Loader);
