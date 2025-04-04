/**
 * Decodes a base64 string to its original form
 * @param base64String - The base64 encoded string to decode
 * @returns The decoded string or null if decoding fails
 */
export function decodeBase64(base64String: string): string | null {
  try {
    // Remove any whitespace and validate base64 string
    const cleanString = base64String.trim().replace(/\s/g, '');

    // Check if the string is valid base64
    if (!/^[A-Za-z0-9+/]*={0,2}$/.test(cleanString)) {
      return null;
    }

    // Decode the base64 string
    const decodedString = Buffer.from(cleanString, 'base64').toString('utf-8');
    return decodedString;
  } catch (error) {
    console.error('Error decoding base64:', error);
    return null;
  }
}

/**
 * Decodes a base64 string to a JSON object
 * @param base64String - The base64 encoded JSON string to decode
 * @returns The decoded JSON object or null if decoding fails
 */
export function decodeBase64JSON<T>(base64String: string): T | null {
  try {
    const decodedString = decodeBase64(base64String);
    if (!decodedString) return null;

    return JSON.parse(decodedString) as T;
  } catch (error) {
    console.error('Error decoding base64 JSON:', error);
    return null;
  }
}
