/**
 * attribute entity type
 */
export interface attribute {
  attributeid?: string;
  attributeof?: string;
  attributetypeid?: string;
  componentstate?: number;
  externalname?: string;
  logicalname?: string;
  managedpropertylogicalname?: string;
  managedpropertyparentattributename?: string;
  name?: string;
  overwritetime?: string;
  physicalname?: string;
  solutionid?: string;
  tablecolumnname?: string;
  validforreadapi?: boolean;
  versionnumber?: number;
}
