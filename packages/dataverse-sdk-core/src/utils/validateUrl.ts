import { DataverseUrlError } from "../errors/DataverseUrlError.js";

/**
 * Microsoft Dataverse URL limits
 * @see https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/query-data-web-api#web-api-url-length-limits
 */
export const URL_LIMITS = {
  /** Maximum total URL length (32KB) */
  MAX_URL_LENGTH: 32768,

  /** Maximum single URL segment length */
  MAX_SEGMENT_LENGTH: 260,
} as const;

export interface UrlValidationOptions {
  /** Skip validation (for edge cases) */
  skip?: boolean;

  /** Throw error or return validation result */
  throwOnError?: boolean;
}

export interface UrlValidationResult {
  valid: boolean;
  totalLength: number;
  maxSegmentLength: number;
  errors: string[];
}

/**
 * Validate URL against Microsoft Dataverse limits
 */
export function validateUrl(url: string, options: UrlValidationOptions = {}): UrlValidationResult {
  if (options.skip) {
    return {
      valid: true,
      totalLength: url.length,
      maxSegmentLength: 0,
      errors: [],
    };
  }

  const errors: string[] = [];
  const totalLength = url.length;

  // Check total length
  if (totalLength > URL_LIMITS.MAX_URL_LENGTH) {
    const error = `URL exceeds maximum length of ${String(URL_LIMITS.MAX_URL_LENGTH)} bytes (actual: ${String(totalLength)}). Consider using $filter with fewer conditions or POST-based query.`;

    if (options.throwOnError !== false) {
      throw new DataverseUrlError(error, totalLength, URL_LIMITS.MAX_URL_LENGTH, url);
    }

    errors.push(error);
  }

  // Check segment lengths. The 260-character limit (IIS UrlSegmentMaxLength) applies to path
  // segments only; the query string is not a segment, however long $filter or FetchXML gets.
  const segments = pathOf(url)
    .split("/")
    .filter((s) => s.length > 0)
    .map(decodeSegment);
  const maxSegmentLength = segments.reduce((max, s) => Math.max(max, s.length), 0);

  if (maxSegmentLength > URL_LIMITS.MAX_SEGMENT_LENGTH) {
    const error = `URL segment exceeds maximum length of ${String(URL_LIMITS.MAX_SEGMENT_LENGTH)} characters (actual: ${String(maxSegmentLength)}). Consider shortening entity set names or key values in the path.`;

    if (options.throwOnError !== false) {
      throw new DataverseUrlError(error, maxSegmentLength, URL_LIMITS.MAX_SEGMENT_LENGTH, url);
    }

    errors.push(error);
  }

  return {
    valid: errors.length === 0,
    totalLength,
    maxSegmentLength,
    errors,
  };
}

/** The path part of an absolute or relative URL, without query string or fragment. */
function pathOf(url: string): string {
  try {
    return new URL(url).pathname;
  } catch {
    const end = url.search(/[?#]/);
    return end === -1 ? url : url.slice(0, end);
  }
}

/** Measure a segment as written (e.g. `accounts(name='a b')`), not in its percent-encoded form. */
function decodeSegment(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}
