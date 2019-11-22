export default `

* {
    -webkit-print-color-adjust: exact !important;
    color-adjust: exact !important;
}

body {
    font-family: 'Arial', sans-serif;
    font-size: 9pt;
}

h1 {
    margin-top: 0;
}

h1.empty-title {
    border-bottom: 1px solid #aaa;
}

table {
    border-collapse: collapse;
    width: 100%;
    border-color: #aaa;
}

th, td {
    padding: 4px 8px;
    text-align: left;
    font-size: 9pt;
    border: 1px solid #aaa;
}

th {
    background-color: #000;
    color: #fff;
    border-color: #000 !important;
}

th:first-child,
td:first-child {
    border-left: 1px solid #aaa;
}

`;
