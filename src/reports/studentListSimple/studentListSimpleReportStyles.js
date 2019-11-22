export default `

table {
    border: none;
}

tr:nth-child(2n) {
    background-color: rgba(0,0,0, 0.05);
}

td, th {
    padding: 8px 16px;
}

td:first-child,
th:first-child {
    border-left: none;
}

td:last-child,
th:last-child {
    border-right: none;
}

th {
    background-color: rgba(0,0,0, 0.15);
    color: black;
    font-wheight: bold;
    border-left-color: #aaa !important;
    border-right-color: #aaa !important;
}

`;
