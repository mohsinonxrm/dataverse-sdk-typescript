import type { Label } from "./Label.js";
import type { ManagedPropertyEvaluationPriority } from "./ManagedPropertyEvaluationPriority.js";
import type { ManagedPropertyOperation } from "./ManagedPropertyOperation.js";
import type { ManagedPropertyType } from "./ManagedPropertyType.js";
import type { MetadataBase } from "./MetadataBase.js";

/**
 * ManagedPropertyMetadata
 * Extends: MetadataBase
 */
export interface ManagedPropertyMetadata extends MetadataBase {
  LogicalName?: string;
  DisplayName?: Label;
  ManagedPropertyType?: ManagedPropertyType;
  Operation?: ManagedPropertyOperation;
  IsGlobalForOperation?: boolean;
  EvaluationPriority?: ManagedPropertyEvaluationPriority;
  IsPrivate?: boolean;
  ErrorCode?: number;
  EnablesEntityName?: string;
  EnablesAttributeName?: string;
  Description?: Label;
  IntroducedVersion?: string;
}
