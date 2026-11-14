/**
 * TargetFieldType enum
 */
export const TargetFieldType = {
  All: 0,
  ValidForCreate: 1,
  ValidForUpdate: 2,
  ValidForRead: 3,
} as const;

export type TargetFieldType = (typeof TargetFieldType)[keyof typeof TargetFieldType];
