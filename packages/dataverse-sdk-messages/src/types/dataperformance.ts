/**
 * dataperformance entity type
 */
export interface dataperformance {
  _organizationid_value?: string;
  anyoptimizationapplied?: boolean;
  anyoptimizationavailable?: boolean;
  component?: string;
  count?: number;
  dataperformanceid?: string;
  entity?: string;
  estimatedoptimizationimpact?: number;
  executionperiod?: string;
  lastactionresult?: string;
  lastoptimizationdate?: string;
  maxtime?: number;
  mediantime?: number;
  mintime?: number;
  operation?: string;
  optimizationstatus?: string;
  optimizationstorage?: number;
  realizedoptimizationimpact?: string;
  solution?: string;
  weight?: number;
}
