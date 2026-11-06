/**
 * EndpointType
 *
 * The Web API reads and writes enum members by name (`"OrganizationService"`), never by number,
 * so this is a string union. `EndpointType.OrganizationService` is the name; each member's comment
 * gives its numeric value.
 */
export const EndpointType = {
  /** 0 */
  OrganizationService: "OrganizationService",
  /** 1 */
  OrganizationDataService: "OrganizationDataService",
  /** 2 */
  WebApplication: "WebApplication",
} as const;

export type EndpointType = (typeof EndpointType)[keyof typeof EndpointType];
