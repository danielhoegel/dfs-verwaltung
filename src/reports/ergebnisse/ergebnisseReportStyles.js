export default `

tbody:nth-child(2n + 1) {
    background-color: rgba(0,0,0, 0.05);
}

.student:not(:last-child) {
    page-break-after: always;
}

.semester-title {
    margin: 2rem 0 1rem;
}

.teilnahme {
    opacity: 0.75;
}

`;
