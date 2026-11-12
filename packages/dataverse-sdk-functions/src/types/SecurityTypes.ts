/**
 * SecurityTypes enum
 *
 * A flags enum: combine members with `|`, so the type is `number`.
 */
export const SecurityTypes = {
  None: 0,
  Append: 1,
  ParentChild: 2,
  Pointer: 4,
  Inheritance: 8,
} as const;

export type SecurityTypes = number;
