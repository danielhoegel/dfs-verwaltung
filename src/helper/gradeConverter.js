/* eslint-disable no-console */
/* eslint-disable no-multi-spaces */
/* eslint-disable yoda */

export function convertFrToDe(grade) {
    if (0 <= grade && grade <= 20) {
        if (grade < 5)    return 0;
        if (grade < 6.66) return 1;
        if (grade < 8.33) return 2;
        if (grade < 10)   return 3;
        if (grade < 10.5) return 4;
        if (grade < 11)   return 5;
        if (grade < 11.5) return 6;
        if (grade < 12)   return 7;
        if (grade < 12.5) return 8;
        if (grade < 13)   return 9;
        if (grade < 13.5) return 10;
        if (grade < 14)   return 11;
        if (grade < 14.5) return 12;
        if (grade < 15)   return 13;
        if (grade < 15.5) return 14;
        if (grade < 16)   return 15;
        if (grade < 17)   return 16;
        if (grade < 18)   return 17;
        return 18;
    }
    console.warn('Franz. Note liegt nicht zwischen 0 und 20:', grade);
    return grade;
}

export function convertDeToFr(grade) {
    switch (grade) {
        case 0: return 0;
        case 1: return 5;
        case 2: return 6.66;
        case 3: return 8.33;
        case 4: return 10;
        case 5: return 10.5;
        case 6: return 11;
        case 7: return 11.5;
        case 8: return 12;
        case 9: return 12.5;
        case 10: return 13;
        case 11: return 13.5;
        case 12: return 14;
        case 13: return 14.5;
        case 14: return 15;
        case 15: return 15.5;
        case 16: return 16;
        case 17: return 17;
        case 18: return 18;
        default:
            console.warn('Dt. Note liegt nicht zwischen 0 und 18:', grade);
            return grade;
    }
}

export function convertGrade(grade, target) {
    return target === 'de' ? convertFrToDe(grade) : convertDeToFr(grade);
}

export function generateGradeString(grade, gradingSystem) {
    return gradingSystem === 'de' ? `${grade} / 18 Pkt.` : `${grade} / 20 Pkt.`;
}

export function formatGrade(note, target) {
    if (
        (note.gradingSystem === 'de' && target === 'de') ||
        (note.gradingSystem === 'fr' && target === 'fr')
    ) {
        return generateGradeString(note.grade, target);
    }
    const convertedGrade = convertGrade(note.grade, target);
    return generateGradeString(convertedGrade, target);
}
