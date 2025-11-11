/**
 * Decodes Base64 string to text string.
 * Returns original value if decode fails or decoded result is not printable text.
 */
export function decodeBase64Text(value: string): string {
  try {
    const decoded = Buffer.from(value, 'base64').toString('utf-8');
    // Check if decoded result is printable text (Tab, Newline, Carriage return, Printable ASCII, Unicode)
    if (/^[\t\n\r\x20-\x7E\xA0-\uFFFF]*$/.test(decoded)) {
      return decoded;
    }
    return value;
  } catch {
    return value;
  }
}

/**
 * Encodes text string to Base64 string.
 * @throws Error if encode fails
 */
export function encodeTextBase64(value: string): string {
  try {
    return Buffer.from(value, 'utf-8').toString('base64');
  } catch {
    throw new Error('encode base64 failed');
  }
}

export default {
  decodeBase64Text,
  encodeTextBase64,
};
