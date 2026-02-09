import type { XrmAggregateType } from "./XrmAggregateType.js";
import type { XrmDateTimeGrouping } from "./XrmDateTimeGrouping.js";

/**
 * XrmAttributeExpression complex type
 */
export interface XrmAttributeExpression {
  AttributeName: string;
  AggregateType: XrmAggregateType;
  Alias: string;
  HasGroupBy: boolean;
  DateTimeGrouping: XrmDateTimeGrouping;
}
