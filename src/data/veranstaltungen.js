export const VERANSTALTUNG_TYPEN = {
    vorlesung: 'Vorlesung',
    ag: 'Arbeitsgemeinschaft'
};

export default veranstaltungen = [
    { id: 0, fachID: 0, name: 'BGB AT', typ: VERANSTALTUNG_TYPEN.vorlesung },
    { id: 1, fachID: 0, name: 'BGB AT', typ: VERANSTALTUNG_TYPEN.ag },
    { id: 0, fachID: 1, name: 'SchuldR AT', typ: VERANSTALTUNG_TYPEN.vorlesung },
    { id: 1, fachID: 1, name: 'SchuldR AT', typ: VERANSTALTUNG_TYPEN.ag },
    { id: 0, fachID: 1, name: 'SchuldR BT', typ: VERANSTALTUNG_TYPEN.vorlesung },
    { id: 1, fachID: 1, name: 'SchuldR BT', typ: VERANSTALTUNG_TYPEN.ag },
    { id: 0, fachID: 2, name: 'Sachenrecht', typ: VERANSTALTUNG_TYPEN.vorlesung },
    { id: 1, fachID: 2, name: 'Sachenrecht', typ: VERANSTALTUNG_TYPEN.ag },
    { id: 0, fachID: 2, name: 'Familienrecht', typ: VERANSTALTUNG_TYPEN.vorlesung },
    { id: 0, fachID: 2, name: 'Erbrecht', typ: VERANSTALTUNG_TYPEN.vorlesung },
    { id: 1, fachID: 2, name: 'FamR + ErbR', typ: VERANSTALTUNG_TYPEN.ag },
    
    { id: 4, fachID: 3, name: 'StaatsOrga + GrundR', typ: VERANSTALTUNG_TYPEN.vorlesung },
    { id: 5, fachID: 3, name: 'StaatsOrga + GrundR', typ: VERANSTALTUNG_TYPEN.ag },
    { id: 4, fachID: 4, name: 'VerwaltungsR AT + VerwaltungsProzR', typ: VERANSTALTUNG_TYPEN.vorlesung },
    { id: 5, fachID: 4, name: 'VerwaltungsR AT + VerwaltungsProzR', typ: VERANSTALTUNG_TYPEN.ag },
    { id: 4, fachID: 5, name: 'Baurecht', typ: VERANSTALTUNG_TYPEN.vorlesung },
    { id: 4, fachID: 5, name: 'Kommunalrecht', typ: VERANSTALTUNG_TYPEN.vorlesung },
    { id: 4, fachID: 5, name: 'Europarecht', typ: VERANSTALTUNG_TYPEN.vorlesung },
    { id: 5, fachID: 5, name: 'Baurecht + Kommunalrecht', typ: VERANSTALTUNG_TYPEN.ag },
    
    { id: 2, fachID: 6, name: 'StGB AT', typ: VERANSTALTUNG_TYPEN.vorlesung },
    { id: 3, fachID: 6, name: 'StGB AT', typ: VERANSTALTUNG_TYPEN.ag },
    { id: 2, fachID: 7, name: 'StGB BT', typ: VERANSTALTUNG_TYPEN.vorlesung },
    { id: 3, fachID: 7, name: 'StGB BT', typ: VERANSTALTUNG_TYPEN.ag },
];
