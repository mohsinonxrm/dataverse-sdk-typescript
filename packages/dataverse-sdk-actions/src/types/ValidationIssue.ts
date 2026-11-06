import type { Component } from "./Component.js";
import type { ErrorType } from "./ErrorType.js";

/**
 * ValidationIssue complex type
 */
export interface ValidationIssue {
  ErrorType?: ErrorType;
  Message?: string;
  DisplayName?: string;
  ComponentId?: string;
  ComponentType?: number;
  ComponentSubType?: number;
  ParentEntityId?: string;
  ParentEntityName?: string;
  RequiredComponents?: Component[];
  CRMErrorCode?: number;
}
