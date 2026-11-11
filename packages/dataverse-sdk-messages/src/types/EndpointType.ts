/**
 * EndpointType enum
 */
export const EndpointType = {
  OrganizationService: 0,
  OrganizationDataService: 1,
  WebApplication: 2,
} as const;

export type EndpointType = (typeof EndpointType)[keyof typeof EndpointType];
