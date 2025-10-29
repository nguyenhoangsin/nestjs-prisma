/** Validates if a string is a valid Base64 format. */
export function isValidBase64(value: string): boolean {
  const cleanValue = value.replace(/\s/g, '');
  const regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
  return regex.test(cleanValue);
}

/** Validates if decoded string contains only printable characters and allowed whitespace. */
export function isValidPrintableText(decoded: string): boolean {
  return Array.from(decoded).every(char => {
    const code = char.charCodeAt(0);
    return (
      code === 9 ||
      code === 10 ||
      code === 13 ||
      (code >= 32 && code <= 126) ||
      (code >= 160 && code <= 0xffff)
    );
  });
}

/**
 * Decodes Base64 string to text string.
 * @throws Error if decode fails
 */
export function decodeBase64Text(value: string): string {
  const cleanValue = value.replace(/\s/g, '');

  if (!isValidBase64(cleanValue)) {
    return value;
  }

  try {
    const decoded = Buffer.from(cleanValue, 'base64').toString('utf-8');

    if (!isValidPrintableText(decoded)) {
      throw new Error('decoded base64 contains non-printable characters');
    }

    return decoded;
  } catch {
    throw new Error('decode base64 failed');
  }
}

/**
 * Encodes text string to Base64 string.
 * @throws Error if encode fails
 */
export function encodeTextBase64(value: string): string {
  try {
    // Use native btoa for simple ASCII strings (most common case)
    if (/^[\x20-\x7E]*$/.test(value)) {
      return btoa(value);
    }

    // For Unicode strings, use TextEncoder + manual base64 encoding
    const encoder = new TextEncoder();
    const data = encoder.encode(value);

    // For large data, process in chunks to avoid stack overflow
    if (data.length > 100000) {
      // 100KB threshold - use chunked approach
      const chunkSize = 8192; // Process in 8KB chunks
      let result = '';

      for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);
        result += btoa(String.fromCharCode(...chunk));
      }

      return result;
    }

    // For smaller Unicode data, use direct conversion
    return btoa(String.fromCharCode(...data));
  } catch {
    throw new Error('encode base64 failed');
  }
}

export default {
  isValidBase64,
  isValidPrintableText,
  decodeBase64Text,
  encodeTextBase64,
};
