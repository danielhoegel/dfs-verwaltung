import { createMuiTheme } from '@material-ui/core/styles';
// import indigo from '@material-ui/core/colors/indigo';

const defaultTheme = createMuiTheme();

const customColors = {
    primary: '#006ab3',
    secondary: '#e2e3e3',
    lighter: 'rgba(0, 0, 0, 0.08)',
    light: 'rgba(0, 0, 0, 0.23)',
    disabled: 'rgba(0, 0, 0, 0.26)',
    borderBottom: 'rgba(0, 0, 0, 0.42)',
};

const theme = createMuiTheme({
    palette: {
        primary: { main: customColors.primary },
        secondary: { main: customColors.secondary },
        lighter: customColors.lighter,
        light: customColors.light,
        disabled: customColors.disabled,
        borderBottom: customColors.borderBottom,
    },
    overrides: {
        MuiInput: {
            underline: {
                '&:hover:not($disabled):not($focused):not($error):before': {
                    borderBottom: `1px solid ${customColors.borderBottom}`,
                },
            },
        },
        MuiNativeSelect: {
            select: {
                '& option': {
                    backgroundColor: defaultTheme.palette.common.white,
                },
            },
        },
    //     MuiButton: {
    //         root: {
    //             border: `1px solid ${indigo[500]}`
    //         },
    //     },
    },
});

export default theme;
