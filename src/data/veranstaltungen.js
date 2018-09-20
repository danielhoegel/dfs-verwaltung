export const VERANSTALTUNG_TYPEN = {
    vorlesung: 'Vorlesung',
    ag: 'Arbeitsgemeinschaft'
};

export default [
    { id: 0, fachID: 0, name: 'BGB AT', typ: VERANSTALTUNG_TYPEN.vorlesung },
    { id: 1, fachID: 0, name: 'BGB AT', typ: VERANSTALTUNG_TYPEN.ag },
    { id: 2, fachID: 1, name: 'SchuldR AT', typ: VERANSTALTUNG_TYPEN.vorlesung },
    { id: 3, fachID: 1, name: 'SchuldR AT', typ: VERANSTALTUNG_TYPEN.ag },
    { id: 4, fachID: 1, name: 'SchuldR BT', typ: VERANSTALTUNG_TYPEN.vorlesung },
    { id: 5, fachID: 1, name: 'SchuldR BT', typ: VERANSTALTUNG_TYPEN.ag },
    { id: 6, fachID: 2, name: 'Sachenrecht', typ: VERANSTALTUNG_TYPEN.vorlesung },
    { id: 7, fachID: 2, name: 'Sachenrecht', typ: VERANSTALTUNG_TYPEN.ag },
    { id: 8, fachID: 2, name: 'Familienrecht', typ: VERANSTALTUNG_TYPEN.vorlesung },
    { id: 9, fachID: 2, name: 'Erbrecht', typ: VERANSTALTUNG_TYPEN.vorlesung },
    { id: 10, fachID: 2, name: 'FamR + ErbR', typ: VERANSTALTUNG_TYPEN.ag },
    
    { id: 11, fachID: 3, name: 'StaatsOrga + GrundR', typ: VERANSTALTUNG_TYPEN.vorlesung },
    { id: 12, fachID: 3, name: 'StaatsOrga + GrundR', typ: VERANSTALTUNG_TYPEN.ag },
    { id: 13, fachID: 4, name: 'VerwaltungsR AT + VerwaltungsProzR', typ: VERANSTALTUNG_TYPEN.vorlesung },
    { id: 14, fachID: 4, name: 'VerwaltungsR AT + VerwaltungsProzR', typ: VERANSTALTUNG_TYPEN.ag },
    { id: 15, fachID: 5, name: 'Baurecht', typ: VERANSTALTUNG_TYPEN.vorlesung },
    { id: 16, fachID: 5, name: 'Kommunalrecht', typ: VERANSTALTUNG_TYPEN.vorlesung },
    { id: 17, fachID: 5, name: 'Europarecht', typ: VERANSTALTUNG_TYPEN.vorlesung },
    { id: 18, fachID: 5, name: 'Baurecht + Kommunalrecht', typ: VERANSTALTUNG_TYPEN.ag },
    
    { id: 19, fachID: 6, name: 'StGB AT', typ: VERANSTALTUNG_TYPEN.vorlesung },
    { id: 20, fachID: 6, name: 'StGB AT', typ: VERANSTALTUNG_TYPEN.ag },
    { id: 21, fachID: 7, name: 'StGB BT', typ: VERANSTALTUNG_TYPEN.vorlesung },
    { id: 22, fachID: 7, name: 'StGB BT', typ: VERANSTALTUNG_TYPEN.ag },
];
