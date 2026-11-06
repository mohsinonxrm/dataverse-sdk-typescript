/**
 * AttributeTypeCode
 *
 * The Web API reads and writes enum members by name (`"Boolean"`), never by number,
 * so this is a string union. `AttributeTypeCode.Boolean` is the name; each member's comment
 * gives its numeric value.
 */
export const AttributeTypeCode = {
  /** 0 */
  Boolean: "Boolean",
  /** 1 */
  Customer: "Customer",
  /** 2 */
  DateTime: "DateTime",
  /** 3 */
  Decimal: "Decimal",
  /** 4 */
  Double: "Double",
  /** 5 */
  Integer: "Integer",
  /** 6 */
  Lookup: "Lookup",
  /** 7 */
  Memo: "Memo",
  /** 8 */
  Money: "Money",
  /** 9 */
  Owner: "Owner",
  /** 10 */
  PartyList: "PartyList",
  /** 11 */
  Picklist: "Picklist",
  /** 12 */
  State: "State",
  /** 13 */
  Status: "Status",
  /** 14 */
  String: "String",
  /** 15 */
  Uniqueidentifier: "Uniqueidentifier",
  /** 16 */
  CalendarRules: "CalendarRules",
  /** 17 */
  Virtual: "Virtual",
  /** 18 */
  BigInt: "BigInt",
  /** 19 */
  ManagedProperty: "ManagedProperty",
  /** 20 */
  EntityName: "EntityName",
} as const;

export type AttributeTypeCode = (typeof AttributeTypeCode)[keyof typeof AttributeTypeCode];
