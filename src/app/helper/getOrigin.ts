/**
 * Retrieves the origin of the current URL.
 *
 * @return {string} The origin of the current URL.
 */
export function getOrigin(): string {
    const currentUrl = window.location.href
    return new URL(currentUrl).origin
}
