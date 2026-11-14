/**
 * ErrorType enum
 */
export const ErrorType = {
  Error: 1,
  Warning: 2,
} as const;

export type ErrorType = (typeof ErrorType)[keyof typeof ErrorType];
