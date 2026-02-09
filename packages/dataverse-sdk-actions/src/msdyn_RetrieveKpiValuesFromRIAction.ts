import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_RetrieveKpiValuesFromRI action
 */
export interface msdyn_RetrieveKpiValuesFromRIResponse {
  KpiValues: string;
}

/**
 * msdyn_RetrieveKpiValuesFromRI action
 *
 * Unbound action
 */
export class msdyn_RetrieveKpiValuesFromRIAction implements Executable<msdyn_RetrieveKpiValuesFromRIResponse> {
  constructor(
    public readonly crmRecord: EntityReference,
    public readonly kpiType: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveKpiValuesFromRI`;

    const body: Record<string, unknown> = {
      CrmRecord: this.crmRecord,
      KpiType: this.kpiType,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_RetrieveKpiValuesFromRIResponse> {
    const data = await response.json();
    return data as msdyn_RetrieveKpiValuesFromRIResponse;
  }
}
