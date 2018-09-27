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


export const laender = ['Afghanistan', 'Ägypten', 'Aland', 'Albanien', 'Algerien', 'Amerikanisch-Samoa', 'Amerikanische Jungferninseln', 'Andorra', 'Angola', 'Anguilla', 'Antarktis', 'Antigua und Barbuda', 'Äquatorialguinea', 'Argentinien', 'Armenien', 'Aruba', 'Ascension', 'Aserbaidschan', 'Äthiopien', 'Australien', 'Bahamas', 'Bahrain', 'Bangladesch', 'Barbados', 'Belgien', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivien', 'Bosnien und Herzegowina', 'Botswana', 'Bouvetinsel', 'Brasilien', 'Brunei', 'Bulgarien', 'Burkina Faso', 'Burundi', 'Chile', 'China', 'Cookinseln', 'Costa Rica', 'Cote d\'Ivoire', 'Dänemark', 'Deutschland', 'Diego Garcia', 'Dominica', 'Dominikanische Republik', 'Dschibuti', 'Ecuador', 'El Salvador', 'Eritrea', 'Estland', 'Europäische Union', 'Falklandinseln', 'Färöer', 'Fidschi', 'Finnland', 'Frankreich', 'Französisch-Guayana', 'Französisch-Polynesien', 'Gabun', 'Gambia', 'Georgien', 'Ghana', 'Gibraltar', 'Grenada', 'Griechenland', 'Grönland', 'Großbritannien', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard und McDonaldinseln', 'Honduras', 'Hongkong', 'Indien', 'Indonesien', 'Irak', 'Iran', 'Irland', 'Island', 'Israel', 'Italien', 'Jamaika', 'Japan', 'Jemen', 'Jersey', 'Jordanien', 'Kaimaninseln', 'Kambodscha', 'Kamerun', 'Kanada', 'Kanarische Inseln', 'Kap Verde', 'Kasachstan', 'Katar', 'Kenia', 'Kirgisistan', 'Kiribati', 'Kokosinseln', 'Kolumbien', 'Komoren', 'Kongo', 'Kroatien', 'Kuba', 'Kuwait', 'Laos', 'Lesotho', 'Lettland', 'Libanon', 'Liberia', 'Libyen', 'Liechtenstein', 'Litauen', 'Luxemburg', 'Macao', 'Madagaskar', 'Malawi', 'Malaysia', 'Malediven', 'Mali', 'Malta', 'Marokko', 'Marshallinseln', 'Martinique', 'Mauretanien', 'Mauritius', 'Mayotte', 'Mazedonien', 'Mexiko', 'Mikronesien', 'Moldawien', 'Monaco', 'Mongolei', 'Montserrat', 'Mosambik', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Neukaledonien', 'Neuseeland', 'Neutrale Zone', 'Nicaragua', 'Niederlande', 'Niederländische Antillen', 'Niger', 'Nigeria', 'Niue', 'Nordkorea', 'Nördliche Marianen', 'Norfolkinsel', 'Norwegen', 'Oman', 'Österreich', 'Pakistan', 'Palästina', 'Palau', 'Panama', 'Papua-Neuguinea', 'Paraguay', 'Peru', 'Philippinen', 'Pitcairninseln', 'Polen', 'Portugal', 'Puerto Rico', 'Réunion', 'Ruanda', 'Rumänien', 'Russische Föderation', 'Salomonen', 'Sambia', 'Samoa', 'San Marino', 'São Tomé und Príncipe', 'Saudi-Arabien', 'Schweden', 'Schweiz', 'Senegal', 'Serbien und Montenegro', 'Seychellen', 'Sierra Leone', 'Simbabwe', 'Singapur', 'Slowakei', 'Slowenien', 'Somalia', 'Spanien', 'Sri Lanka', 'St. Helena', 'St. Kitts und Nevis', 'St. Lucia', 'St. Pierre und Miquelon', 'St. Vincent/Grenadinen (GB)', 'Südafrika, Republik', 'Sudan', 'Südkorea', 'Suriname', 'Svalbard und Jan Mayen', 'Swasiland', 'Syrien', 'Tadschikistan', 'Taiwan', 'Tansania', 'Thailand', 'Timor-Leste', 'Togo', 'Tokelau', 'Tonga', 'Trinidad und Tobago', 'Tristan da Cunha', 'Tschad', 'Tschechische Republik', 'Tunesien', 'Türkei', 'Turkmenistan', 'Turks- und Caicosinseln', 'Tuvalu', 'Uganda', 'Ukraine', 'Ungarn', 'Uruguay', 'Usbekistan', 'Vanuatu', 'Vatikanstadt', 'Venezuela', 'Vereinigte Arabische Emirate', 'Vereinigte Staaten von Amerika', 'Vietnam', 'Wallis und Futuna', 'Weihnachtsinsel', 'Weißrussland', 'Westsahara', 'Zentralafrikanische Republik', 'Zypern'];
export function generateLaenderOptions() {
    return laender.map(land => ({
        value: land, label: land
    }));
}