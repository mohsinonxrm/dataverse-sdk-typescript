import type { XrmAggregateType } from "./XrmAggregateType.js";
import type { XrmDateTimeGrouping } from "./XrmDateTimeGrouping.js";

/**
 * XrmAttributeExpression complex type
 */
export interface XrmAttributeExpression {
  AggregateType?: XrmAggregateType;
  Alias?: string;
  AttributeName?: string;
  DateTimeGrouping?: XrmDateTimeGrouping;
  HasGroupBy?: boolean;
}
