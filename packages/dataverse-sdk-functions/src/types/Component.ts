/**
 * Component complex type
 */
export interface Component {
  DisplayName: string;
  SchemaName: string;
  ComponentType: number;
  ComponentSubType: number;
  ComponentId: string;
  ParentEntityId: string;
  ParentEntityName: string;
}
