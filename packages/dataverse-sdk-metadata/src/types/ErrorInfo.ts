import type { ResourceInfo } from "./ResourceInfo.js";

/**
 * ErrorInfo
 */
export interface ErrorInfo {
  ResourceList?: ResourceInfo[];
  ErrorCode?: string;
}
