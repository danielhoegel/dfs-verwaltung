import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const defaultTheme = createMuiTheme();

const customColors = {
    primary: '#006ab3',
    secondary: '#e2e3e3',
    lighter: 'rgba(0, 0, 0, 0.08)',
    light: 'rgba(0, 0, 0, 0.23)',
    disabled: 'rgba(0, 0, 0, 0.26)',
    borderBottom: 'rgba(0, 0, 0, 0.42)',
    red: red[500],
};

const theme = createMuiTheme({
    palette: {
        primary: { main: customColors.primary },
        secondary: { main: customColors.secondary },
        lighter: customColors.lighter,
        light: customColors.light,
        disabled: customColors.disabled,
        borderBottom: customColors.borderBottom,
        red: customColors.red,
    },
    overrides: {
        MuiInput: {
            underline: {
                // disable input hover effect
                '&:hover:not($disabled):not($focused):not($error):before': {
                    borderBottom: `1px solid ${customColors.borderBottom}`,
                },
            },
        },        
        MuiNotchedOutline: {
            // set outlined input border color
            root: {
                borderColor: customColors.borderBottom
            },
        },
        MuiOutlinedInput: {
            root: {
                // disable outlined input hover effect
                '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
                    borderColor: customColors.borderBottom
                },
            },
        },
        MuiFormLabel: {
            asterisk: {
                color: customColors.red,
            },
        },
        MuiSelect: {
            disabled: {
                '&$select': {
                    cursor: 'not-allowed',
                },
            },
        },
        MuiNativeSelect: {
            select: {
                // reset native select option background
                '& option': {
                    backgroundColor: defaultTheme.palette.common.white,
                },
            },
        },
        MuiButton: {
            contained: {
                boxShadow: 'none',
                '&:active': {
                    boxShadow: 'none',
                },
            },
        },
    },
});

export default theme;
