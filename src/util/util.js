/* @flow */

export function abilityOrAbilities(abilities : Array<any>) {
    if (abilities.length > 1) {
        return 'Abilities';
    }
    return 'Ability';
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatString(string : string) {
    const hyphenIndex = string.search('-');
    if (hyphenIndex !== -1) {
        const stringWithSpaces = string.replace(/-/g, ' ');
        const substrings = stringWithSpaces.split(' ');
        substrings.forEach((element, index) => {
            substrings[index] = capitalizeFirstLetter(substrings[index]);
        });
        return substrings.join(' ');
    }
    return capitalizeFirstLetter(string);
}
