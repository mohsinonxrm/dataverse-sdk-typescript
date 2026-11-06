/**
 * dataperformance entity type
 */
export interface dataperformance {
  _organizationid_value?: string;
  count?: number;
  optimizationstorage?: number;
  anyoptimizationavailable?: boolean;
  dataperformanceid?: string;
  lastactionresult?: string;
  component?: string;
  weight?: number;
  entity?: string;
  mediantime?: number;
  estimatedoptimizationimpact?: number;
  solution?: string;
  executionperiod?: string;
  mintime?: number;
  optimizationstatus?: string;
  maxtime?: number;
  anyoptimizationapplied?: boolean;
  realizedoptimizationimpact?: string;
  lastoptimizationdate?: string;
  operation?: string;
}
