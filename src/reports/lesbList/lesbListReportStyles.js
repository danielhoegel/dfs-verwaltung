export default `

body {
    font-family: 'Arial', sans-serif;
    font-size: 9pt;
}

table {
    width: 100%;
    border-collapse: collapse;
}

tbody:nth-child(2n + 1) {
    -webkit-print-color-adjust: exact;
    background-color: rgba(0,0,0, 0.05);
}

th, td {
    padding: 0.25rem 0.5rem;
    text-align: left;
    font-size: 9pt;
    border-right: 1px solid #aaa;
}

th:first-child,
td:first-child {
    border-left: 1px solid #aaa;
}

td {
    border-bottom: 1px solid #aaa;
}

th {
    -webkit-print-color-adjust: exact;
    background-color: #000;
    color: #fff;
    border-color: #000 !important;
}

th:not(:last-child) {
    border-right-color: #aaa;
}

.zpk {
    font-weight: 600;
}

.student:not(:last-child) {
    page-break-after: always;
}

.anmerkung {
    margin: 1rem 0 0;
    padding: 0 1rem;
}

.anmerkung:not(:last-child) {
    margin-bottom: 2rem;
}

`;