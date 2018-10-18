export default `

.root {
    font-family: sans-serif;
    font-size: 9pt;
}

h1 {
    margin-top: 0;
}

.table {
    border-collapse: collapse;
    width: 100%;
    border-color: #000;
}

thead tr {
    -webkit-print-color-adjust: exact;
    background-color: #000;
    color: #fff;
}

tr:nth-child(2n) {
    -webkit-print-color-adjust: exact;
    background-color: rgba(0,0,0, 0.05);
}

td, th {
    padding: 8px 16px;
    font-size: 9pt;
    text-align: left;
}

th:not(:last-child) {
    border-right-color: #fff;
}

`;
