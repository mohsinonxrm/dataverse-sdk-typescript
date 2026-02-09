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

  // Check segment lengths
  const segments = url.split("/").filter((s) => s.length > 0);
  const maxSegmentLength = Math.max(...segments.map((s) => s.length));

  if (maxSegmentLength > URL_LIMITS.MAX_SEGMENT_LENGTH) {
    const error = `URL segment exceeds maximum length of ${String(URL_LIMITS.MAX_SEGMENT_LENGTH)} characters (actual: ${String(maxSegmentLength)}). Consider shortening filter expressions or entity set names.`;

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
