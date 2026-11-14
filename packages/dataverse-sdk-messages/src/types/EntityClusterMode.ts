/**
 * EntityClusterMode enum
 */
export const EntityClusterMode = {
  Partitioned: 0,
  Replicated: 1,
  Local: 2,
  Inherited: 3,
} as const;

export type EntityClusterMode = (typeof EntityClusterMode)[keyof typeof EntityClusterMode];
