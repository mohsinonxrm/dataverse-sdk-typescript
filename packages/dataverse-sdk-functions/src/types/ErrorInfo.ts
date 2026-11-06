import type { ResourceInfo } from './ResourceInfo.js';

/**
 * ErrorInfo complex type
 */
export interface ErrorInfo {
  ErrorCode?: string;
  ResourceList?: ResourceInfo[];
}
