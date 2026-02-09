import type { ViewColumn } from "./ViewColumn.js";

/**
 * LookupView
 */
export interface LookupView {
  ViewId?: string;
  ViewName?: string;
  Columns?: ViewColumn[];
  FetchXml?: string;
  LayoutJson?: string;
}
