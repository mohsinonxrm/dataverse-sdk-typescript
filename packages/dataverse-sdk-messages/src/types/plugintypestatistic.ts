/**
 * plugintypestatistic entity type
 */
export interface plugintypestatistic {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _plugintypeid_value?: string;
  averageexecutetimeinmilliseconds?: number;
  crashcontributionpercent?: number;
  crashcount?: number;
  crashpercent?: number;
  createdon?: string;
  executecount?: number;
  failurecount?: number;
  failurepercent?: number;
  modifiedon?: string;
  plugintypestatisticid?: string;
  terminatecpucontributionpercent?: number;
  terminatehandlescontributionpercent?: number;
  terminatememorycontributionpercent?: number;
  terminateothercontributionpercent?: number;
}
