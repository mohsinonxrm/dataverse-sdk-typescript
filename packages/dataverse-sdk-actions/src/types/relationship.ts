/**
 * relationship entity type
 */
export interface relationship {
  relationshipid: string;
  versionnumber: number;
  cascadearchive: number;
  entitykeyid: string;
  isrelationshipattributedenormalized: boolean;
  name: string;
  overwritetime: string;
  componentstate: number;
  solutionid: string;
}
