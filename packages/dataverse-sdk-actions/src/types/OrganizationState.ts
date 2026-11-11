/**
 * OrganizationState enum
 */
export const OrganizationState = {
  Enabled: 0,
  Disabled: 1,
} as const;

export type OrganizationState = (typeof OrganizationState)[keyof typeof OrganizationState];
