export const VERANSTALTUNG_TYPEN = {
    vorlesung: 'Vorlesung',
    ag: 'Arbeitsgemeinschaft'
};

export default [
    { id: 0, fachID: 0, name: 'BGB AT', typ: VERANSTALTUNG_TYPEN.vorlesung, credits: 4 },
    { id: 1, fachID: 0, name: 'BGB AT', typ: VERANSTALTUNG_TYPEN.ag, credits: 2 },
    { id: 2, fachID: 1, name: 'SchuldR AT', typ: VERANSTALTUNG_TYPEN.vorlesung, credits: 4 },
    { id: 4, fachID: 1, name: 'SchuldR BT', typ: VERANSTALTUNG_TYPEN.vorlesung, credits: 4 },
    { id: 5, fachID: 1, name: 'SchuldR AT + BT', typ: VERANSTALTUNG_TYPEN.ag, credits: 4 },
    { id: 6, fachID: 2, name: 'Sachenrecht', typ: VERANSTALTUNG_TYPEN.vorlesung, credits: 4 },
    { id: 7, fachID: 2, name: 'Sachenrecht', typ: VERANSTALTUNG_TYPEN.ag, credits: 2 },
    { id: 8, fachID: 2, name: 'Familienrecht', typ: VERANSTALTUNG_TYPEN.vorlesung, credits: 4 },
    { id: 9, fachID: 2, name: 'Erbrecht', typ: VERANSTALTUNG_TYPEN.vorlesung, credits: 4 },
    { id: 10, fachID: 2, name: 'FamR + ErbR', typ: VERANSTALTUNG_TYPEN.ag, credits: 2 },
    
    { id: 11, fachID: 3, name: 'StaatsOrga + GrundR', typ: VERANSTALTUNG_TYPEN.vorlesung, credits: 4 },
    { id: 12, fachID: 3, name: 'StaatsOrga + GrundR', typ: VERANSTALTUNG_TYPEN.ag, credits: 2 },
    { id: 13, fachID: 4, name: 'VerwaltungsR AT + VerwaltungsProzR', typ: VERANSTALTUNG_TYPEN.vorlesung, credits: 4 },
    { id: 14, fachID: 4, name: 'VerwaltungsR AT + VerwaltungsProzR', typ: VERANSTALTUNG_TYPEN.ag, credits: 2 },
    { id: 15, fachID: 5, name: 'Baurecht', typ: VERANSTALTUNG_TYPEN.vorlesung, credits: 4 },
    { id: 16, fachID: 5, name: 'Kommunalrecht', typ: VERANSTALTUNG_TYPEN.vorlesung, credits: 4 },
    { id: 17, fachID: 5, name: 'Europarecht', typ: VERANSTALTUNG_TYPEN.vorlesung, credits: 4 },
    { id: 18, fachID: 5, name: 'Baurecht + Kommunalrecht', typ: VERANSTALTUNG_TYPEN.ag, credits: 2 },
    
    { id: 19, fachID: 6, name: 'StGB AT', typ: VERANSTALTUNG_TYPEN.vorlesung, credits: 4 },
    { id: 20, fachID: 6, name: 'StGB AT', typ: VERANSTALTUNG_TYPEN.ag, credits: 2 },
    { id: 21, fachID: 7, name: 'StGB BT', typ: VERANSTALTUNG_TYPEN.vorlesung, credits: 4 },
    { id: 22, fachID: 7, name: 'StGB BT', typ: VERANSTALTUNG_TYPEN.ag, credits: 2 },
    
    { id: 23, fachID: 8, name: '', typ: VERANSTALTUNG_TYPEN.vorlesung, credits: 3 },
];
