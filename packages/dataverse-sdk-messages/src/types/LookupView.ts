import type { ViewColumn } from "./ViewColumn.js";

/**
 * LookupView complex type
 */
export interface LookupView {
  Columns?: ViewColumn[];
  FetchXml?: string;
  LayoutJson?: string;
  ViewId?: string;
  ViewName?: string;
}
