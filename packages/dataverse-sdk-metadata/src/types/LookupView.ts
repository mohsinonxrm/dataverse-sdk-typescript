import type { ViewColumn } from "./ViewColumn.js";

/**
 * LookupView
 */
export interface LookupView {
  Columns?: ViewColumn[];
  FetchXml?: string;
  LayoutJson?: string;
  ViewId?: string;
  ViewName?: string;
}
