import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_RetrieveTypeValuesFromDCI action
 */
export interface msdyn_RetrieveTypeValuesFromDCIResponse {
  ResponseValues: string;
}

/**
 * msdyn_RetrieveTypeValuesFromDCI action
 *
 * Unbound action
 */
export class msdyn_RetrieveTypeValuesFromDCIAction implements Executable<msdyn_RetrieveTypeValuesFromDCIResponse> {
  constructor(
    public readonly crmRecord: EntityReference,
    public readonly resourceType: number,
    public readonly resourceTypeName: string,
    public readonly startDate: string,
    public readonly endDate: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveTypeValuesFromDCI`;

    const body: Record<string, unknown> = {
      CrmRecord: this.crmRecord,
      ResourceType: this.resourceType,
      ResourceTypeName: this.resourceTypeName,
      StartDate: this.startDate,
      EndDate: this.endDate,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_RetrieveTypeValuesFromDCIResponse> {
    const data = await response.json();
    return data as msdyn_RetrieveTypeValuesFromDCIResponse;
  }
}
