import type { FetchExpression } from "./FetchExpression.js";
import type { QueryByAttribute } from "./QueryByAttribute.js";
import type { QueryExpression } from "./QueryExpression.js";

/**
 * QueryBase complex type
 */
export interface QueryBase {
  // No properties defined
}

/**
 * A QueryBase value: one of the concrete types below, with the `@odata.type` that tells
 * Dataverse which one it is.
 */
export type TypedQueryBase =
  | (FetchExpression & { "@odata.type": "Microsoft.Dynamics.CRM.FetchExpression" })
  | (QueryByAttribute & { "@odata.type": "Microsoft.Dynamics.CRM.QueryByAttribute" })
  | (QueryExpression & { "@odata.type": "Microsoft.Dynamics.CRM.QueryExpression" });
