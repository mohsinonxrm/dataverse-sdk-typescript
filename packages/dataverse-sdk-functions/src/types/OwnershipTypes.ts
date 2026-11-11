/**
 * OwnershipTypes enum
 *
 * A flags enum: combine members with `|`, so the type is `number`.
 */
export const OwnershipTypes = {
  None: 0,
  UserOwned: 1,
  TeamOwned: 2,
  BusinessOwned: 4,
  OrganizationOwned: 8,
  BusinessParented: 16,
  Filtered: 32,
} as const;

export type OwnershipTypes = number;
