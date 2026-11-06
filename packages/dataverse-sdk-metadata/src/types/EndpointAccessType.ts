/**
 * EndpointAccessType
 *
 * The Web API reads and writes enum members by name (`"Default"`), never by number,
 * so this is a string union. `EndpointAccessType.Default` is the name; each member's comment
 * gives its numeric value.
 */
export const EndpointAccessType = {
  /** 0 */
  Default: "Default",
  /** 1 */
  Internet: "Internet",
  /** 2 */
  Intranet: "Intranet",
} as const;

export type EndpointAccessType = (typeof EndpointAccessType)[keyof typeof EndpointAccessType];
