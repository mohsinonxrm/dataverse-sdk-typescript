/**
 * ProvisionLanguageForUserStatusType
 *
 * The Web API reads and writes enum members by name (`"Queued"`), never by number,
 * so this is a string union. `ProvisionLanguageForUserStatusType.Queued` is the name; each member's comment
 * gives its numeric value.
 */
export const ProvisionLanguageForUserStatusType = {
  /** 0 */
  Queued: "Queued",
  /** 1 */
  Completed: "Completed",
  /** 2 */
  Skipped: "Skipped",
} as const;

export type ProvisionLanguageForUserStatusType =
  (typeof ProvisionLanguageForUserStatusType)[keyof typeof ProvisionLanguageForUserStatusType];
