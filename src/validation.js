/**
 * Validates if the provided name contains only letters and spaces.
 *
 * @param {HTMLElement} text - Name to be validated.
 * @returns {boolean} True if the name is valid, false otherwise.
 */
export function validateString(text) {
    const textRegex = /^[A-Za-z\s]+$/;
    return textRegex.test(text);
}

/**
 * Validates if the provided phone contains only numbers.
 *
 * @param {string} number - number to be validated.
 * @returns {boolean} True if the number is valid, false otherwise.
 */
export function validateNumber(number) {
    const numberRegex = /^[0-9]+$/;
    return numberRegex.test(number);
}
