const TYPEN = {
    VORLESUNG: 'Vorlesung',
    AG: 'Arbeitsgemeinschaft',
    TD: 'TD',
    CM: 'CM'
};

const TEILNAHMEART = {
    NOTE: 'Note',
    TEILNAHME: 'Teilnahme'
};

/**
 * Veranstaltungen
 */
module.exports = [
    { id: 0, fachID: 0, name: 'BGB AT', typ: TYPEN.VORLESUNG, credits: 4, zpk: true, teilnahmeart: TEILNAHMEART.NOTE },
    { id: 1, fachID: 0, name: 'BGB AT', typ: TYPEN.AG, credits: 2, zpk: false, teilnahmeart: TEILNAHMEART.TEILNAHME },
    { id: 2, fachID: 1, name: 'SchuldR AT', typ: TYPEN.VORLESUNG, credits: 4, zpk: true, teilnahmeart: TEILNAHMEART.NOTE },
    { id: 4, fachID: 1, name: 'SchuldR BT', typ: TYPEN.VORLESUNG, credits: 4, zpk: true, teilnahmeart: TEILNAHMEART.NOTE },
    { id: 5, fachID: 1, name: 'SchuldR AT + BT', typ: TYPEN.AG, credits: 4, zpk: false, teilnahmeart: TEILNAHMEART.TEILNAHME },
    { id: 6, fachID: 2, name: 'Sachenrecht', typ: TYPEN.VORLESUNG, credits: 4, zpk: false, teilnahmeart: TEILNAHMEART.NOTE },
    { id: 7, fachID: 2, name: 'Sachenrecht', typ: TYPEN.AG, credits: 2, zpk: false, teilnahmeart: TEILNAHMEART.TEILNAHME },
    { id: 8, fachID: 2, name: 'Familienrecht', typ: TYPEN.VORLESUNG, credits: 4, zpk: false, teilnahmeart: TEILNAHMEART.NOTE },
    { id: 9, fachID: 2, name: 'Erbrecht', typ: TYPEN.VORLESUNG, credits: 4, zpk: false, teilnahmeart: TEILNAHMEART.NOTE },
    { id: 10, fachID: 2, name: 'FamR + ErbR', typ: TYPEN.AG, credits: 2, zpk: false, teilnahmeart: TEILNAHMEART.TEILNAHME },
    
    { id: 11, fachID: 3, name: 'StaatsOrga + GrundR', typ: TYPEN.VORLESUNG, credits: 4, zpk: false, teilnahmeart: TEILNAHMEART.NOTE },
    { id: 12, fachID: 3, name: 'StaatsOrga + GrundR', typ: TYPEN.AG, credits: 2, zpk: false, teilnahmeart: TEILNAHMEART.TEILNAHME },
    { id: 13, fachID: 4, name: 'VerwaltungsR AT + VerwaltungsProzR', typ: TYPEN.VORLESUNG, credits: 4, zpk: true, teilnahmeart: TEILNAHMEART.NOTE },
    { id: 14, fachID: 4, name: 'VerwaltungsR AT + VerwaltungsProzR', typ: TYPEN.AG, credits: 2, zpk: false, teilnahmeart: TEILNAHMEART.TEILNAHME },
    { id: 15, fachID: 5, name: 'Baurecht', typ: TYPEN.VORLESUNG, credits: 4, zpk: true, teilnahmeart: TEILNAHMEART.NOTE },
    { id: 16, fachID: 5, name: 'Kommunalrecht', typ: TYPEN.VORLESUNG, credits: 4, zpk: false, teilnahmeart: TEILNAHMEART.NOTE },
    { id: 17, fachID: 5, name: 'Europarecht', typ: TYPEN.VORLESUNG, credits: 4, zpk: true, teilnahmeart: TEILNAHMEART.NOTE },
    { id: 18, fachID: 5, name: 'Baurecht + Kommunalrecht', typ: TYPEN.AG, credits: 2, zpk: false, teilnahmeart: TEILNAHMEART.TEILNAHME },
    
    { id: 19, fachID: 6, name: 'StGB AT', typ: TYPEN.VORLESUNG, credits: 4, zpk: true, teilnahmeart: TEILNAHMEART.NOTE },
    { id: 20, fachID: 6, name: 'StGB AT', typ: TYPEN.AG, credits: 2, zpk: false, teilnahmeart: TEILNAHMEART.TEILNAHME },
    { id: 21, fachID: 7, name: 'StGB BT', typ: TYPEN.VORLESUNG, credits: 4, zpk: false, teilnahmeart: TEILNAHMEART.NOTE },
    { id: 22, fachID: 7, name: 'StGB BT', typ: TYPEN.AG, credits: 2, zpk: false, teilnahmeart: TEILNAHMEART.TEILNAHME },
    
    { id: 23, fachID: 8, name: '', typ: TYPEN.VORLESUNG, credits: 3, zpk: false, teilnahmeart: TEILNAHMEART.NOTE },

    { id: 30, fachID: 54, name: '', typ: TYPEN.TD, credits: 2, zpk: false, teilnahmeart: TEILNAHMEART.NOTE },
    { id: 37, fachID: 47, name: '', typ: TYPEN.TD, credits: 3.5, zpk: false, teilnahmeart: TEILNAHMEART.NOTE },
    { id: 36, fachID: 47, name: '', typ: TYPEN.CM, credits: 3.5, zpk: false, teilnahmeart: TEILNAHMEART.TEILNAHME },
    { id: 45, fachID: 48, name: '', typ: TYPEN.TD, credits: 3.5, zpk: false, teilnahmeart: TEILNAHMEART.NOTE },
    { id: 44, fachID: 48, name: '', typ: TYPEN.CM, credits: 3.5, zpk: false, teilnahmeart: TEILNAHMEART.TEILNAHME },
    { id: 27, fachID: 41, name: '', typ: TYPEN.TD, credits: 2.5, zpk: false, teilnahmeart: TEILNAHMEART.NOTE },
    { id: 26, fachID: 41, name: '', typ: TYPEN.CM, credits: 2.5, zpk: false, teilnahmeart: TEILNAHMEART.TEILNAHME },
    { id: 35, fachID: 42, name: '', typ: TYPEN.TD, credits: 3.5, zpk: false, teilnahmeart: TEILNAHMEART.NOTE },
    { id: 34, fachID: 42, name: '', typ: TYPEN.CM, credits: 3.5, zpk: false, teilnahmeart: TEILNAHMEART.TEILNAHME },
    { id: 42, fachID: 43, name: '', typ: TYPEN.CM, credits: 3.5, zpk: false, teilnahmeart: TEILNAHMEART.TEILNAHME },
    { id: 43, fachID: 43, name: '', typ: TYPEN.TD, credits: 3.5, zpk: false, teilnahmeart: TEILNAHMEART.NOTE },
    { id: 29, fachID: 46, name: '', typ: TYPEN.TD, credits: 2.5, zpk: false, teilnahmeart: TEILNAHMEART.NOTE },
    { id: 28, fachID: 46, name: '', typ: TYPEN.CM, credits: 2.5, zpk: false, teilnahmeart: TEILNAHMEART.TEILNAHME },
    { id: 51, fachID: 53, name: '', typ: TYPEN.TD, credits: 2, zpk: false, teilnahmeart: TEILNAHMEART.NOTE },
    { id: 52, fachID: 52, name: '', typ: TYPEN.TD, credits: 2, zpk: false, teilnahmeart: TEILNAHMEART.NOTE },
    { id: 53, fachID: 45, name: '', typ: TYPEN.TD, credits: 2, zpk: false, teilnahmeart: TEILNAHMEART.NOTE },
    { id: 54, fachID: 45, name: '', typ: TYPEN.CM, credits: 2, zpk: false, teilnahmeart: TEILNAHMEART.TEILNAHME },
    { id: 55, fachID: 40, name: '', typ: TYPEN.CM, credits: 2, zpk: false, teilnahmeart: TEILNAHMEART.TEILNAHME },
    { id: 56, fachID: 40, name: '', typ: TYPEN.TD, credits: 2, zpk: false, teilnahmeart: TEILNAHMEART.NOTE },
];