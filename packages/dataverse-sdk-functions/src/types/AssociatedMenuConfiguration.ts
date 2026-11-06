import type { AssociatedMenuBehavior } from './AssociatedMenuBehavior.js';
import type { AssociatedMenuGroup } from './AssociatedMenuGroup.js';
import type { Label } from './Label.js';

/**
 * AssociatedMenuConfiguration complex type
 */
export interface AssociatedMenuConfiguration {
  AvailableOffline?: boolean;
  Behavior?: AssociatedMenuBehavior;
  Group?: AssociatedMenuGroup;
  Icon?: string;
  IsCustomizable?: boolean;
  Label?: Label;
  MenuId?: string;
  Order?: number;
  QueryApi?: string;
  ViewId?: string;
}
