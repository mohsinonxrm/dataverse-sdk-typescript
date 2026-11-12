/**
 * Dataverse error codes the SDK knows, by Dataverse's name for them (the service protection codes
 * by the limit they name). `DataverseError.code` holds one of these, or any other code Dataverse
 * returns. Compare with `hasErrorCode()`, which ignores case and also accepts the signed decimal
 * form (`"-2147220685"`) that some responses carry.
 *
 * Dataverse has thousands of codes, and adds more; see
 * https://learn.microsoft.com/power-apps/developer/data-platform/reference/web-service-error-codes.
 *
 * @example
 * ```typescript
 * try {
 *   await client.api(`accounts(${id})`).get();
 * } catch (err) {
 *   if (hasErrorCode(err, DataverseErrorCode.ObjectDoesNotExist)) return undefined;
 *   throw err;
 * }
 * ```
 */
export const DataverseErrorCode = {
  /** `ObjectDoesNotExist`: "The specified object was not found." (404) */
  ObjectDoesNotExist: "0x80040217",
  /**
   * `DuplicateRecordsFound`: a duplicate detection rule matched (412, with `detectDuplicates()`).
   * The SDK throws `DataverseDuplicateError` for it.
   */
  DuplicateRecordsFound: "0x80040333",
  /**
   * `ExpiredVersionStamp`: a change-tracking delta link is older than the org keeps changes.
   * `isDeltaLinkExpired()` checks for it.
   */
  ExpiredVersionStamp: "0x80044352",
  /** `ConcurrencyVersionMismatch`: an `If-Match` etag no longer matches the row (412). */
  ConcurrencyVersionMismatch: "0x80060882",
  /** Service protection: number of requests in the 5-minute window (429). */
  ServiceProtectionRequests: "0x80072322",
  /** Service protection: combined execution time in the 5-minute window (429). */
  ServiceProtectionExecutionTime: "0x80072321",
  /** Service protection: concurrent requests (429). */
  ServiceProtectionConcurrentRequests: "0x80072326",
  /**
   * `UploadingAndDownloadingInMultipleChunksNotSupported`: the file is stored where it can't be
   * read or written in parts (on-premises, or an environment with a self-managed key).
   */
  UploadingAndDownloadingInMultipleChunksNotSupported: "0x80090017",
} as const;

/** A Dataverse error code the SDK knows; see the `DataverseErrorCode` object. */
export type DataverseErrorCode = (typeof DataverseErrorCode)[keyof typeof DataverseErrorCode];

/**
 * Whether `error` has the Dataverse error code `code`. `error` is an error (its `code` is read:
 * any `DataverseError`, or another object with a string `code`) or the code itself. Hex codes
 * compare without regard to case (`"0x8004431A"` matches `"0x8004431a"`), and a signed decimal
 * code (`"-2147220685"`) matches its hex form (`"0x80040333"`).
 */
export function hasErrorCode(error: unknown, code: DataverseErrorCode | (string & {})): boolean {
  const actual =
    typeof error === "string"
      ? error
      : typeof error === "object" && error !== null
        ? (error as { code?: unknown }).code
        : undefined;
  return typeof actual === "string" && normalizeCode(actual) === normalizeCode(code);
}

/** A hex code lower-cased, or a signed decimal code as its 8-digit hex form. */
function normalizeCode(code: string): string {
  return /^-?\d+$/.test(code)
    ? `0x${(Number(code) >>> 0).toString(16).padStart(8, "0")}`
    : code.toLowerCase();
}
