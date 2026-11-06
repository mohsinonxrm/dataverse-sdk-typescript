import type { Component } from './Component.js';
import type { ErrorType } from './ErrorType.js';

/**
 * ValidationIssue complex type
 */
export interface ValidationIssue {
  CRMErrorCode?: number;
  ComponentId?: string;
  ComponentSubType?: number;
  ComponentType?: number;
  DisplayName?: string;
  ErrorType?: ErrorType;
  Message?: string;
  ParentEntityId?: string;
  ParentEntityName?: string;
  RequiredComponents?: Component[];
}
