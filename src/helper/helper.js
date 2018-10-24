export function isEmpty(value) {
    if (value === null || value === undefined) {
        return true;
    }

    switch (typeof value) {
        case 'string': return !value;
        case 'number': return !value && value !== 0;
        case 'object':
            switch (value.__proto__) {
                case String.prototype: return !value;
                case Number.prototype: return !value && value !== 0;
                case Array.prototype: return !value || value.length === 0;
                case Object.prototype: return !value || Object.keys(value).length === 0;
                default: return !value;
        }
        default: return !value;
    }
}

export function isNotEmpty(value) {
    return !isEmpty(value);
}

export function formatDate(date, type = 'de') {
    const dateObject = new Date(date);
    switch (type) {
        case 'de':
            return dateObject.toLocaleDateString('de', { day: '2-digit', month: '2-digit', year: 'numeric'})
        
        case 'us':
            return dateObject.toISOString.slice(0, 10);
        
        default:
            return date;
    }
}

/**
 * Return wheather the needle is found inside the heystack (case insensitiv)
 * @param {string} haystack String to search in
 * @param {string} needle String to search for
 */
export function stringsMatch(haystack, needle) {
    return String(haystack).toLowerCase().indexOf(String(needle).toLowerCase()) !== -1;
};


/**
 * Highlight searchValue inside string
 * @param {string} string String to search in. e.g. 'Hello'
 * @param {string} searchValue String to search for, e.g. 'el'
 * @param {string} [highlightTag = 'strong'] HTML-Tagname for the highlighting
 * @returns {string} string with highlighted part, e.g. 'H<strong>el</strong>lo'
 */
export function highlightMatch(string, searchValue, highlightTag = 'strong') {
    if (searchValue.length > 0) {
        const searchWords = searchValue.split(' ');
        const stringWords = string.split(' ');
        
        const outputWords = stringWords.map(stringWord => {
            let outputWord = stringWord;
            for (let i = 0; i < searchWords.length; i++) {
                const searchWord = searchWords[i];
                const startIndex = stringWord.toLowerCase().indexOf(searchWord.toLowerCase());
               
                if (startIndex !== -1) {
                    const matchingPart = stringWord.slice(startIndex, startIndex + searchWord.length);
                    const beforePart = stringWord.slice(0, startIndex);
                    const afterPart = stringWord.slice(startIndex + searchWord.length);
                    
                    outputWord = `${beforePart}<${highlightTag}>${matchingPart}</${highlightTag}>${afterPart}`;
                    break;
                }
            }
            return outputWord;
        });

        return outputWords.join(' ');
    }
    return{string};
}


/**
 * Translate studienkurs id into name
 * @param {string} studienkurs 
 */
export function translateStudienkurse(studienkurs) {
    switch (Number(studienkurs)) {
        case 1: return 'Grundstudienkurs';
        case 2: return 'Aufbaustudienkurs';
        default: return studienkurs;
    }
}

/**
 * Translate study status into title
 * @param {string} studyStatus 
 */
export function translateStudyStatus(studyStatus) {
    switch (studyStatus) {
        case 0: return 'Beworben';
        case 1: return 'Aktiv';
        case 2: return 'Abgeschlossen';
        case 3: return 'Abgebrochen';
        default: return studyStatus;
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

/**
 * Return a new object with the changed value behind the path of keys
 * @param {array} keys path of keys to the value
 * @param {object} obj object at the current index
 * @param {number|string} value updated value
 * @param {number} index current position inside the keys path
 */
export function changeNestedObject(keys, value, obj, index = 0) {
    console.log('changeNestedObject', { key: keys[index], obj, isNaN: isNaN(keys[index])});
    const key = keys[index];
    if (isNaN(key)) {
        // return new object
        return {
            ...obj,
            [key]: (index === keys.length -1)
                ? value
                : changeNestedObject(keys, value, obj[key], index + 1)
        };
    } else {
        // return new array
        const nextArray = obj;
        nextArray[key] = (index === keys.length -1)
            ? value
            : changeNestedObject(keys, value, obj[key], index + 1);
        return nextArray;
    }
}

export function removeByIndex(array, index) {
    if (index === 0) {
        return array.slice(1);
    } else if (index === array.length - 1) {
        return array.slice(0, -1);
    } else {
        return array.slice(0, index).concat(array.slice(index + 1));
    }
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