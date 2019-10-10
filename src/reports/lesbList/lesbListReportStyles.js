export default `

tbody:nth-child(2n + 1) {
    background-color: rgba(0,0,0, 0.05);
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
