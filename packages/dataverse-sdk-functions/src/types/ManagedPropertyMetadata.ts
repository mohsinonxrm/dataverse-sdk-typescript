import type { Label } from "./Label.js";
import type { ManagedPropertyEvaluationPriority } from "./ManagedPropertyEvaluationPriority.js";
import type { ManagedPropertyOperation } from "./ManagedPropertyOperation.js";
import type { ManagedPropertyType } from "./ManagedPropertyType.js";
import type { MetadataBase } from "./MetadataBase.js";

/**
 * ManagedPropertyMetadata entity type
 */
export interface ManagedPropertyMetadata extends MetadataBase {
  Description?: Label;
  DisplayName?: Label;
  EnablesAttributeName?: string;
  EnablesEntityName?: string;
  ErrorCode?: number;
  EvaluationPriority?: ManagedPropertyEvaluationPriority;
  IntroducedVersion?: string;
  IsGlobalForOperation?: boolean;
  IsPrivate?: boolean;
  LogicalName?: string;
  ManagedPropertyType?: ManagedPropertyType;
  Operation?: ManagedPropertyOperation;
}
