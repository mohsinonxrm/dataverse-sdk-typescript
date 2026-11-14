/**
 * PropagationOwnershipOptions enum
 */
export const PropagationOwnershipOptions = {
  None: 0,
  Caller: 1,
  ListMemberOwner: 2,
} as const;

export type PropagationOwnershipOptions =
  (typeof PropagationOwnershipOptions)[keyof typeof PropagationOwnershipOptions];
