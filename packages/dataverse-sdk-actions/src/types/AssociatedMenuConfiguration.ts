import type { AssociatedMenuBehavior } from "./AssociatedMenuBehavior.js";
import type { AssociatedMenuGroup } from "./AssociatedMenuGroup.js";
import type { Label } from "./Label.js";

/**
 * AssociatedMenuConfiguration complex type
 */
export interface AssociatedMenuConfiguration {
  Behavior?: AssociatedMenuBehavior;
  Group?: AssociatedMenuGroup;
  Label?: Label;
  Order?: number;
  IsCustomizable?: boolean;
  Icon?: string;
  ViewId?: string;
  AvailableOffline?: boolean;
  MenuId?: string;
  QueryApi?: string;
}
