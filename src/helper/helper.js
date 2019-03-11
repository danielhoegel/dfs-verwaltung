import React from 'react';

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

export function isDate(dateString) {
    const pattern = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/; // YYYY-MM-DD
    return typeof dateString === 'string' && dateString.match(pattern);
}

export function formatDate(date, type = 'de') {
    if (date) {
        const dateObject = new Date(date);
        switch (type) {
            case 'de':
                return dateObject.toLocaleDateString('de', { day: '2-digit', month: '2-digit', year: 'numeric'})
            case 'us':
                return dateObject.toISOString.slice(0, 10);
            default:
                return date;
        }
    } else {
        return <i>kein Datum</i>;
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

export const studyStatusList = [
    { id: 0, value: 'Beworben' },
    { id: 1, value: 'Aktiv'},
    { id: 2, value: 'Abgeschlossen'},
    { id: 3, value: 'Abgebrochen'},
    { id: 4, value: 'Unterbrochen'}
];

/**
 * Translate study status into title
 * @param {string} studyStatus 
 */
export function translateStudyStatus(statusId) {
    const status = studyStatusList.find(({ id }) => id === statusId);
    return status ? status.value : statusId;
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
    // console.log('changeNestedObject', { key: keys[index], obj, isNaN: isNaN(keys[index])});
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

export function getLastYears(number) {
    const thisYear = new Date().getFullYear();
    const years = [thisYear];
    for (let i = 1; i < number; i++) {
         years.push(thisYear - i);
    }
    return years;
}

export const laender = ['Afghanistan', 'Ägypten', 'Aland', 'Albanien', 'Algerien', 'Amerikanisch-Samoa', 'Amerikanische Jungferninseln', 'Andorra', 'Angola', 'Anguilla', 'Antarktis', 'Antigua und Barbuda', 'Äquatorialguinea', 'Argentinien', 'Armenien', 'Aruba', 'Ascension', 'Aserbaidschan', 'Äthiopien', 'Australien', 'Bahamas', 'Bahrain', 'Bangladesch', 'Barbados', 'Belgien', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivien', 'Bosnien und Herzegowina', 'Botswana', 'Bouvetinsel', 'Brasilien', 'Brunei', 'Bulgarien', 'Burkina Faso', 'Burundi', 'Chile', 'China', 'Cookinseln', 'Costa Rica', 'Cote d\'Ivoire', 'Dänemark', 'Deutschland', 'Diego Garcia', 'Dominica', 'Dominikanische Republik', 'Dschibuti', 'Ecuador', 'El Salvador', 'Eritrea', 'Estland', 'Europäische Union', 'Falklandinseln', 'Färöer', 'Fidschi', 'Finnland', 'Frankreich', 'Französisch-Guayana', 'Französisch-Polynesien', 'Gabun', 'Gambia', 'Georgien', 'Ghana', 'Gibraltar', 'Grenada', 'Griechenland', 'Grönland', 'Großbritannien', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard und McDonaldinseln', 'Honduras', 'Hongkong', 'Indien', 'Indonesien', 'Irak', 'Iran', 'Irland', 'Island', 'Israel', 'Italien', 'Jamaika', 'Japan', 'Jemen', 'Jersey', 'Jordanien', 'Kaimaninseln', 'Kambodscha', 'Kamerun', 'Kanada', 'Kanarische Inseln', 'Kap Verde', 'Kasachstan', 'Katar', 'Kenia', 'Kirgisistan', 'Kiribati', 'Kokosinseln', 'Kolumbien', 'Komoren', 'Kongo', 'Kroatien', 'Kuba', 'Kuwait', 'Laos', 'Lesotho', 'Lettland', 'Libanon', 'Liberia', 'Libyen', 'Liechtenstein', 'Litauen', 'Luxemburg', 'Macao', 'Madagaskar', 'Malawi', 'Malaysia', 'Malediven', 'Mali', 'Malta', 'Marokko', 'Marshallinseln', 'Martinique', 'Mauretanien', 'Mauritius', 'Mayotte', 'Mazedonien', 'Mexiko', 'Mikronesien', 'Moldawien', 'Monaco', 'Mongolei', 'Montserrat', 'Mosambik', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Neukaledonien', 'Neuseeland', 'Neutrale Zone', 'Nicaragua', 'Niederlande', 'Niederländische Antillen', 'Niger', 'Nigeria', 'Niue', 'Nordkorea', 'Nördliche Marianen', 'Norfolkinsel', 'Norwegen', 'Oman', 'Österreich', 'Pakistan', 'Palästina', 'Palau', 'Panama', 'Papua-Neuguinea', 'Paraguay', 'Peru', 'Philippinen', 'Pitcairninseln', 'Polen', 'Portugal', 'Puerto Rico', 'Réunion', 'Ruanda', 'Rumänien', 'Russische Föderation', 'Salomonen', 'Sambia', 'Samoa', 'San Marino', 'São Tomé und Príncipe', 'Saudi-Arabien', 'Schweden', 'Schweiz', 'Senegal', 'Serbien und Montenegro', 'Seychellen', 'Sierra Leone', 'Simbabwe', 'Singapur', 'Slowakei', 'Slowenien', 'Somalia', 'Spanien', 'Sri Lanka', 'St. Helena', 'St. Kitts und Nevis', 'St. Lucia', 'St. Pierre und Miquelon', 'St. Vincent/Grenadinen (GB)', 'Südafrika, Republik', 'Sudan', 'Südkorea', 'Suriname', 'Svalbard und Jan Mayen', 'Swasiland', 'Syrien', 'Tadschikistan', 'Taiwan', 'Tansania', 'Thailand', 'Timor-Leste', 'Togo', 'Tokelau', 'Tonga', 'Trinidad und Tobago', 'Tristan da Cunha', 'Tschad', 'Tschechische Republik', 'Tunesien', 'Türkei', 'Turkmenistan', 'Turks- und Caicosinseln', 'Tuvalu', 'Uganda', 'Ukraine', 'Ungarn', 'Uruguay', 'Usbekistan', 'Vanuatu', 'Vatikanstadt', 'Venezuela', 'Vereinigte Arabische Emirate', 'Vereinigte Staaten von Amerika', 'Vietnam', 'Wallis und Futuna', 'Weihnachtsinsel', 'Weißrussland', 'Westsahara', 'Zentralafrikanische Republik', 'Zypern'];
export function generateLaenderOptions() {
    return laender.map(land => ({
        value: land, label: land
    }));
}

/**
 * forEach
 * @param {array} array 
 * @param {function} callback 
 */
export function forEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        callback(array[index], index, array)
    }
};

/**
 * map
 * @param {array} array 
 * @param {function} callback 
 */
export function map(array, callback) {
    const nextArray = [];
    forEach(array, function(item, index, array) {
        nextArray.push(callback(item, index, array))
    })
    return nextArray;
};

/**
 * filter
 * @param {array} array 
 * @param {function} callback 
 */
export function filter(array, callback) {
    const nextArray = [];
    forEach(array, function(item, index, array) {
        if (callback(item, index, array)) {
            nextArray.push(item)
        }
    })
    return nextArray;
};

/**
 * filter and map
 * @param {array} array 
 * @param {function} filterCallback 
 * @param {function} mapCallback 
 */
export function filterAndMap(array, filterCallback, mapCallback) {
    const nextArray = [];
    forEach(array, function(item, index, array) {
        if (filterCallback(item, index, array)) {
            nextArray.push(mapCallback((item, index, array)))
        }
    });
    return nextArray;
};

/**
 * map and filter
 * @param {array} array 
 * @param {function} mapCallback 
 * @param {function} filterCallback 
 */
export function mapAndFilter(array, mapCallback, filterCallback) {
    const nextArray = [];
    forEach(array, function(item, index, array) {
        const nextItem = mapCallback(item, index, array);
        if (filterCallback(nextItem, index, array)) {
            nextArray.push(nextItem);
        }
    });
    return nextArray;
};

/**
 * Create a new textarea and copy its value
 * Source: https://stackoverflow.com/a/30810322
 * @param {string|number} value
 */
export function copyToClipboard(value) {
    // create textarea
    const textArea = document.createElement('textarea');

    // styling
    // 1px / 1em doesn't work as this gives a negative w/h on some browsers.
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';

    // set value, append, focus and select textarea
    textArea.value = value;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
    } catch (err) {
        window.prompt('Kopiere den Text: Strg+C, Enter', value);
    }
    
    document.body.removeChild(textArea);
};

/**
 * Groups an array of objects by a key from the object 
 * @param {array} items Array of objects
 * @param {string} key Property of the objects
 * @returns {object} Returns an object with the values of the key as keys
 */
export function groupItemsByKey(items, key) {
    const groupedItems = {};
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const groupName = item[key];
        if (groupedItems[groupName]) {
            groupedItems[groupName].push(item);
        } else {
            groupedItems[groupName] = [item];
        }
    }
    return groupedItems;
}
