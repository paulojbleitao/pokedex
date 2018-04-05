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
        string = string.replace(/-/g, ' ');
        let substrings = string.split(' ');
        substrings.forEach((element, index, substrings) => {
            substrings[index] = capitalizeFirstLetter(substrings[index])});
        return substrings.join(' ');
    } else {
        return capitalizeFirstLetter(string);
    }
}

