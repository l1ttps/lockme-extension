/**
 * Converts a camel case string to a human readable string by inserting spaces before capital letters and capitalizing the first letter.
 *
 * @param {string} camelCaseString - The camel case string to be converted.
 * @return {string} The human readable version of the camel case string.
 */
export default function convertCamelCaseToHumanReadable(camelCaseString: string) {
    // Use a regular expression to insert spaces before capital letters
    let spacedString = camelCaseString.replace(/([a-z])([A-Z])/g, '$1 $2');

    // Capitalize the first letter of the result
    spacedString = spacedString.charAt(0).toUpperCase() + spacedString.slice(1);

    return spacedString;
}