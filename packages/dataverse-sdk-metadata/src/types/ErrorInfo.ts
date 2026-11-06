import type { ResourceInfo } from "./ResourceInfo.js";

/**
 * ErrorInfo
 */
export interface ErrorInfo {
  ErrorCode?: string;
  ResourceList?: ResourceInfo[];
}
