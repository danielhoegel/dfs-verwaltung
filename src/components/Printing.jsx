import React from 'react';
import { renderToString } from 'react-dom/server';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import reportStyles from '../reports/reportStyles';
import { getReportSettings } from '../reports/redux/reportSelectors';


export function printPage({
    fileName,
    orientation,
    styles,
    html
}) {
    const prinWindow = window.open('', 'PRINT', 'height=735,width=1024');

    prinWindow.document.write(`
        <html>
        <head>
            <title>${fileName}</title>
            <style type="text/css">
                @page { size: A4 ${orientation}; }
                /* html, body {
                    width: ${orientation === 'portrait' ? '210' : '297'}mm;
                    height: ${orientation === 'portrait' ? '297' : '210'}mm;
                } */
                ${styles}
            </style>
        </head>
        <body>
            ${html}
        </body>
        </html>
    `);

    prinWindow.document.close(); // necessary for IE >= 10
    prinWindow.focus(); // necessary for IE >= 10*/

    prinWindow.print();
    // prinWindow.close();

    return true;
}


function Printing({
    component: Component,
    styles,
    autoFileName,
    noDateSuffix,
    autoOrientation,
    settings,
    children,
}) {

    function __htmlString() {
        const html = renderToString(typeof Component === 'object' ? Component : <Component />);
        return html;
    }

    function __styles() {
        return reportStyles + styles;
    }

    function __fileName() {
        const { titleType, customTitle } = settings;
        const fileName =
              titleType === 'custom' ? customTitle
            : titleType === 'auto' ? autoFileName
            : '';
        return `${fileName + (noDateSuffix ? '' : `_${Date.now()}`)}`;
    }

    function __orientation() {
        const { orientation } = settings;
        return orientation === 'auto' ? autoOrientation : orientation;
    }

    function __printPage() {
        printPage({
            fileName: __fileName(),
            html: __htmlString(),
            styles: __styles(),
            orientation: __orientation()
       });
    }

    return children
        ? React.cloneElement(children, { onClick: __printPage })
        : <Button variant='text' onClick={__printPage}>Download PDF</Button>;
}

Printing.propTypes = {
    children: PropTypes.object,
    component: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func,
    ]),
    styles: PropTypes.string,
    fileName: PropTypes.string,
    noDateSuffix: PropTypes.bool,
    orientation: PropTypes.oneOf(['landscape', 'portrait']).isRequired,
    settings: PropTypes.object.isRequired,
};

Printing.defaultProps = {
    noDateSuffix: false,
    orientation: 'portrait',
};

const mapStateToProps = state => ({
    settings: getReportSettings(state)
});

export default connect(mapStateToProps)(Printing);
