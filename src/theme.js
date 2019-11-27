import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

const customColors = {
    primary: '#006ab3',
    secondary: '#e2e3e3',
    lighter: 'rgba(0, 0, 0, 0.08)',
    light: 'rgba(0, 0, 0, 0.23)',
    disabled: 'rgba(0, 0, 0, 0.26)',
    borderBottom: 'rgba(0, 0, 0, 0.42)',
    red: red[500],
    darkred: red[700],
    green: green[500],
    darkgreen: green[700]
};

const theme = createMuiTheme({
    typography: {
        useNextVariants: true
    },
    palette: {
        primary: { main: customColors.primary },
        secondary: { main: customColors.secondary },
        lighter: customColors.lighter,
        light: customColors.light,
        disabled: customColors.disabled,
        borderBottom: customColors.borderBottom,
        red: customColors.red,
        darkred: customColors.darkred,
        green: customColors.green,
        darkgreen: customColors.darkgreen,
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
        MuiInputLabel: {
            // add manuel cutout for outlined field label
            outlined: {
                '&:after': {
                    content: '""',
                    position: 'absolute',
                    left: '-0.6em',
                    background: '#fff',
                    width: 'calc(100% + 1.2em)',
                    height: '100%',
                    zIndex: -1
                }
            },
        },
        disabled: {}, // needs to be here in order to use it inside MuiSelect
        MuiSelect: {
            select: {
                '&$disabled': {
                    cursor: 'not-allowed',
                }
            }
        },
        MuiNativeSelect: {
            select: {
                // reset native select option background
                '& option': {
                    backgroundColor: '#fff',
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
            sizeSmall: {
                minHeight: 0,
                fontWeight: 'normal',
                padding: [['0.25rem', '0.5rem']],
                fontSize: '0.75rem',
                textTransform: 'none',
                '& svg': {
                    fontSize: '1.5em'
                }
            }
        },
        MuiTab: {
            root: {
                maxWidth: '320px',
            },
        }
    },
});

export default theme;
