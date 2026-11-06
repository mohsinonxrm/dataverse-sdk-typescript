import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_ecccatscoperule_ecccategory entity type
 */
export interface msdyn_ecccatscoperule_ecccategory {
  componentidunique?: string;
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  msdyn_ecccatscoperule_ecccategoryid?: string;
  msdyn_emailclassificationcategoryid?: string;
  msdyn_emailclassificationcategoryscoperuleid?: string;
  overwritetime?: string;
  solutionid?: string;
  versionnumber?: number;
}
