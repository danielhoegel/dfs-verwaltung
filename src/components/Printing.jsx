import React from 'react';
import { renderToString } from 'react-dom/server';
import PropTypes from 'prop-types';


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
    prinWindow.close();

    return true;
}


function Printing({
    component: Component,
    styles,
    fileName,
    noDateSuffix,
    orientation,
    children
}) {
    function __htmlString() {
        const html = renderToString(typeof Component === 'object' ? Component : <Component />);
        return html;
    }

    function __fileName() {
        return fileName + (noDateSuffix ? '' : `_${Date.now()}`) + '.pdf';
    }

    function __printPage() {
        printPage({
            fileName: __fileName(),
            html: __htmlString(),
            orientation,
            styles,
       } );
    }

    return children
        ? React.cloneElement(children, { onClick: __printPage })
        : <button onClick={__printPage}>Download PDF</button>;
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
};

Printing.defaultProps = {
    noDateSuffix: false,
    orientation: 'portrait',
};

export default Printing;
