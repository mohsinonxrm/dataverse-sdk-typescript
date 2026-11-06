/**
 * OrganizationType
 *
 * The Web API reads and writes enum members by name (`"Customer"`), never by number,
 * so this is a string union. `OrganizationType.Customer` is the name; each member's comment
 * gives its numeric value.
 */
export const OrganizationType = {
  /** 0 */
  Customer: "Customer",
  /** 1 */
  Monitoring: "Monitoring",
  /** 2 */
  Support: "Support",
  /** 3 */
  BackEnd: "BackEnd",
  /** 4 */
  Secondary: "Secondary",
  /** 5 */
  CustomerTest: "CustomerTest",
  /** 6 */
  CustomerFreeTest: "CustomerFreeTest",
  /** 7 */
  CustomerPreview: "CustomerPreview",
  /** 8 */
  Placeholder: "Placeholder",
  /** 9 */
  TestDrive: "TestDrive",
  /** 10 */
  MsftInvestigation: "MsftInvestigation",
  /** 11 */
  EmailTrial: "EmailTrial",
  /** 12 */
  Default: "Default",
  /** 13 */
  Developer: "Developer",
  /** 14 */
  Trial: "Trial",
  /** 15 */
  Teams: "Teams",
  /** 16 */
  Platform: "Platform",
} as const;

export type OrganizationType = (typeof OrganizationType)[keyof typeof OrganizationType];
