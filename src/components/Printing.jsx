import React from 'react';
import { renderToString } from 'react-dom/server';
import PropTypes from 'prop-types';
// import html2pdf from 'html2pdf.js';
// import jsPDF from 'jspdf';
// import juice from 'juice';


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
    // options,
    children
}) {
    function __htmlString() {
        console.log('component type', typeof Componet);
        const html = renderToString(typeof Component === 'object' ? Component : <Component />);
        return html;
        // return styles
        //     ? juice(`<style>${styles}</style>\n${html}`)
        //     : html;
    }

    function __fileName() {
        return fileName + (noDateSuffix ? '' : `_${Date.now()}`) + '.pdf';
    }

    /* const printPDF = () => {
        const html = __htmlString();
        console.log({ html });
        
        const pdf = new jsPDF(options);
        
        pdf.addHTML(html, () => {
                pdf.save(fileName());
            });
            
        pdf.fromHTML(html, 15, 15, {
                'width': 841, 
                'elementHandlers': { '.not-printing': (element, renderer) => true }
            });
            pdf.save(__fileName());
                
        const options = {
            filename:     __fileName(),
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 3 },
        };

        html2pdf().from(html).set(options).save();
    }; */

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
    options: PropTypes.object,
    fileName: PropTypes.string,
    noDateSuffix: PropTypes.bool,
    orientation: PropTypes.oneOf(['landscape', 'portrait']).isRequired,
};

Printing.defaultProps = {
    options: {
        orientation: 'landscape',
        unit: 'pt'
    },
    noDateSuffix: false,
    orientation: 'portrait',
};

export default Printing;
