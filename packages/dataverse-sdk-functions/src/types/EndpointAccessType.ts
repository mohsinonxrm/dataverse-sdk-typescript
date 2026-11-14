/**
 * EndpointAccessType enum
 */
export const EndpointAccessType = {
  Default: 0,
  Internet: 1,
  Intranet: 2,
} as const;

export type EndpointAccessType = (typeof EndpointAccessType)[keyof typeof EndpointAccessType];
