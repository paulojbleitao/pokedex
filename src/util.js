export function abilityOrAbilities(abilities) {
    if (abilities.length > 1) {
        return "Abilities";
    } else {
        return "Ability";
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatString(string) {
    let hyphenIndex = string.search('-');
    if (hyphenIndex !== -1) {
        string = string.replace('-', ' ');
        let substrings = string.split(' ');
        return `${capitalizeFirstLetter(substrings[0])} ${capitalizeFirstLetter(substrings[1])}`;
    } else {
        return capitalizeFirstLetter(string);
    }
}

