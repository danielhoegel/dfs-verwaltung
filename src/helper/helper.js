/**
 * Return wheather the needle is found inside the heystack (case insensitiv)
 * @param {string} haystack String to search in
 * @param {string} needle String to search for
 */
export function stringsMatch(haystack, needle) {
    return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
};

/**
 * Translate studienkurs id into name
 * @param {string} studienkurs 
 */
export function translateStudienkurse(studienkurs) {
    switch (parseInt(studienkurs, 10)) {
        case 1: return 'Grundstudienkurs';
        case 2: return 'Aufbaustudienkurs';
        default: return studienkurs;
    }
}

export function shortVorlesungTyp(typ) {
    switch (typ) {
        case 'Vorlesung': return 'Vorl.';
        case 'Arbeitsgemeinschaft': return 'AG';
        default: return typ;
    }
}

export function isDescendant(parent, child) {
    let node = child.parentNode;
    while (node !== null) {
        if (node === parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}


export function getTodayDate() {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const today = new Date();
    return today.toLocaleDateString('de-DE', options);
}
