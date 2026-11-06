import type { ResourceInfo } from "./ResourceInfo.js";

/**
 * ErrorInfo complex type
 */
export interface ErrorInfo {
  ResourceList?: ResourceInfo[];
  ErrorCode?: string;
}
