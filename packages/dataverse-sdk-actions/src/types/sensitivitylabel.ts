/**
 * sensitivitylabel entity type
 */
export interface sensitivitylabel {
  priority?: number;
  color?: string;
  isdefault?: boolean;
  applicableto?: string;
  sensitivitylabelid?: string;
  labelactions?: string;
  description?: string;
  displayname?: string;
  isenabled?: boolean;
  parentsensitivitylabelid?: string;
  tooltip?: string;
  name?: string;
}
